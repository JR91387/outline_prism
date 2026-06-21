import type { ThemeDefinition } from "../../shared/types";

// Collection — Clinical User Guide (dark, "Ember"). Warm near-black with
// ember-orange links over a dark-rust header.
export const collectionEmber: ThemeDefinition = {
  id: "collection-dark",
  name: "Collection_Ember",
  group: "Collection",
  mode: "dark",
  preview: "./collectionEmber.png",
  colors: {
    canvas: "#1a0d07",
    surface: "#231108",
    surfaceMuted: "#140a05",
    sidebar: "#160b05",
    header: "#9e340a",
    text: "#f0d9c4",
    textMuted: "#a87c60",
    accent: "#e8703a",
    border: "#3d2416",
    codeBackground: "#231108",
    tableHeader: "#2c160b",
    calloutBackground: "#231108",
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
