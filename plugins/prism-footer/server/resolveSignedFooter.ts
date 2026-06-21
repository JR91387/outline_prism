import { Node } from "prosemirror-model";
import { schema } from "@server/editor";
import Logger from "@server/logging/Logger";
import type { Team } from "@server/models";
import { ProsemirrorHelper } from "@server/models/helpers/ProsemirrorHelper";
import type { ProsemirrorData } from "@shared/types";
import { TeamPreference } from "@shared/types";
import { Hour } from "@shared/utils/time";

/**
 * Signed-URL lifetime for footer attachment images. Matches the 1-hour expiry
 * document bodies already use (`DocumentHelper` → `signAttachmentUrls`); bump to
 * `Day.seconds` if long-open public pages need it.
 */
const FOOTER_URL_TTL = Hour.seconds;

/**
 * Resolves the effective footer for a shared document and signs its attachment
 * URLs so embedded images load for LOGGED-OUT viewers (the same treatment
 * document bodies receive).
 *
 * The per-collection override is resolved HERE, server-side, because public
 * documents have their `collectionId` stripped before reaching the client — so
 * the client cannot do the `collectionFooters[collectionId]` lookup itself.
 *
 * @param team the team that owns the shared document.
 * @param collectionId the shared document's real collection id (server-side only).
 * @returns the resolved, attachment-signed footer, or undefined when none is set.
 */
export async function resolveSignedFooter(
  team: Team,
  collectionId: string | null | undefined
): Promise<ProsemirrorData | undefined> {
  // Read preferences directly (not getPreference) so each key keeps its precise
  // type for the lookup below, and an unset footer is undefined (not `false`).
  const overrides = team.preferences?.[TeamPreference.CollectionFooters];
  const workspace = team.preferences?.[TeamPreference.Footer];
  const override =
    collectionId && overrides ? overrides[collectionId] : undefined;
  const raw = override ?? workspace;
  if (!raw) {
    return undefined;
  }

  try {
    const node = Node.fromJSON(schema, raw);
    return await ProsemirrorHelper.signAttachmentUrls(
      node,
      team.id,
      FOOTER_URL_TTL
    );
  } catch (err) {
    // A malformed/bare footer must never 500 the share — render its text
    // unsigned (images may not load, but the content still appears).
    Logger.warn("prism-footer: failed to sign footer attachments", { err });
    return raw;
  }
}
