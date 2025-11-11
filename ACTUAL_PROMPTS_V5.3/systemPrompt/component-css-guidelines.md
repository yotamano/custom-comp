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
### Container-First Responsiveness

Components live inside resizable bounding boxes that users can adjust. Your CSS must respond to the **container size**, not just the viewport size. Use these patterns in priority order:

#### Priority 1: Container-Responsive Layouts

These patterns make your component's structure adapt to its container width automatically:

**Adaptive Grids** (for equal-width items like cards, galleries):
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 1.5rem;
```
This automatically adjusts column count based on container width. In a 320px container: 1 column. In a 900px container: 3 columns.

**Flexbox Wrapping** (for variable-width items, toolbars, tag lists):
```css
.component__container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.component__item {
  flex: 1 1 200px; /* Grows/shrinks, wraps when container < 200px per item */
  min-width: 0; /* Important for enabling text truncation */
}
```

**Percentage-Based Sizing** (for images, columns):
```css
.image {
  width: 100%;
  height: auto;
}

.column {
  width: 50%; /* Always half of container */
  min-width: 200px;
}
```

#### Priority 2: Fixed Comfortable Spacing

For spacing (padding, gap, margin) and element sizes, **prefer fixed rem values**. They provide consistent, comfortable spacing that works across container sizes from 280px to 1200px+.

```css
.component {
  padding: 1.5rem;        /* Always comfortable */
  gap: 1.5rem;            /* Clear separation */
}

.icon {
  width: 48px;            /* Recognizable size */
  height: 48px;
}

.button {
  padding: 0.75rem 1.5rem; /* Consistent touch target */
}
```

**Why fixed works**: A 24px (1.5rem) gap is 8% of a 300px container and 2% of a 1200px container—both feel comfortable. The layout patterns (grid auto-fit, flex-wrap) handle responsiveness, while fixed spacing provides consistency.

#### Priority 3: Selective Fluid Spacing (Advanced)

**Only use `clamp()` with viewport units (vw) when:**
1. The component is typically full-width or near-full-width
2. The range is tight (max - min ≤ 2rem / 32px)
3. You have a specific reason and have tested in both small (300px) and large (1200px) containers

```css
/* Acceptable: Large container with subtle scaling */
.hero-section {
  padding: clamp(2rem, 2.5vw, 3rem); /* Tight 32-48px range */
}

/* Avoid: Viewport units for internal spacing */
.card {
  gap: clamp(0.5rem, 5vw, 3rem); /* ❌ Too wide range, responds to screen not container */
}
```

**Important**: Viewport units (vw, vh) respond to screen size, not container size. A component in a 300px sidebar on a 1920px screen will get spacing based on 1920px, which may be inappropriate for the small container.

#### Typography Scaling

For typography, prefer using CSS variable tokens which handle scaling:
```css
font: var(--wst-heading-4-font);
font: var(--wst-paragraph-2-font);
```

Only override with `clamp()` if you have a specific design reason:
```css
font-size: clamp(1.5rem, 2.5vw, 2.5rem); /* Use sparingly, tight bounds */
```
