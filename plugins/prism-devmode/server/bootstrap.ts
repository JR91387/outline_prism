import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import path from "path";
import {
  AttachmentPreset,
  CollectionPermission,
  UserRole,
} from "@shared/types";
import slugify from "@shared/utils/slugify";
import attachmentCreator from "@server/commands/attachmentCreator";
import teamCreator from "@server/commands/teamCreator";
import { createContext } from "@server/context";
import env from "@server/env";
import Logger from "@server/logging/Logger";
import { ApiKey, Collection, Document, Team, User } from "@server/models";
import { DocumentHelper } from "@server/models/helpers/DocumentHelper";
import type { APIContext } from "@server/types";
import { type DemoDoc, demoCollections } from "./content";

const TEAM_NAME = "Prism Dev";

/** Where the Claude user's API key is written so the agent can read it. */
export const TOKEN_FILE = path.join(
  env.FILE_STORAGE_LOCAL_ROOT_DIR,
  "prism-devmode",
  "claude-token.txt"
);

/** Source assets bundled with the plugin (resolved against the app's working
 * directory, which the image's COPY . . places at /opt/outline). Re-uploaded on
 * each fresh provision so the demo pages' images/PDFs/decks survive a
 * from-scratch deployment. */
const MEDIA_DIR = path.resolve("plugins", "prism-devmode", "server", "media");

const MEDIA_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".ppt": "application/vnd.ms-powerpoint",
};

/**
 * Uploads every file in media/ as a workspace attachment and returns a
 * filename -> redirect-URL map. Fail-soft: a file that cannot be read or
 * uploaded is logged and skipped rather than aborting the whole provision.
 *
 * @param ctx the route API context (carries the open transaction).
 * @param user the owner for the created attachments.
 * @returns a map of media filename to its attachment redirect URL.
 */
async function uploadMedia(
  ctx: APIContext,
  user: User
): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  let files: string[] = [];
  try {
    files = await readdir(MEDIA_DIR);
  } catch (err) {
    Logger.warn("prism-devmode: media dir unreadable; skipping attachments", {
      err,
    });
    return urls;
  }
  for (const name of files) {
    try {
      const buffer = await readFile(path.join(MEDIA_DIR, name));
      const type =
        MEDIA_MIME[path.extname(name).toLowerCase()] ??
        "application/octet-stream";
      const attachment = await attachmentCreator({
        name,
        user,
        preset: AttachmentPreset.DocumentAttachment,
        ctx,
        buffer,
        type,
      });
      if (attachment) {
        urls.set(name, attachment.url);
      }
    } catch (err) {
      Logger.warn(`prism-devmode: failed to upload media "${name}"`, { err });
    }
  }
  return urls;
}

/**
 * Replaces `prism-media://<filename>` tokens in seed text with real attachment
 * URLs. Any token left unresolved is replaced with a harmless placeholder so a
 * literal token never reaches a published document.
 */
function resolveMedia(text: string, urls: Map<string, string>): string {
  return text.replace(/prism-media:\/\/([^\s)"']+)/g, (_match, file) => {
    const url = urls.get(file);
    if (url) {
      return url;
    }
    Logger.warn(`prism-devmode: unresolved media token "${file}"`);
    return "#missing-media";
  });
}

async function createDoc(
  context: ReturnType<typeof createContext>,
  collection: Collection,
  node: DemoDoc,
  parentDocumentId: string | null,
  mediaUrls: Map<string, string>
) {
  const document = await Document.createWithCtx(context, {
    version: 2,
    parentDocumentId,
    collectionId: collection.id,
    teamId: collection.teamId,
    lastModifiedById: collection.createdById,
    createdById: collection.createdById,
    title: node.title,
    text: resolveMedia(node.text, mediaUrls),
  });
  document.content = await DocumentHelper.toJSON(document);
  await document.publish(context, {
    collectionId: collection.id,
    silent: true,
  });
  for (const child of node.children ?? []) {
    await createDoc(context, collection, child, document.id, mediaUrls);
  }
}

/**
 * Provisions the Prism dev workspace: a team, two admin users (Jerry + Claude),
 * the demo collections/pages, and an API key for Claude (written to TOKEN_FILE).
 * Runs inside the route's transaction (ctx.state.transaction).
 *
 * @param ctx the route API context (must carry an open transaction).
 * @returns the team and the admin user to sign in.
 */
export async function provisionDevWorkspace(ctx: APIContext) {
  const { transaction } = ctx.state;

  const team = await teamCreator(ctx, {
    name: TEAM_NAME,
    subdomain: slugify(TEAM_NAME),
    authenticationProviders: [],
  });

  const admin = await User.createWithCtx(ctx, {
    name: "Jerry",
    email: "jerry@prism.local",
    teamId: team.id,
    role: UserRole.Admin,
  });

  const claude = await User.createWithCtx(ctx, {
    name: "Claude",
    email: "claude@prism.local",
    teamId: team.id,
    role: UserRole.Admin,
  });

  const context = createContext({ ...ctx, transaction, user: admin });

  // Upload bundled media first so demo pages can resolve prism-media:// tokens.
  const mediaUrls = await uploadMedia(ctx, admin);

  for (const def of demoCollections) {
    const collection = await Collection.createWithCtx(context, {
      name: def.name,
      icon: def.icon,
      color: def.color,
      description: def.description,
      teamId: team.id,
      createdById: admin.id,
      sort: Collection.DEFAULT_SORT,
      permission: CollectionPermission.ReadWrite,
    });
    for (const node of def.docs) {
      await createDoc(context, collection, node, null, mediaUrls);
    }
  }

  const apiKey = await ApiKey.createWithCtx(ctx, {
    name: "prism-devmode (Claude)",
    userId: claude.id,
  });
  await mkdir(path.dirname(TOKEN_FILE), { recursive: true });
  await writeFile(TOKEN_FILE, `${apiKey.value ?? ""}\n`, "utf8");

  return { team, admin };
}

/** @returns the existing team if the installation is already provisioned. */
export async function existingTeam(ctx: APIContext) {
  return Team.findOne({ transaction: ctx.state.transaction });
}
