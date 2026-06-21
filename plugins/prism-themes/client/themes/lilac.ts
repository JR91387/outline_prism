import type { ThemeDefinition } from "../../shared/types";

export const lilac: ThemeDefinition = {
  id: "lilac",
  name: "Lilac Frost",
  mode: "light",
  preview: "./lilac.png",
  colors: {
    canvas: "#f8f9fb",
    surface: "#f4f6f9",
    surfaceMuted: "#e3e6ee",
    sidebar: "#f0f4f8",
    header: "#e8eff5",
    text: "#212121",
    textMuted: "#525c6b",
    accent: "#9a4dff",
    border: "#d4d7e5",
    codeBackground: "#eef0fa",
    tableHeader: "#e0e5f0",
    calloutBackground: "#f5f0fa",
  },
  typography: {
    ui: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    content:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
  },
  layout: {
    density: 1.0,
    contentWidth: "72ch",
    sidebarWidth: "280px",
    radius: "8px",
  },
};
