import type { ThemeDefinition } from "../../shared/types";

export const cranberryPaper: ThemeDefinition = {
  id: "cranberry-paper",
  name: "Cranberry Paper",
  mode: "light",
  preview: "./cranberryPaper.png",
  colors: {
    canvas: "#f5e6d3",
    surface: "#edd9c3",
    surfaceMuted: "#e0c8b8",
    sidebar: "#f0dcc8",
    header: "#e8d4bc",
    text: "#3d2817",
    textMuted: "#685335",
    accent: "#a52a2a",
    border: "#d4a574",
    codeBackground: "#fdfaf5",
    tableHeader: "#e0ccc0",
    calloutBackground: "#f9e8dc",
  },
  typography: {
    ui: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    content: "Georgia, 'Times New Roman', serif",
    mono: "'IBM Plex Mono', SFMono-Regular, Consolas, monospace",
  },
  layout: {
    density: 1.02,
    contentWidth: "72ch",
    sidebarWidth: "280px",
    radius: "4px",
  },
};
