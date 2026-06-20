import type { ThemeDefinition } from "../../shared/types";

export const eveningLilac: ThemeDefinition = {
  id: "evening-lilac",
  name: "Evening Lilac",
  mode: "dark",
  preview: "./eveningLilac.png",
  colors: {
    canvas: "#2f3741",
    surface: "#232a32",
    surfaceMuted: "#3a424d",
    sidebar: "#1f252d",
    header: "#232a32",
    text: "#e7e7ea",
    textMuted: "#a1adba",
    accent: "#c9a8ff",
    border: "#3e4858",
    codeBackground: "#1a1f27",
    tableHeader: "#2a3140",
    calloutBackground: "#2e2a3e",
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
