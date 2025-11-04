### Editor Theme Variables (CSS Custom Properties) Guidelines

- Use only editor-provided CSS variables for any color- or typography-related styling. Always reference tokens with var(--wst-...).
- Never hardcode colors (no hex, rgb/rgba, hsl/hsla) in CSS or in manifest `defaultValue`s. Prefer tokens by intent.
- Never hardcode fonts or typography values (no raw font-family names, sizes, weights, styles, line-heights, or letter-spacing). Use typography tokens.
- Keep CSS and manifest aligned: if CSS uses `var(--wst-...)`, the corresponding manifest `defaultValue` must use the same `var(--wst-...)`.
- Acceptable non-token values: `transparent` and `currentColor` where appropriate. Otherwise, use a token.

Suggested token usage (colors)
- Backgrounds:
  - Primary surfaces: `var(--wst-primary-background-color)`
  - Secondary/containers: `var(--wst-secondary-background-color)` or `var(--wst-container-secondary-background-color)`
- Text:
  - Headings: `var(--wst-heading-1-color)` … `var(--wst-heading-6-color)`
  - Paragraphs: `var(--wst-paragraph-1-color)` … `var(--wst-paragraph-3-color)`
  - Links/actions: `var(--wst-links-and-actions-color)`
- Brand accents and graphics:
  - Primary accent: `var(--wst-accent-1-color)`
  - Additional accents: `var(--wst-accent-2-color)`, `var(--wst-accent-3-color)`, `var(--wst-accent-4-color)`
- Borders/lines:
  - Use `var(--wst-system-line-1-color)` or shade tokens such as `var(--wst-shade-2-color)`
- Buttons (examples):
  - Primary: background `var(--wst-button-primary-background-color)`, text `var(--wst-button-primary-color)`
  - Secondary: borders `var(--wst-button-secondary-border-top-color)` etc., text `var(--wst-button-secondary-color)`
Typography (font) tokens
- Always prefer composite typography tokens where available:
  - Headings: `var(--wst-heading-[1-6]-font)`
  - Paragraphs: `var(--wst-paragraph-[1-3]-font)`
  - Buttons: `var(--wst-button-(primary|secondary|tertiary)-font)`
- If a composite token does not exist for your use-case, use atomic tokens:
  - `*-font-family`, `*-font-size`, `*-font-weight`, `*-font-style`, `*-line-height`, `*-letter-spacing`
  - Example: `var(--wst-paragraph-2-font-family)`, `var(--wst-paragraph-2-font-size)`, etc.
Prohibited (fonts)
- Raw font family stacks (e.g., "Inter, sans-serif"), numeric font sizes/weights, literal `italic/normal`, direct line-height/letter-spacing numbers in CSS or manifest defaults.
Allowed (fonts)
- Only `var(--wst-...)` typography tokens. Use composites first; fall back to atomic tokens when necessary.

Examples

CSS (component):
```css
.editorElement {
  background: var(--wst-primary-background-color);
  color: var(--wst-paragraph-2-color);
  font: var(--wst-paragraph-2-font);
}

.editorElement .title {
  color: var(--wst-heading-4-color);
  font: var(--wst-heading-4-font);
}

.editorElement .cta {
  background: var(--wst-button-primary-background-color);
  color: var(--wst-button-primary-color);
  border: 1px solid var(--wst-accent-1-color);
  font: var(--wst-button-primary-font);
}
```

Manifest `cssProperties` (defaults must mirror the CSS tokens):
```json
{
  "backgroundColor": {
    "displayName": "Background",
    "defaultValue": "var(--wst-primary-background-color)"
  },
  "color": {
    "displayName": "Text Color",
    "defaultValue": "var(--wst-paragraph-2-color)"
  },
  "font": {
    "displayName": "Text Font",
    "defaultValue": "var(--wst-paragraph-2-font)"
  },
  "border": {
    "displayName": "Border",
    "defaultValue": "1px solid var(--wst-accent-1-color)"
  }
}
```

