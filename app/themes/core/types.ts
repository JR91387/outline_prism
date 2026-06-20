export type ThemeMode = "light" | "dark";

export type ThemeDefinition = {
  id: string;
  name: string;
  mode: ThemeMode;
  preview: string;
  colors: {
    canvas: string;
    surface: string;
    surfaceMuted: string;
    sidebar: string;
    header: string;
    text: string;
    textMuted: string;
    accent: string;
    border: string;
    codeBackground: string;
    tableHeader: string;
    calloutBackground: string;
  };
  typography: {
    ui: string;
    content: string;
    mono: string;
  };
  layout: {
    density: number;
    contentWidth: string;
    sidebarWidth: string;
    radius: string;
  };
};
