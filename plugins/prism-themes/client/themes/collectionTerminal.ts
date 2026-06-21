import type { ThemeDefinition } from "../../shared/types";

// Collection — Machine Reference (dark, "Terminal"). GitHub-noir monochrome
// for AI/LLM integrations; the company's default scheme. Mono-forward content.
export const collectionTerminal: ThemeDefinition = {
  id: "collection-llm",
  name: "Collection_Terminal",
  mode: "dark",
  preview: "./collectionTerminal.png",
  colors: {
    canvas: "#0d1117",
    surface: "#161b22",
    surfaceMuted: "#0b0f14",
    sidebar: "#0b0f14",
    header: "#161b22",
    text: "#c9d1d9",
    textMuted: "#8b949e",
    accent: "#c2410c",
    border: "#30363d",
    codeBackground: "#161b22",
    tableHeader: "#21262d",
    calloutBackground: "#161b22",
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
