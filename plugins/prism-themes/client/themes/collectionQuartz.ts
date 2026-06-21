import type { ThemeDefinition } from "../../shared/types";

// Collection — System Administrator Reference (light, "Quartz"). Sand canvas
// with a cool charcoal header; the light pair to Collection_Steel.
export const collectionQuartz: ThemeDefinition = {
  id: "collection-admin",
  name: "Collection_Quartz",
  group: "Collection",
  mode: "light",
  preview: "./collectionQuartz.png",
  colors: {
    canvas: "#f6f0e2",
    surface: "#fbf7ec",
    surfaceMuted: "#efe7d4",
    sidebar: "#ecebe2",
    header: "#2c3327",
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
