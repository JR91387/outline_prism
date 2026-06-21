import { createGlobalStyle } from "styled-components";

/**
 * Extends the active theme's background to the page `body` on public shares.
 *
 * The app-root `GlobalStyles` paints `body` from the stock theme for logged-out
 * viewers (it cannot see the share's team theme), so without this the themed
 * surface stops at the content container and stock white can show through on
 * overscroll or very short documents. Mounted inside the share's nested
 * `ThemeProvider`, this reads the resolved theme and themes `body` to match. For
 * a share with no Prism theme the value equals the stock background, so it is a
 * no-op there.
 */
export const PrismShareSurface = createGlobalStyle`
  body {
    background: ${(props) => props.theme.background};
  }
`;
