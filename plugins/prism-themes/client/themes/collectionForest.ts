import type { ThemeDefinition } from "../../shared/types";

// Collection — Team Handbook (dark, "Forest"). Sage-silver on a forest-black
// canvas with ember-orange links.
export const collectionForest: ThemeDefinition = {
  id: "collection-internal-dark",
  name: "Collection_Forest",
  mode: "dark",
  preview: "./collectionForest.png",
  colors: {
    canvas: "#141a10",
    surface: "#1c2318",
    surfaceMuted: "#10160c",
    sidebar: "#131a0f",
    header: "#1c2318",
    text: "#cdd5c6",
    textMuted: "#8a9a7e",
    accent: "#e8703a",
    border: "#2e3d26",
    codeBackground: "#1c2318",
    tableHeader: "#1c2318",
    calloutBackground: "#1c2318",
  },
  typography: {
    ui: "'IBM Plex Sans', Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    content: "'IBM Plex Sans', Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    mono: "'IBM Plex Mono', SFMono-Regular, Consolas, monospace",
  },
  layout: {
    density: 0.96,
    contentWidth: "760px",
    sidebarWidth: "260px",
    radius: "6px",
  },
};
