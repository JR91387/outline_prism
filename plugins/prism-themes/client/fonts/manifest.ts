/**
 * Data-driven registry of webfonts bundled with the Prism fork.
 *
 * Each entry declares one weight/style of a self-hosted OFL font whose woff2
 * lives in `public/fonts/` (served at `/fonts/<file>`). `PrismFonts` maps over
 * this array to emit one `@font-face` per entry; a theme "uses" a font merely
 * by naming its {@link FontFace.family} first in a `typography.ui` / `.mono` /
 * `.content` stack. Because every face is declared but unreferenced families
 * are never rendered, the browser only fetches the woff2 a live theme actually
 * paints — non-using themes pay zero bytes.
 *
 * To bundle a new font: drop `Family-<weight>.woff2` into `public/fonts/` and
 * add one entry here whose `family` matches the name themes reference.
 */

/** One weight/style of a bundled, self-hosted webfont. */
export interface FontFace {
  /**
   * CSS font-family display name, exactly as theme font stacks reference it
   * (e.g. `"IBM Plex Mono"`). Becomes the `@font-face` `font-family`.
   */
  family: string;
  /** Numeric CSS font-weight (e.g. 400, 700). */
  weight: number;
  /** CSS font-style this face provides. */
  style: "normal" | "italic";
  /** woff2 filename under `/fonts/` (e.g. `"IBMPlexMono-400.woff2"`). */
  file: string;
}

/**
 * Every bundled font face. Ordered by family; one entry per weight/style.
 * All fonts are OFL-licensed and self-hosted (downloaded from fontsource).
 */
export const manifest: FontFace[] = [
  // IBM Plex Sans — UI / sans-serif lineage.
  { family: "IBM Plex Sans", weight: 400, style: "normal", file: "IBMPlexSans-400.woff2" },
  { family: "IBM Plex Sans", weight: 500, style: "normal", file: "IBMPlexSans-500.woff2" },
  { family: "IBM Plex Sans", weight: 600, style: "normal", file: "IBMPlexSans-600.woff2" },
  { family: "IBM Plex Sans", weight: 700, style: "normal", file: "IBMPlexSans-700.woff2" },

  // IBM Plex Mono — monospace.
  { family: "IBM Plex Mono", weight: 400, style: "normal", file: "IBMPlexMono-400.woff2" },
  { family: "IBM Plex Mono", weight: 500, style: "normal", file: "IBMPlexMono-500.woff2" },
  { family: "IBM Plex Mono", weight: 600, style: "normal", file: "IBMPlexMono-600.woff2" },

  // Fira Code — monospace with coding ligatures.
  { family: "Fira Code", weight: 400, style: "normal", file: "FiraCode-400.woff2" },
  { family: "Fira Code", weight: 500, style: "normal", file: "FiraCode-500.woff2" },
  { family: "Fira Code", weight: 700, style: "normal", file: "FiraCode-700.woff2" },

  // JetBrains Mono — monospace.
  { family: "JetBrains Mono", weight: 400, style: "normal", file: "JetBrainsMono-400.woff2" },
  { family: "JetBrains Mono", weight: 500, style: "normal", file: "JetBrainsMono-500.woff2" },
  { family: "JetBrains Mono", weight: 700, style: "normal", file: "JetBrainsMono-700.woff2" },

  // Libertinus Serif — libre serif (maintained OFL successor to Linux
  // Libertine), for the Wikipedia/Encyclopedia content lineage.
  { family: "Libertinus Serif", weight: 400, style: "normal", file: "LibertinusSerif-400.woff2" },
  { family: "Libertinus Serif", weight: 700, style: "normal", file: "LibertinusSerif-700.woff2" },
  { family: "Libertinus Serif", weight: 400, style: "italic", file: "LibertinusSerif-400-italic.woff2" },

  // iA Writer Quattro — duospaced humanist for distraction-free writing.
  // Bundled and available; not referenced by a live theme yet (lazy — zero bytes
  // fetched until a theme paints it).
  { family: "iA Writer Quattro", weight: 400, style: "normal", file: "iAWriterQuattro-400.woff2" },
  { family: "iA Writer Quattro", weight: 700, style: "normal", file: "iAWriterQuattro-700.woff2" },
];
