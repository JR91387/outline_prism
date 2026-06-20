# Theme Core

Shared theme contract and user-selection logic.

## Constraints

- Outline's native appearance remains the default and must receive no custom overrides.
- Custom themes are optional and selected by the user in Settings.
- Keep this layer small, typed, and independent from individual theme definitions.
- Reuse Outline's existing theme infrastructure; do not create a parallel framework or add dependencies.
- Theme failures or unknown values must safely fall back to Outline's native theme.
- Keep upstream changes minimal so future Outline updates remain easy to merge.

The contract should expose only common visual controls such as colors, typography, density, spacing, widths, and radii. Avoid unrestricted component-level customization unless a real need appears.
