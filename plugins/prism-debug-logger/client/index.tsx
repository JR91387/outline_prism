import { createLazyComponent } from "~/components/LazyLoad";
import { Hook, PluginManager } from "~/utils/PluginManager";
import config from "../plugin.json";
import Icon from "./Icon";
import { logStore } from "./logStore";

// Re-arm console capture on load if the user previously enabled it.
if (logStore.enabled) {
  logStore.install();
}

PluginManager.add([
  {
    ...config,
    type: Hook.Settings,
    value: {
      group: "Account",
      icon: Icon,
      description: "Capture console logs in-app for debugging.",
      component: createLazyComponent(() => import("./DebugLoggerSettings")),
    },
  },
  {
    ...config,
    type: Hook.Icon,
    value: Icon,
  },
]);
