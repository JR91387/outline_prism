import { createGlobalStyle } from "styled-components";
import { manifest } from "./fonts/manifest";

/**
 * One `@font-face` block per manifest entry, built once at module load.
 *
 * `font-display: swap` shows fallback text immediately and swaps in the
 * webfont when it loads. All faces are *declared* but a browser only fetches
 * the woff2 for a family that rendered text actually uses, so themes that
 * never name a given family cost nothing.
 */
const fontFaces = manifest
  .map(
    (f) => `@font-face {
  font-family: "${f.family}";
  src: url("/fonts/${f.file}") format("woff2");
  font-weight: ${f.weight};
  font-style: ${f.style};
  font-display: swap;
}`
  )
  .join("\n\n");

const FontFaces = createGlobalStyle`
  ${fontFaces}
`;

/**
 * Injects the Prism fork's self-hosted webfont `@font-face` declarations.
 *
 * Mount once near the theme root. Adding a font requires no change here —
 * drop the woff2 into `public/fonts/` and add an entry to the manifest.
 *
 * @returns the global style element declaring all bundled font faces.
 */
export function PrismFonts() {
  return <FontFaces />;
}
