import type { ThemeDefinition } from "../../shared/types";

// Collection — Machine Reference (light, "Daylight"). Cool-white machine-doc
// surface; the light pair to Collection_Terminal. Mono-forward content.
export const collectionDaylight: ThemeDefinition = {
  id: "collection-llm-light",
  name: "Collection_Daylight",
  group: "Collection",
  mode: "light",
  preview: "./collectionDaylight.png",
  colors: {
    canvas: "#f2f4f0",
    surface: "#e8ebe5",
    surfaceMuted: "#eaede7",
    sidebar: "#e8ebe5",
    header: "#e8ebe5",
    text: "#1a1f18",
    textMuted: "#4a5a45",
    accent: "#c2410c",
    border: "#dde1d9",
    codeBackground: "#e8ebe5",
    tableHeader: "#dde1d9",
    calloutBackground: "#e8ebe5",
  },
  typography: {
    ui: "'IBM Plex Sans', Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    content: "'IBM Plex Sans', Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    mono: "'IBM Plex Mono', SFMono-Regular, Consolas, monospace",
  },
  layout: {
    density: 0.94,
    contentWidth: "80ch",
    sidebarWidth: "260px",
    radius: "4px",
  },
};
