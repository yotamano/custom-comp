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
