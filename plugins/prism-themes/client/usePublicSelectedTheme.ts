import { useMemo } from "react";
import type { DefaultTheme } from "styled-components";
import type { PublicTeam } from "@shared/types";
import useBuildTheme from "~/hooks/useBuildTheme";
import { Theme as ColorMode } from "~/stores/UiStore";
import { buildThemeFromDefinition } from "./adapter";
import { getTheme } from "./registry";

/**
 * Resolves the theme for a PUBLIC share viewed by a logged-out user. The
 * share's `PublicTeam` carries the selected Prism theme id (`prismTheme`, only
 * present when public branding is on and the workspace is in advanced mode).
 *
 * Mirrors the logged-in seam (`Theme.tsx` + `Settings/Details.tsx`): build a
 * base theme in the Prism theme's own mode — so a dark theme isn't overlaid on
 * a light-built base — then overlay the full palette. When no Prism theme is
 * present it returns the stock `useBuildTheme(customTheme)` result unchanged,
 * preserving the share's default look.
 *
 * @param team the share's public team payload, or undefined while loading.
 * @returns the composed theme and the optional content (body) font stack to
 *   publish via `--prism-content-font`.
 */
export function usePublicSelectedTheme(team: PublicTeam | undefined): {
  theme: DefaultTheme;
  contentFont?: string;
} {
  const def = getTheme(team?.prismTheme);
  const base = useBuildTheme(
    team?.customTheme,
    def ? (def.mode === "dark" ? ColorMode.Dark : ColorMode.Light) : undefined
  );
  const theme = useMemo(
    () => (def ? buildThemeFromDefinition(def, base) : base),
    [def, base]
  );
  return { theme, contentFont: def?.typography.content };
}
