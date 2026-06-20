import { TeamPreference } from "@shared/types";
import useStores from "~/hooks/useStores";
import { getTheme } from "./registry";
import type { ThemeDefinition } from "../shared/types";

/**
 * Reads the workspace's selected theme — a server-side team preference, so it
 * is set by an admin and applies to every member. Returns a theme ONLY when the
 * theme mode is "advanced" AND a theme id is set; in "default" mode (or none) it
 * yields undefined, leaving stock Outline (light/dark + accent) intact. Must be
 * called inside a MobX `observer` (e.g. the Theme provider) so it re-renders
 * when either preference changes.
 *
 * @returns the team's active theme definition, or undefined.
 */
export function useSelectedTheme(): ThemeDefinition | undefined {
  const { auth } = useStores();
  const mode = auth.team?.getPreference(TeamPreference.ThemeMode);
  if (mode !== "advanced") {
    return undefined;
  }
  const id = auth.team?.getPreference(TeamPreference.Theme);
  return getTheme(typeof id === "string" ? id : undefined);
}
