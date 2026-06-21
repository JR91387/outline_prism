import type { TOCPosition } from "@shared/types";
import { TeamPreference } from "@shared/types";
import type { Team } from "@server/models";
import { resolvePublicTheme } from "../../plugins/prism-themes/server/resolvePublicTheme";

export default function presentPublicTeam(
  /** The team to present */
  team: Team,
  /** Whether the branding is public */
  isBrandingPublic: boolean
) {
  return {
    ...(isBrandingPublic
      ? {
          name: team.name,
          avatarUrl: team.avatarUrl,
          customTheme: team.getPreference(TeamPreference.CustomTheme),
          // Prism theme is visual identity — gated with the rest of branding.
          prismTheme: resolvePublicTheme(team),
        }
      : {}),
    tocPosition: team.getPreference(TeamPreference.TocPosition) as TOCPosition,
    // Workspace footer is content (not branding), so expose it to share viewers
    // regardless of the public-branding toggle; WorkspaceFooter renders it.
    footer: team.getPreference(TeamPreference.Footer) || undefined,
    collectionFooters:
      team.getPreference(TeamPreference.CollectionFooters) || undefined,
  };
}