Reference token subset
```json
{
  "--wst-base-1-color": "#FAFAFA",
  "--wst-base-2-color": "#1A1A1A",
  "--wst-shade-1-color": "#F0F0F0",
  "--wst-shade-2-color": "#BFBFBF",
  "--wst-shade-3-color": "#666666",
  "--wst-accent-1-color": "#0066CC",
  "--wst-accent-2-color": "#E6E6E6",
  "--wst-accent-3-color": "#FF6B35",
  "--wst-accent-4-color": "#004499",
  "--wst-primary-background-color": "var(--wst-base-1-color)",
  "--wst-secondary-background-color": "var(--wst-shade-1-color)",
  "--wst-heading-1-color": "var(--wst-base-2-color)",
  "--wst-paragraph-2-color": "var(--wst-base-2-color)",
  "--wst-links-and-actions-color": "var(--wst-accent-1-color)",
  "--wst-button-primary-background-color": "var(--wst-accent-1-color)",
  "--wst-button-primary-color": "var(--wst-base-1-color)",
  "--wst-system-line-1-color": "var(--wst-base-2-color)"
}
```

Notes
- Hex values in the reference subset are for documentation only. Do not copy hex/rgb/hsl into CSS or manifest; always use the token names.
- If a token for a needed role doesn't exist, choose the closest intent-matching token above rather than introducing a raw color.
- For shadows requiring color, prefer tokens or `currentColor`. Avoid new rgba literals.
- For typography, if a composite token is unavailable, compose from atomic tokens (e.g., `font-family`, `font-size`, `font-weight`, etc.) using `var(--wst-...)` for each part. Never use raw values.

### Status variants (no raw colors)
- Info: use accent tokens (prefer `var(--wst-accent-1-color)`).
- Warning: use `var(--wst-accent-3-color)`.
- Error/Success: choose from available accent tokens (`--wst-accent-1/2/3/4`) by intent; never invent hex/rgb/rgba.
- Tints/overlays: derive from a token to `transparent` (avoid rgba literals).

## Global token sourcing policy (colors and fonts)

- Allowed everywhere (CSS and manifest defaults): `var(--wst-…)`, `transparent`, `currentColor`.
- Prohibited anywhere: hex (`#rgb/#rgba/#rrggbb/#rrggbbaa`), `rgb()/rgba()`, `hsl()/hsla()`, named colors (`red`, `blue`, etc.), `color-mix()`, `color()`.
- Prohibited anywhere (fonts): raw font-family names/stacks, raw font-size values (px/rem/em), raw font-weight numbers/keywords, raw `font-style`, raw `line-height`, raw `letter-spacing`.
- Gradients/overlays/tints: every color stop must be a token; use `transparent` for fades. No rgba/hsla/hex stops.
- Shadows/outlines/text-decoration/filters/SVG fill-stroke: use tokens or `currentColor`; no rgba/hsla/hex.
- Pseudo-classes/variants (hover, focus-visible, disabled, info/warning/error/success): must also use tokens.
- Manifest defaults must exactly mirror the CSS tokens used by the selectors they control.

Token fallback order
- Prefer role tokens when available (button/heading/paragraph/system-line).
- Otherwise use accent tokens by intent; otherwise base/shade tokens.
- If no exact role token exists, pick the closest intent token. Never invent raw colors.
Typography fallback order
- Prefer composite typography tokens (`--wst-*-font`).
- Otherwise use atomic tokens for the same role (`--wst-*-font-family`, `--wst-*-font-size`, etc.).
- If still missing, pick the closest role within heading/paragraph/button families.

Quick self-check (before emitting)
- Scan CSS and manifest for: `#…`, `rgba(`, `rgb(`, `hsla(`, `hsl(`, named colors. If found, replace with tokens and re-check.
- Scan CSS and manifest for any of: `font: ` (without `var(--wst-`), `font-family:`, `font-size:`, `font-weight:`, `font-style:`, `line-height:`, `letter-spacing:` using raw values. Replace with the appropriate `var(--wst-...)` tokens.

## Overlay techniques (token-only)

All overlays use separate layers (e.g., `::before` or `::after`) with token-only gradient stops. Control translucency via the layer's `opacity` property. Never use rgba/hsla in gradient stops.

