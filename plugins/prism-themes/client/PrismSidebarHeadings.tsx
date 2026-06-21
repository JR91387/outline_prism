import * as React from "react";
import { createGlobalStyle } from "styled-components";

/**
 * Colors the sidebar's inherited text — the workspace name (top) and user name
 * (bottom), which upstream renders without an explicit color so they fall back
 * to `theme.text`. On a bold dark sidebar that is dark-on-dark; this sets the
 * sidebar container (`#sidebar`) to a legible color (see `sidebarHeadingColor`).
 * Nav links and the active item set their own colors, so they are unaffected.
 */
const SidebarHeadingStyle = createGlobalStyle<{ $color: string }>`
  /* Non-link sidebar text — workspace name, user name, section labels — which
     set their own color or inherit body text. Links (nav items, active item)
     are excluded so they keep their own sidebar/active colors. The :not()
     selectors out-specify the elements' own class, so no !important is needed. */
  #sidebar,
  #sidebar :not(a):not(a *) {
    color: ${(props) => props.$color};
  }
`;

/**
 * @param color the legible sidebar identity color, or undefined when no Prism
 *   theme is active (renders nothing — stock behaviour).
 */
export function PrismSidebarHeadings({
  color,
}: {
  color?: string;
}): JSX.Element | null {
  return color ? <SidebarHeadingStyle $color={color} /> : null;
}
