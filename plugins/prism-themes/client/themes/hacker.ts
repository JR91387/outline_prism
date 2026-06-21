import type { ThemeDefinition } from "../../shared/types";

export const hacker: ThemeDefinition = {
  id: "hacker",
  name: "Phosphor Terminal",
  mode: "dark",
  preview: "./hacker.png",
  colors: {
    canvas: "#050805",
    surface: "#0a100a",
    surfaceMuted: "#101810",
    sidebar: "#070c07",
    header: "#030503",
    text: "#9ef59e",
    textMuted: "#62a862",
    accent: "#39ff14",
    border: "#1f3a1f",
    codeBackground: "#020402",
    tableHeader: "#102010",
    calloutBackground: "#0d160d",
  },
  typography: {
    ui: "'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace",
    content: "'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace",
    mono: "'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace",
  },
  layout: {
    density: 0.86,
    contentWidth: "78ch",
    sidebarWidth: "250px",
    radius: "0px",
  },
};
