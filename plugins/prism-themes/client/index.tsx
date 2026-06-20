import { createLazyComponent } from "~/components/LazyLoad";
import { Hook, PluginManager } from "~/utils/PluginManager";
import config from "../plugin.json";
import Icon from "./Icon";

PluginManager.add([
  {
    ...config,
    type: Hook.Settings,
    value: {
      group: "Workspace",
      after: "Details",
      icon: Icon,
      description: "Apply a workspace-wide, full-surface UI theme.",
      component: createLazyComponent(() => import("./ThemeSettings")),
      enabled: (_team, user) => user.isAdmin,
    },
  },
  {
    ...config,
    type: Hook.Icon,
    value: Icon,
  },
]);

// The single core seam (app/components/Theme.tsx) imports the engine from here.
export { buildThemeFromDefinition } from "./adapter";
export { useSelectedTheme } from "./useSelectedTheme";
