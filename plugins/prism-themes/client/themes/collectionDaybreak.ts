import type { ThemeDefinition } from "../../shared/types";

// Collection — Clinical User Guide (light). Warm sand canvas with a rust
// sunrise header; the light pair to Collection_Ember.
export const collectionDaybreak: ThemeDefinition = {
  id: "collection",
  name: "Collection_Daybreak",
  mode: "light",
  preview: "./collectionDaybreak.png",
  colors: {
    canvas: "#f6f0e2",
    surface: "#fbf7ec",
    surfaceMuted: "#efe7d4",
    sidebar: "#f4e7d0",
    header: "#c2410c",
    text: "#2c3327",
    textMuted: "#5e6b53",
    accent: "#c2410c",
    border: "#e2d9c0",
    codeBackground: "#fdfaf5",
    tableHeader: "#ece3ce",
    calloutBackground: "#fbf7ec",
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
