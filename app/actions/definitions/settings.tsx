import { SunIcon, MoonIcon, BrowserIcon, PaletteIcon } from "outline-icons";
import { TeamPreference } from "@shared/types";
import { createAction, createActionWithChildren } from "~/actions";
import { SettingsSection } from "~/actions/sections";
import type RootStore from "~/stores/RootStore";
import { Theme } from "~/stores/UiStore";
import { getTheme } from "../../../plugins/prism-themes/client/registry";

/** The active Prism workspace theme, if one overrides the per-user appearance. */
function workspaceTheme(stores: RootStore) {
  const team = stores.auth.team;
  if (team?.getPreference(TeamPreference.ThemeMode) !== "advanced") {
    return undefined;
  }
  const id = team.getPreference(TeamPreference.Theme);
  return getTheme(typeof id === "string" ? id : undefined);
}

export const changeToDarkTheme = createAction({
  name: ({ t }) => t("Dark"),
  analyticsName: "Change to dark theme",
  icon: <MoonIcon />,
  iconInContextMenu: false,
  keywords: "theme dark night",
  section: SettingsSection,
  selected: ({ stores }) => stores.ui.theme === "dark",
  disabled: ({ stores }) => !!workspaceTheme(stores),
  perform: ({ stores }) => stores.ui.setTheme(Theme.Dark),
});

export const changeToLightTheme = createAction({
  name: ({ t }) => t("Light"),
  analyticsName: "Change to light theme",
  icon: <SunIcon />,
  iconInContextMenu: false,
  keywords: "theme light day",
  section: SettingsSection,
  selected: ({ stores }) => stores.ui.theme === "light",
  disabled: ({ stores }) => !!workspaceTheme(stores),
  perform: ({ stores }) => stores.ui.setTheme(Theme.Light),
});

export const toggleTheme = createAction({
  name: ({ t }) => t("Toggle theme"),
  analyticsName: "Change theme",
  iconInContextMenu: false,
  icon: ({ stores }) =>
    stores.ui.resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />,
  keywords: "theme light day",
  section: SettingsSection,
  shortcut: ["Meta+Shift+l"],
  perform: ({ stores }) =>
    stores.ui.setTheme(
      stores.ui.resolvedTheme === "light" ? Theme.Dark : Theme.Light
    ),
});

export const changeToSystemTheme = createAction({
  name: ({ t }) => t("System"),
  analyticsName: "Change to system theme",
  icon: <BrowserIcon />,
  iconInContextMenu: false,
  keywords: "theme system default",
  section: SettingsSection,
  selected: ({ stores }) => stores.ui.theme === "system",
  disabled: ({ stores }) => !!workspaceTheme(stores),
  perform: ({ stores }) => stores.ui.setTheme(Theme.System),
});

export const workspaceThemeNotice = createAction({
  name: ({ stores, t }) => {
    const theme = workspaceTheme(stores);
    return theme
      ? t("Set by workspace theme: {{ name }}", { name: theme.name })
      : "";
  },
  analyticsName: "Workspace theme notice",
  icon: <PaletteIcon />,
  iconInContextMenu: false,
  section: SettingsSection,
  visible: ({ stores }) => !!workspaceTheme(stores),
  disabled: true,
  perform: () => {
    // Informational only — appearance is controlled by the workspace theme
    // (Settings → Themes).
  },
});

export const changeTheme = createActionWithChildren({
  name: ({ t, isMenu }) => (isMenu ? t("Appearance") : t("Change theme")),
  analyticsName: "Change theme",
  placeholder: ({ t }) => t("Change theme to"),
  icon: ({ stores }) =>
    stores.ui.resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />,
  keywords: "appearance display",
  section: SettingsSection,
  children: [
    changeToLightTheme,
    changeToDarkTheme,
    changeToSystemTheme,
    workspaceThemeNotice,
  ],
});

export const rootSettingsActions = [changeTheme, toggleTheme];
