import type { ThemeDefinition } from "../../shared/types";

// Collection — System Administrator Reference (dark, "Steel"). Cool silver on
// a cool near-black with a slate header and muted-rust accent.
export const collectionSteel: ThemeDefinition = {
  id: "collection-admin-dark",
  name: "Collection_Steel",
  group: "Collection",
  mode: "dark",
  preview: "./collectionSteel.png",
  colors: {
    canvas: "#0c0f0e",
    surface: "#131918",
    surfaceMuted: "#0a0e0d",
    sidebar: "#0f1413",
    header: "#1a2120",
    text: "#c4cecc",
    textMuted: "#7a9290",
    accent: "#d9622a",
    border: "#253030",
    codeBackground: "#131918",
    tableHeader: "#1a2120",
    calloutBackground: "#131918",
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
