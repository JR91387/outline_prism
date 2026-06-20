import type { ThemeDefinition } from "../../shared/types";

export const graphiteEmber: ThemeDefinition = {
  id: "graphite-ember",
  name: "Graphite Ember",
  mode: "dark",
  preview: "./graphiteEmber.png",
  colors: {
    canvas: "#1c1e20",
    surface: "#292c2e",
    surfaceMuted: "#3a3d40",
    sidebar: "#242729",
    header: "#252729",
    text: "#d8d8d8",
    textMuted: "#969696",
    accent: "#cb4c48",
    border: "#4c4c4c",
    codeBackground: "#202020",
    tableHeader: "#353535",
    calloutBackground: "#313131",
  },
  typography: {
    ui: "Avenir, 'Avenir Next', Inter, -apple-system, 'Segoe UI', sans-serif",
    content:
      "Avenir, 'Avenir Next', Inter, -apple-system, 'Segoe UI', sans-serif",
    mono: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
  },
  layout: {
    density: 1.0,
    contentWidth: "72ch",
    sidebarWidth: "280px",
    radius: "6px",
  },
};
