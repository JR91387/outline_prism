import type { ThemeDefinition } from "../../shared/types";

export const throwbackDark: ThemeDefinition = {
  id: "throwback-dark",
  name: "Retro Signal",
  mode: "dark",
  preview: "./throwbackDark.png",
  colors: {
    canvas: "#181612",
    surface: "#3a3a3a",
    surfaceMuted: "#4f4f4f",
    sidebar: "#2d2d2d",
    header: "#1a1a1a",
    text: "#ffffff",
    textMuted: "#c1c1c1",
    accent: "#ff3030",
    border: "#808080",
    codeBackground: "#222222",
    tableHeader: "#3a3a3a",
    calloutBackground: "#2d2d2d",
  },
  typography: {
    ui: "Tahoma, 'Segoe UI', system-ui, sans-serif",
    content: "Tahoma, 'Segoe UI', system-ui, sans-serif",
    mono: "'Lucida Console', Consolas, 'Liberation Mono', monospace",
  },
  layout: {
    density: 1.0,
    contentWidth: "72ch",
    sidebarWidth: "280px",
    radius: "0px",
  },
};
