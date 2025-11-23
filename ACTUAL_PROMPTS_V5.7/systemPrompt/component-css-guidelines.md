Component's css MUST follow the following guidelines:

- All component styling should be defined in the CSS section. Never define inline style.
  - The component's CSS MUST match the style namespace:
  - Classnames and selectors MUST match the selectors in the manifest
  - editorElement selector MUST target the top level element of the component
  - CSS default values must exactly match manifest defaultValue for the same property
- All color styling MUST use CSS variables per `<css-variables-guidelines />`. See that section for token usage, overlay patterns, and pairing rules.
- Exception: if the user explicitly requests a color and no sufficiently similar brand token exists, you MAY use a literal color for that specific property/element. The same literal MUST appear in both CSS and the manifest `defaultValue`.
- All typography (font-family, font-size, font-weight, font-style, line-height, letter-spacing) MUST use tokens per `<css-variables-guidelines />`. Prefer composite `--wst-*-font` tokens; otherwise use atomic font tokens.
- Exception (fonts): if the user explicitly requests a web-safe/system font, you MAY set a literal font-family stack for that specific element/property and mirror it in the manifest defaultValue. Otherwise use typography tokens; no other raw font values.
- Gradients are not supported in the editing experience. Do not use `linear-gradient`, `radial-gradient`, `conic-gradient`, repeating gradients, or any background-image gradients. Use solid token colors only.
- All elements' `box-sizing` property should be set to `border-box`
- DO NOT use transition: all or universal transitions
- The component, as well as all elements inside, must be FULLY responsive, and look great in all screen sizes.
  Do so by using modern css, WITHOUT using media queries.

You can and should define CSS that was not defined in the manifest, if it contributes to the component style. When doing so, make sure you DO NOT override any manifest definitions.

---
### Responsive Layout (Container + Viewport)

Components must respond to BOTH container size (user's bounding box: 300px-1200px) AND viewport size (mobile→desktop: 375px-1920px).

#### Container-Responsive Layout

Use these patterns for layout structure that adapts to container width:

```css
/* Grid auto-fit (cards, galleries) */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 1.5rem;
```

```css
/* Flex-wrap (toolbars, mixed items) */
display: flex;
flex-wrap: wrap;
gap: 1rem;

.flex-item {
  flex: 1 1 200px; /* Wraps when container < 200px per item */
  min-width: 0;
}
```

```css
/* Percentage widths (images, content) */
width: 100%; /* Fills container */
height: auto;
```

#### Viewport-Responsive Typography

Text scales with screen size for readability:

```css
font-size: clamp(1.5rem, 3vw, 2.5rem); /* Headings: 24-40px */
font-size: clamp(1rem, 1.5vw, 1.25rem); /* Body: 16-20px */
```

#### Spacing Strategy

Use fixed spacing or tight clamp ranges only. Formula: `(max - min) / min ≤ 0.5`

```css
/* ✅ Fixed - simple and predictable */
padding: 1.5rem;
gap: 1.5rem;

/* ✅ Tight clamp - subtle scaling */
padding: clamp(1.25rem, 2vw, 1.75rem); /* 20-28px, 40% variation */

/* ❌ Wide clamp - creates problems */
padding: clamp(1.5rem, 4vw, 2.5rem); /* 24-40px, 67% variation - too wide! */
```

#### Container Filling

Root component must fill its bounding box:

```css
/* ✅ CORRECT */
.component {
  width: 100%;
  height: 100%;
}

/* ❌ WRONG - defeats user's bounding box control */
.component {
  max-width: 800px;
  margin: 0 auto;
}

/* ✅ Inner wrappers CAN constrain for readability */
.component__inner {
  max-width: 1200px;
  margin: 0 auto;
}
```
