import type { ThemeDefinition } from "../../shared/types";

export const mineralRed: ThemeDefinition = {
  id: "mineral-red",
  name: "Red Slate",
  mode: "light",
  preview: "./mineralRed.png",
  colors: {
    canvas: "#fafafa",
    surface: "#f5f5f5",
    surfaceMuted: "#e2e2e2",
    sidebar: "#292c2e",
    header: "#2c2c2c",
    text: "#2c2c2c",
    textMuted: "#646464",
    accent: "#cb4c48",
    border: "#d7d7d7",
    codeBackground: "#f0f0f0",
    tableHeader: "#e8e8e8",
    calloutBackground: "#f3f3f3",
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
