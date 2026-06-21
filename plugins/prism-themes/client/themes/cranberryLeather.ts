import type { ThemeDefinition } from "../../shared/types";

export const cranberryLeather: ThemeDefinition = {
  id: "cranberry-leather",
  name: "Cranberry Leather",
  mode: "dark",
  preview: "./cranberryLeather.png",
  colors: {
    canvas: "#2b2420",
    surface: "#3d3530",
    surfaceMuted: "#4a4440",
    sidebar: "#332d27",
    header: "#2f291f",
    text: "#e8d4bc",
    textMuted: "#c1b08e",
    accent: "#e8533a",
    border: "#6b5344",
    codeBackground: "#1f1a15",
    tableHeader: "#3d3530",
    calloutBackground: "#443d36",
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
