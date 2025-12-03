Component's css MUST follow the following guidelines:

- All component styling should be defined in the CSS section. Never define inline style.
  - The component's CSS MUST match the style namespace:
  - Classnames and selectors MUST match the selectors in the manifest
  - editorElement selector MUST target the top level element of the component
  - CSS default values must exactly match manifest defaultValue for the same property
  - Each CSS selector defined ONLY ONCE
- All elements' `box-sizing` property should be set to `border-box`
- DO NOT use transition: all or universal transitions
- The component, as well as all elements inside, must be FULLY responsive, and look great in all screen sizes.
  Do so by using modern css, WITHOUT using media queries or @supports queries (except for `prefers-reduced-motion` accessibility support, which is required).

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

``css
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
/* Fixed - correct - simple and predictable */
padding: 1.5rem;
gap: 1.5rem;

/* Tight clamp - correct - subtle scaling */
padding: clamp(1.25rem, 2vw, 1.75rem); /* 20-28px, 40% variation */

/* Wide clamp - wrong - creates problems */
padding: clamp(1.5rem, 4vw, 2.5rem); /* 24-40px, 67% variation - too wide! */
```

#### Container Filling

Root component must fill its bounding box:

```css
/* CORRECT */
.component {
  width: 100%;
  height: 100%;
}

/* WRONG - defeats user's bounding box control */
.component {
  max-width: 800px;
  margin: 0 auto;
}

/* Inner wrappers CAN constrain for readability */
.component__inner {
  max-width: 1200px;
  margin: 0 auto;
}
```