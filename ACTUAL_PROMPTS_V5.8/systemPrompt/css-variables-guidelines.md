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
- Exception (explicit user font): allow web-safe/system stacks for that element/property only; mirror in manifest defaultValue.

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

### Typography Override Prevention

**CRITICAL RULE**: When using composite font tokens, NEVER add separate font property declarations after them.

**Forbidden patterns**:
```css
/* ✗✗✗ WRONG - These override the composite token */
.element {
  font: var(--wst-paragraph-2-font);
  font-weight: 500;        /* ✗ Overrides token weight */
  font-size: 18px;         /* ✗ Overrides token size */
  font-family: Inter;      /* ✗ Overrides token family */
}

/* ✗✗✗ WRONG - Raw font properties without tokens */
.element {
  font-family: system-ui, -apple-system, sans-serif;  /* ✗ Should use token */
  font-size: 16px;                                    /* ✗ Should use token or clamp() */
  font-weight: 400;                                   /* ✗ Should use token */
}
```

**Correct patterns**:
```css
/* ✓✓✓ CORRECT - Trust the composite token */
.body-text {
  font: var(--wst-paragraph-2-font);
}

/* ✓✓✓ CORRECT - Use different token for different weight */
.emphasized-text {
  font: var(--wst-heading-4-font);  /* Provides heavier weight naturally */
}

/* ✓✓✓ CORRECT - Only when atomic tokens needed for custom combinations */
.custom-combination {
  font-family: var(--wst-paragraph-2-font-family);
  font-size: clamp(1rem, 2vw, 1.25rem);  /* Custom fluid size */
  font-weight: var(--wst-heading-4-font-weight);  /* Heavier weight from token */
  line-height: 1.6;
}
```

**Why this matters**: Overriding composite tokens defeats the brand token system. When a designer updates `--wst-paragraph-2-font`, your override blocks the update from reaching the element.

### Using brand palette (reasoning-only)

- The agent provides a brand palette with:
  - base: { "--wst-…-color": "#rrggbb" } (base tokens to hex)
  - aliases: { "--wst-…": "--wst-…-color" } (role tokens to base tokens)
- Use base to judge similarity (e.g., HSL distance). When a role alias exists for the matched base, prefer the role token in CSS/manifest.
- Output MUST still use tokens: `var(--wst-...)`, `transparent`, or `currentColor`. Do not emit hex/rgb/hsl/named colors (except the explicit-user-color exception below).

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
- For typography, if a composite token is unavailable, compose from atomic tokens (e.g., `font-family`, `font-size`, `font-weight`, etc.) using `var(--wst-...)` for each part. Never use raw values, except the explicit web-safe/system font exception above.

### Status variants (no raw colors)
- Info: use accent tokens (prefer `var(--wst-accent-1-color)`).
- Warning: use `var(--wst-accent-3-color)`.
- Error/Success: choose from available accent tokens (`--wst-accent-1/2/3/4`) by intent; never invent hex/rgb/rgba.
- Tints/overlays: derive from a token to `transparent` (avoid rgba literals).

## Global token sourcing policy (colors and fonts)

- Allowed everywhere (CSS and manifest defaults): `var(--wst-…)`, `transparent`, `currentColor`.
- Prohibited anywhere: hex (`#rgb/#rgba/#rrggbb/#rrggbbaa`), `rgb()/rgba()`, `hsl()/hsla()`, named colors (`red`, `blue`, etc.), `color-mix()`, `color()`.
- Prohibited anywhere (fonts): raw font-size values (px/rem/em), raw font-weight numbers/keywords, raw `font-style`, raw `line-height`, raw `letter-spacing`. For `font-family`, raw stacks are prohibited EXCEPT when the user explicitly requests a web-safe/system font for a specific element/property; in that case a literal `font-family` stack is allowed and MUST be mirrored in the manifest `defaultValue`. All other font properties remain token-only.
- Gradients are prohibited anywhere. Do not use gradient functions (`linear-gradient`, `radial-gradient`, `conic-gradient`, repeating gradients) or background-image gradients. Use solid token colors only. Overlays must use a single solid token with opacity.
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
- Scan CSS and manifest for any of: `font: ` (without `var(--wst-`), `font-size:`, `font-weight:`, `font-style:`, `line-height:`, `letter-spacing:` using raw values. Replace with the appropriate `var(--wst-...)` tokens. For `font-family`, flag raw stacks unless they match the explicit web-safe/system font exception; when allowed, ensure the same stack appears in the manifest `defaultValue`.

