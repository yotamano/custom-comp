Component's css MUST follow the following guidelines:

- All component styling should be defined in the CSS section. Never define inline style.
  - The component's CSS MUST match the style namespace:
  - Classnames and selectors MUST match the selectors in the manifest
  - editorElement selector MUST target the top level element of the component
  - CSS default values must exactly match manifest defaultValue for the same property
- All color styling MUST use CSS variables per `<css-variables-guidelines />`. No hex/rgb/hsl literals anywhere in CSS or manifest defaults. See that section for token usage, overlay patterns, and pairing rules.
- All typography (font-family, font-size, font-weight, font-style, line-height, letter-spacing) MUST use tokens per `<css-variables-guidelines />`. Prefer composite `--wst-*-font` tokens; otherwise use atomic font tokens. No raw font values in CSS or manifest defaults.
- All elements' `box-sizing` property should be set to `border-box`
- DO NOT use transition: all or universal transitions
- The component, as well as all elements inside, must be FULLY responsive, and look great in all screen sizes.
  Do so by using modern css, WITHOUT using media queries.

You can and should define CSS that was not defined in the manifest, if it contributes to the component style. When doing so, make sure you DO NOT override any manifest definitions.

---
### Modern Responsive Patterns

To achieve fluid, responsive layouts **without media queries**, you must use modern CSS techniques. Here are key patterns to follow:

#### Typography Scaling
Use `clamp()` to make font size fluid between a minimum and maximum value based on the viewport width.
```css
font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem);
```

#### Responsive Spacing
Apply `clamp()` to layout properties like `gap` and `padding` to create adaptive space.
```css
gap: clamp(1rem, 3vw, 2.5rem);
padding: clamp(1rem, 4vw, 3rem);
```

#### Adaptive Grids
Use `grid-template-columns` with `auto-fit` and `minmax()` to create card grids that automatically adjust the number of columns based on the available container width.
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: clamp(1rem, 2vw, 2rem);
```

#### Flexbox Wrapping
For multi-column layouts, use `flex-wrap` with `flex-basis` to allow elements to wrap naturally onto the next line in narrow containers.
```css
.component__container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.component__main {
  flex: 1 1 200px; /* Grows/shrinks, wraps below 200px */
  min-width: 0; /* Important for enabling text truncation */
}

.component__aside {
  flex: 0 0 auto; /* Stays at its content's width */
}
```
