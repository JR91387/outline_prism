import type { ThemeDefinition } from "../../shared/types";

export const throwbackGrey: ThemeDefinition = {
  id: "throwback-grey",
  name: "Throwback Grey",
  mode: "light",
  preview: "./throwbackGrey.png",
  colors: {
    canvas: "#ffffff",
    surface: "#bdbebd",
    surfaceMuted: "#e3e3e3",
    sidebar: "#bdbebd",
    header: "#bdbebd",
    text: "#222222",
    textMuted: "#808080",
    accent: "#000080",
    border: "#808080",
    codeBackground: "#f6f6f6",
    tableHeader: "#d4d4d4",
    calloutBackground: "#e3e3e3",
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
