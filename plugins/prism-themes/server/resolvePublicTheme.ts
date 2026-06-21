import { TeamPreference } from "@shared/types";
import type { Team } from "@server/models";

/**
 * Resolves the workspace's selected Prism theme id for exposure on public
 * shares. Returns an id only when the team is in "advanced" theme mode; in
 * default mode (stock accent only) it returns undefined so shares keep the
 * stock Outline look. Keeps the theme-preference logic out of the upstream
 * presenter.
 *
 * @param team the team that owns the shared document.
 * @returns the selected Prism theme id, or undefined.
 */
export function resolvePublicTheme(team: Team): string | undefined {
  if (team.getPreference(TeamPreference.ThemeMode) !== "advanced") {
    return undefined;
  }
  const id = team.getPreference(TeamPreference.Theme);
  return typeof id === "string" ? id : undefined;
}