## Overlay techniques (token-only)

Overlays must use a single solid token background on a separate layer (e.g., `::before` or `::after`) and control translucency with the layer's `opacity`. Gradients are not allowed.

```css
.component::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--wst-base-2-color);
  opacity: 0.1; /* adjust as needed */
  pointer-events: none;
}
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

**Status chips/badges:** Backgrounds and glows use accent tokens; borders use `currentColor` or a token. Avoid shimmer effects that require gradients.

## Variant palettes (no custom hex)

- Do not introduce additional brand hues via hex/rgb/hsl (e.g., purple/pink/teal/orange codes).
- Build all variant palettes from existing tokens only:
  - Blue/primary accents → `--wst-accent-1-color`
  - Warm/attention accents → `--wst-accent-3-color`
  - Deep/contrast accents → `--wst-accent-4-color`
  - Neutrals → `--wst-base-*` and `--wst-shade-*`
- For multiple variants, combine accent tokens with shades; do not use gradients. Use `transparent` for fades where appropriate.

### Explicit user color requests (exception to token-only)

- When the user explicitly requests a color (e.g., “make the button #FF00FF”, “make it red”), first try to map that color to the closest brand token using the provided brand palette (base + aliases).
- Similarity guidance (model-friendly heuristic):
  - Convert both the requested color and the candidate token base color to HSL.
  - Consider a match if: hue distance ≤ 15°, |Δs| ≤ 0.2, |Δl| ≤ 0.2. Prefer direct token aliases where available.
- If a sufficiently similar token exists, use that token normally.
- If no sufficiently similar token exists, use the requested color as a literal for that specific property/element only. Mirror the same literal in both the CSS and the manifest `defaultValue`.
- Scope this exception narrowly: all other colors remain token-only (`var(--wst-...)`, `transparent`, `currentColor`).
- **Gradients are never allowed**, even if explicitly requested by the user.

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

- Text on surfaces: use paragraph/heading tokens on primary/secondary/container/box surfaces. Avoid long-form text directly on intense accent backgrounds.
- Text on accent backgrounds: use `var(--wst-base-1-color)`; reserve accent backgrounds for small UI (badges/chips/CTAs).
 - Text on imagery: add a solid token overlay (layer opacity ≥ 0.2 for headings, ≥ 0.3 for body), then use paragraph/heading tokens.
 - Contrast targets (WCAG): body text ≥ 4.5:1; large text (≥ 24px or 18.66px bold) and UI ≥ 3:1.
 - Neutral pairing rule with brand palette: on light surfaces (≈ `--wst-base-1-color` or primary/secondary/container/box), use paragraph/heading tokens (≈ `--wst-base-2-color`); on dark surfaces (≈ `--wst-base-2-color`), use `--wst-base-1-color`.
 - Hover/focus/disabled must preserve contrast; do not switch background to the same/near-same color as the text.
 - Overlays must render behind content (never cover text). If needed, set overlay z-index lower than content and keep overlays token-only.
 - Hover overlays: do not simulate solid hover fills with a full-cover ::before. If an overlay is used, keep opacity ≤ 0.2 and behind content.
 - Solid hover fills: if hover background becomes an accent, set text to `var(--wst-base-1-color)`; if it becomes a light surface, set text to `var(--wst-base-2-color)`. Maintain UI contrast ≥ 3:1.