**Translucent tint overlay:**
```css
.component::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--wst-accent-1-color) 0%, var(--wst-accent-2-color) 50%, transparent 100%);
  opacity: 0.3;
  pointer-events: none;
}
```

**Sheen/highlight overlay:**
```css
.component::before {
  content: '';
  position: absolute; inset: 0;
  color: var(--wst-base-1-color);
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  opacity: 0.3;
  pointer-events: none;
}
```

**Darken overlay:** Use `var(--wst-base-2-color)` with opacity 0.1–0.2.  
**Lighten overlay:** Use `var(--wst-base-1-color)` with opacity 0.1–0.3.

**Glassmorphism:** Token background + token-only overlay (opacity for translucency) + optional `backdrop-filter: blur()`. Borders must be solid tokens or `currentColor`.
```css
.glass::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--wst-base-1-color), transparent 60%);
  opacity: 0.2;
  pointer-events: none;
}
.glass { border: 1px solid var(--wst-system-line-1-color); backdrop-filter: blur(20px); }
```

**Hover darkening (token-only):**
```css
.button { background: var(--wst-accent-1-color); position: relative; }
.button::after {
  content: '';
  position: absolute; inset: 0;
  background: var(--wst-base-2-color);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.button:hover::after { opacity: 0.1; }
```

**Status chips/badges:** Backgrounds and glows use accent tokens; borders use `currentColor` or a token. Shimmer effects use token-only gradients plus layer opacity.

## Variant palettes (no custom hex)

- Do not introduce additional brand hues via hex/rgb/hsl (e.g., purple/pink/teal/orange codes).
- Build all variant palettes from existing tokens only:
  - Blue/primary accents → `--wst-accent-1-color`
  - Warm/attention accents → `--wst-accent-3-color`
  - Deep/contrast accents → `--wst-accent-4-color`
  - Neutrals → `--wst-base-*` and `--wst-shade-*`
- For multiple variants, combine accent tokens with shades in gradients; use `transparent` for fades. Do not approximate with new hex colors.

## Token families and allowed prefixes

- Surface/backgrounds: `--wst-primary-background-color`, `--wst-secondary-background-color`, `--wst-(container|box)-(primary|secondary)-*`
- Text: `--wst-heading-[1-6]-color`, `--wst-paragraph-[1-3]-color`, `--wst-links-and-actions-color`
- Brand/accents: `--wst-accent-[1-4]-color`, neutrals `--wst-base-[1-2]-color`, shades `--wst-shade-[1-3]-color`
- Buttons: `--wst-button-(primary|secondary|tertiary)-*` (e.g., background-color, color, border-*-color, border-*, padding-*, box-shadow, font-*)
- Lines/borders/shadows: `--wst-system-line-[1-2]-color`, any `--wst-*-box-shadow`
- Graphics: `--wst-graphics-color-[1-2]`
- Typography composites: `--wst-(heading|paragraph)-*-font*`
- Typography atomics: `--wst-(heading|paragraph|button)(-(primary|secondary|tertiary))?-(font-family|font-size|font-weight|font-style|line-height|letter-spacing)`

Usage rules
- Use only tokens from the families above; don’t invent new names outside these prefixes.
- If a specific sub-token exists (e.g., `--wst-button-secondary-border-right-color`), prefer it over composing raw colors.
- When unsure, choose the closest intent within the family (e.g., pick `--wst-accent-[1..4]-color` by role).
- Note: Token hex values shown anywhere are reference only. Always use token names in CSS/manifest; never copy hex/rgb/hsl.
- For typography, prefer `font: var(--wst-*-font)`; otherwise compose from atomic font tokens. No raw font values.

## Contrast and pairing (token-only)

- Text on surfaces: use paragraph/heading tokens on primary/secondary/container/box surfaces. Avoid long-form text directly on accent gradients.
- Text on accent backgrounds: use `var(--wst-base-1-color)`; reserve accent backgrounds for small UI (badges/chips/CTAs).
- Text on imagery/gradients: add a token-only overlay (layer opacity ≥ 0.2 for headings, ≥ 0.3 for body), then use paragraph/heading tokens.