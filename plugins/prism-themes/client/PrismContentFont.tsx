import * as React from "react";
import { createGlobalStyle } from "styled-components";

/**
 * Publishes the active theme's content font as the `--prism-content-font` CSS
 * variable. The editor body reads this variable
 * (`shared/editor/components/Styles.ts`) so a theme can render document text in a
 * different face than the UI chrome (e.g. a serif body under a sans interface).
 *
 * Renders nothing when no content font is supplied, leaving the variable unset so
 * the editor falls back to the theme's UI `fontFamily` — i.e. stock behaviour.
 */
const ContentFontVar = createGlobalStyle<{ $font: string }>`
  :root {
    --prism-content-font: ${(props) => props.$font};
  }
`;

/**
 * @param font the active theme's content font stack, or undefined when no Prism
 *   theme is active.
 */
export function PrismContentFont({ font }: { font?: string }): JSX.Element | null {
  return font ? <ContentFontVar $font={font} /> : null;
}
