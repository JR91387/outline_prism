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
      after: "Templates",
      icon: Icon,
      description: "A footer shown at the bottom of every document.",
      component: createLazyComponent(() => import("./FooterSettings")),
      enabled: (_team, user) => user.isAdmin,
    },
  },
  {
    ...config,
    type: Hook.Icon,
    value: Icon,
  },
]);

// The single core seam (app/scenes/Document/components/Document.tsx) imports
// WorkspaceFooter directly by relative path, not from here, to avoid re-running
// this registration.
