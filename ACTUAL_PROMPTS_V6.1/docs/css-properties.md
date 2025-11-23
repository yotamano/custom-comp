StyleItem

---

# CSS Properties

The Wix System supports setting CSS Properties from the Editor to your component.
The values of the property can be changed depending on different resolutions the user chooses when designing his site.

CSS Properties are a description of the _css abilities_ at a specific selector defined in the component manifest. They are defined as a map of `cssPropertyKey` to the [css-property-item](#css-property-item).
They exist inside the [EditorElement](editorElement.md) and inside [Elements](elements.md)).

The key in the map _must_ be a valid css property type. This is what the Wix Platform will use to understand the component styling capabilites of that element.
Example definition in the `cssProperties` map:

```json
{
  "border": {
    "displayName": "Main Component Border",
  "defaultValue": "dashed 2px var(--wst-system-line-1-color)",
    "statesDefaultValues": {
      "error": "solid 2px var(--wst-accent-3-color)"
    }
  }
}
```

Example of CSS Property of `border`:

```css
.componentSelector {
  border: dashed 2px var(--wst-system-line-1-color);
}
/* The error state values */
.componentSelector .error {
  border: solid 2px var(--wst-accent-3-color);
}
```

\*\* Important Note

> Css Properties have special behavior for _shorthand properties_. The system understands shorthands and may use other css properties which can be inferred from the shorthand type. See more about this at in [CSS Shorthand Properties](#css-shorthand-properties).

Some style items have additional definitions that _can_ or _should_ be added to them.

# CSS Property Item

A CSS Property item defines the styling properties for a component using standard CSS properties.

| Key                 | Type                               | Description                                                                                 | More Info                                       |
| ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| displayName         | StringValue                        | Display name of the CSS property item                                                       | Max length: 100 characters, translatable        |
| defaultValue        | Value                              | Default value for the CSS property item when the component is in the "regular" state        | -                                               |
| statesDefaultValues | map<string, Value>                 | Default values for the CSS property item when the component is in one of the defined states | -                                               |
| filter              | [Filter](#filter)                  | Additional options to refine the filter variable                                            | Only present when using filter property         |
| backdropFilter      | [BackdropFilter](#backdrop-filter) | Additional options to refine the backdropFilter variable                                    | Only present when using backdropFilter property |
| display             | [Display](#display)                | Additional options to refine the display variable                                           | Only present when using display property        |
| writingMode         | [WritingMode](#writing-mode)       | Additional options to refine the writingMode variable                                       | Only present when using writingMode property    |
| background          | [Background](#background)          | Additional options to refine the background variable                                        | Only present when using background property     |

## CSS Shorthand Properties

CSS shorthand properties are special in our system since we infer other CSS properties we can assign to the component level according to standard CSS. When you define a shorthand property, the system automatically understands that the related individual properties are also available for styling.

| Shorthand Property                                                                 | Derived Individual Properties                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Description                                               |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)                  | `borderWidth`, `borderStyle`, `borderColor`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderTopWidth`, `borderTopStyle`, `borderTopColor`, `borderRightWidth`, `borderRightStyle`, `borderRightColor`, `borderBottomWidth`, `borderBottomStyle`, `borderBottomColor`, `borderLeftWidth`, `borderLeftStyle`, `borderLeftColor`, `borderInlineStart`, `borderInlineEnd`, `borderInlineStartWidth`, `borderInlineStartStyle`, `borderInlineStartColor`, `borderInlineEndWidth`, `borderInlineEndStyle`, `borderInlineEndColor` | Defines all border-related properties for all sides       |
| [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)          | `backgroundColor`, `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat`, `backgroundClip`, `backgroundOrigin`, `backgroundAttachment`                                                                                                                                                                                                                                                                                                                                                                                | Sets all background-related properties in one declaration |
| [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)                  | `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginInlineStart`, `marginInlineEnd`                                                                                                                                                                                                                                                                                                                                                                                                                                              | Controls spacing outside the element on all sides         |
| [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)                | `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `paddingInlineStart`, `paddingInlineEnd`                                                                                                                                                                                                                                                                                                                                                                                                                                        | Controls internal spacing inside the element on all sides |
| [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)                      | `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `fontVariant`, `fontStretch`, `lineHeight`                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sets all font-related properties in one declaration       |
| [textDecoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | `textDecorationLine`, `textDecorationColor`, `textDecorationStyle`, `textDecorationThickness`                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Controls all aspects of text decoration styling           |
| [borderRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)     | `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomRightRadius`, `borderBottomLeftRadius`, `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius`, `borderEndEndRadius`                                                                                                                                                                                                                                                                                                                                            | Sets corner rounding for all corners of an element        |

## Example Usage

When you define a shorthand property like `border`, users can override specific aspects using the individual properties:

```json
{
  "border": {
    "displayName": "Component Border",
    "defaultValue": "2px solid var(--wst-system-line-1-color)"
  }
}
```

This automatically makes these individual properties available:

- `borderWidth: "2px"`
- `borderStyle: "solid"`
- `borderColor: "var(--wst-system-line-1-color)"`
- Plus all directional variants (`borderTop`, `borderRight`, etc.)

Users can then override specific sides:

```css
.component {
  border: 2px solid var(--wst-system-line-1-color); /* From shorthand */
  border-top-color: var(--wst-accent-3-color); /* Override just the top color */
}
```

## Filter Function

The supported [CSS Filter Functions](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#syntax).

| Value | Function                                                                                    | Description                                     | MDN Link                                                                                      |
| ----- | ------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 0     | UNKNOWN_FilterFunctions                                                                     | Default when no filter function is specified    | -                                                                                             |
| 1     | [blur](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur)               | Applies a Gaussian blur to the input image      | [blur()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur)               |
| 2     | [brightness](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness)   | Adjusts the brightness of the input image       | [brightness()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness)   |
| 3     | [contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast)       | Adjusts the contrast of the input image         | [contrast()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast)       |
| 4     | [drop_shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow) | Applies a drop shadow effect to the input image | [drop-shadow()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow) |
| 5     | [grayscale](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/grayscale)     | Converts the input image to grayscale           | [grayscale()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/grayscale)     |
| 6     | [hue_rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate)   | Applies a hue rotation to the input image       | [hue-rotate()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate)   |
| 7     | [invert](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert)           | Inverts the samples in the input image          | [invert()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert)           |
| 8     | [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity)         | Applies transparency to the input image         | [opacity()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity)         |
| 9     | [sepia](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia)             | Converts the input image to sepia               | [sepia()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia)             |
| 10    | [saturate](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate)       | Adjusts the saturation of the input image       | [saturate()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate)       |

## BackdropFilter

Additional options to refine the backdropFilter variable. The backdrop-filter CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element.

| Key              | Type                                 | Description                                    | More Info                                                                                          |
| ---------------- | ------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| filter_functions | [FilterFunction](#filter-function)[] | List of filter functions to expose to the user | Max size: 100 functions, uses the same [filter functions](#filter-function) as the filter property |

## Display

Additional options to refine the display variable. The display CSS property sets whether an element is treated as a block or inline element and the layout used for its children.

| Key            | Type                             | Description                                  | More Info           |
| -------------- | -------------------------------- | -------------------------------------------- | ------------------- |
| display_values | [DisplayValue](#display-value)[] | List of display values to expose to the user | Max size: 20 values |

## Display Value

The supported [CSS Display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) values.

| Value | Display                                                                               | Description                                                                 | MDN Link                                                                                       |
| ----- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 0     | UNKNOWN_DisplayValue                                                                  | Default when no display value is specified                                  | -                                                                                              |
| 1     | [none](https://developer.mozilla.org/en-US/docs/Web/CSS/display#none)                 | Removes the element from the layout                                         | [display: none](https://developer.mozilla.org/en-US/docs/Web/CSS/display#none)                 |
| 2     | [block](https://developer.mozilla.org/en-US/docs/Web/CSS/display#block)               | Generates a block element box                                               | [display: block](https://developer.mozilla.org/en-US/docs/Web/CSS/display#block)               |
| 3     | [inline](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline)             | Generates one or more inline element boxes                                  | [display: inline](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline)             |
| 4     | [flow](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flow)                 | Generates a block container with inline-level contents                      | [display: flow](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flow)                 |
| 5     | [flowRoot](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flow-root)        | Generates a block container with a new block formatting context             | [display: flow-root](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flow-root)       |
| 6     | [table](https://developer.mozilla.org/en-US/docs/Web/CSS/display#table)               | Behaves like a `<table>` element                                            | [display: table](https://developer.mozilla.org/en-US/docs/Web/CSS/display#table)               |
| 7     | [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flex)                 | Generates a block-level flex container                                      | [display: flex](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flex)                 |
| 8     | [grid](https://developer.mozilla.org/en-US/docs/Web/CSS/display#grid)                 | Generates a block-level grid container                                      | [display: grid](https://developer.mozilla.org/en-US/docs/Web/CSS/display#grid)                 |
| 9     | [list_item](https://developer.mozilla.org/en-US/docs/Web/CSS/display#list-item)       | Generates a block box for the content and a separate list-item inline box   | [display: list-item](https://developer.mozilla.org/en-US/docs/Web/CSS/display#list-item)       |
| 10    | [contents](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents)         | Makes the element's children participate in the parent's formatting context | [display: contents](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents)         |
| 11    | [inline_block](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-block) | Generates a block element box that flows with surrounding content           | [display: inline-block](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-block) |
| 12    | [inline_table](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-table) | Behaves like an inline `<table>` element                                    | [display: inline-table](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-table) |
| 13    | [inline_flex](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-flex)   | Generates an inline-level flex container                                    | [display: inline-flex](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-flex)   |
| 14    | [inline_grid](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-grid)   | Generates an inline-level grid container                                    | [display: inline-grid](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-grid)   |

## WritingMode

Additional options to refine the writingMode variable. The writing-mode CSS property sets whether lines of text are laid out horizontally or vertically, as well as the direction in which blocks progress.

| Key               | Type                                      | Description                                       | More Info           |
| ----------------- | ----------------------------------------- | ------------------------------------------------- | ------------------- |
| writingModeValues | [WritingModeValue](#writing-mode-value)[] | List of writing-mode values to expose to the user | Max size: 20 values |

## Writing Mode Value

The supported [CSS Writing Mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) values.

| Value | Writing Mode                                                                                | Description                                                                                           | MDN Link                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 0     | UNKNOWN_WritingModeValue                                                                    | Default when no writing mode value is specified                                                       | -                                                                                                          |
| 1     | [horizontalTb](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#horizontal-tb) | Text flows horizontally from left to right, top to bottom                                             | [writing-mode: horizontal-tb](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#horizontal-tb) |
| 2     | [verticalRl](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#vertical-rl)     | Text flows vertically from top to bottom, right to left                                               | [writing-mode: vertical-rl](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#vertical-rl)     |
| 3     | [verticalLr](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#vertical-lr)     | Text flows vertically from top to bottom, left to right                                               | [writing-mode: vertical-lr](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#vertical-lr)     |
| 4     | [sidewaysRl](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#sideways-rl)     | Text flows vertically from top to bottom, right to left, with characters rotated 90° clockwise        | [writing-mode: sideways-rl](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#sideways-rl)     |
| 5     | [sidewaysLr](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#sideways-lr)     | Text flows vertically from top to bottom, left to right, with characters rotated 90° counterclockwise | [writing-mode: sideways-lr](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#sideways-lr)     |

## CssNumber

Additional options to refine the number variable. Defines constraints and rules for numeric CSS values.

| Key        | Type       | Description                                     | More Info                                                |
| ---------- | ---------- | ----------------------------------------------- | -------------------------------------------------------- |
| minimum    | FloatValue | Indicates minimum value required for the number | Optional, sets the lower bound for the value             |
| maximum    | FloatValue | Indicates maximum value allowed for the number  | Optional, sets the upper bound for the value             |
| multipleOf | FloatValue | The multiplier for the number value             | Optional, ensures the value is a multiple of this number |

## CSS Data Types

The supported [CSS Data Types](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types) in Javascript naming format.

**Important note:** This enum is only used for validation purposes for CSS custom properties that point to value of a CSS data type. When adding new types make sure to add them also under CssPropertyType.

| Value | Type                                                                                   | Description                            |
| ----- | -------------------------------------------------------------------------------------- | -------------------------------------- |
| 0     | UNKNOWN_CssDataType                                                                    | Default when no data type is specified |
| 1     | [number](https://developer.mozilla.org/en-US/docs/Web/CSS/number)                      | Numeric value                          |
| 2     | [string](https://developer.mozilla.org/en-US/docs/Web/CSS/string)                      | String value                           |
| 3     | [angle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle)                        | Angle value (e.g., deg, rad)           |
| 4     | [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)                  | Color value                            |
| 5     | [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)                      | Length value (e.g., px, em, rem)       |
| 6     | [percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)              | Percentage value                       |
| 7     | [lengthPercentage](https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage) | Length or percentage value             |
| 8     | [blendMode](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode)               | Blend mode value                       |
| 9     | customEnum                                                                             | Custom enumeration value               |
| 10    | [time](https://developer.mozilla.org/en-US/docs/Web/CSS/time)                          | Time value (e.g., s, ms)               |

## CSS Property Types

The supported [CSS Property Types](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#index) and [CSS Data Types](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_data_types) in Javascript naming format.

| Value | Property                                                                                               | Description                                |
| ----- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| 0     | UNKNOWN_CssPropertyType                                                                                | Default when no property type is specified |
| 1     | [number](https://developer.mozilla.org/en-US/docs/Web/CSS/number)                                      | Numeric CSS data type                      |
| 2     | [string](https://developer.mozilla.org/en-US/docs/Web/CSS/string)                                      | String CSS data type                       |
| 3     | [angle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle)                                        | Angle CSS data type                        |
| 4     | [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)                                      | Length CSS data type                       |
| 5     | [percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)                              | Percentage CSS data type                   |
| 6     | [lengthPercentage](https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage)                 | Length or percentage CSS data type         |
| 7     | [blendMode](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode)                               | Blend mode CSS data type                   |
| 8     | customEnum                                                                                             | Custom enumeration CSS data type           |
| 9     | [time](https://developer.mozilla.org/en-US/docs/Web/CSS/time)                                          | Time CSS data type                         |
| 21    | [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)                              | Background property                        |
| 22    | [backgroundSize](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)                     | Background size property                   |
| 23    | [backgroundColor](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)                   | Background color property                  |
| 24    | [backgroundImage](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)                   | Background image property                  |
| 25    | [backgroundClip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)                     | Background clip property                   |
| 26    | [backgroundOrigin](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin)                 | Background origin property                 |
| 27    | [backgroundPosition](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)             | Background position property               |
| 28    | [backgroundRepeat](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)                 | Background repeat property                 |
| 29    | [backgroundAttachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment)         | Background attachment property             |
| 31    | [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)                                      | Margin property                            |
| 32    | [marginTop](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)                               | Top margin property                        |
| 33    | [marginRight](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right)                           | Right margin property                      |
| 34    | [marginBottom](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom)                         | Bottom margin property                     |
| 35    | [marginLeft](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left)                             | Left margin property                       |
| 36    | [marginInlineStart](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start)              | Inline start margin property               |
| 37    | [marginInlineEnd](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end)                  | Inline end margin property                 |
| 41    | [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)                                    | Padding property                           |
| 42    | [paddingTop](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top)                             | Top padding property                       |
| 43    | [paddingRight](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right)                         | Right padding property                     |
| 44    | [paddingBottom](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom)                       | Bottom padding property                    |
| 45    | [paddingLeft](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left)                           | Left padding property                      |
| 46    | [paddingInlineStart](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start)            | Inline start padding property              |
| 47    | [paddingInlineEnd](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end)                | Inline end padding property                |
| 51    | [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)                                      | Border property                            |
| 52    | [borderWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width)                           | Border width property                      |
| 53    | [borderStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)                           | Border style property                      |
| 54    | [borderColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color)                           | Border color property                      |
| 55    | [borderTop](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top)                               | Top border property                        |
| 56    | [borderTopColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color)                    | Top border color property                  |
| 57    | [borderTopWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width)                    | Top border width property                  |
| 58    | [borderTopStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-style)                    | Top border style property                  |
| 59    | [borderRight](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right)                           | Right border property                      |
| 60    | [borderRightColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color)                | Right border color property                |
| 61    | [borderRightWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width)                | Right border width property                |
| 62    | [borderRightStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-style)                | Right border style property                |
| 63    | [borderBottom](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom)                         | Bottom border property                     |
| 64    | [borderBottomColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-color)              | Bottom border color property               |
| 65    | [borderBottomWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width)              | Bottom border width property               |
| 66    | [borderBottomStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-style)              | Bottom border style property               |
| 67    | [borderLeft](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left)                             | Left border property                       |
| 68    | [borderLeftColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color)                  | Left border color property                 |
| 69    | [borderLeftWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width)                  | Left border width property                 |
| 70    | [borderLeftStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-style)                  | Left border style property                 |
| 71    | [borderInlineStart](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start)              | Inline start border property               |
| 72    | [borderInlineStartColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-color)   | Inline start border color property         |
| 73    | [borderInlineStartWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-width)   | Inline start border width property         |
| 74    | [borderInlineStartStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-style)   | Inline start border style property         |
| 75    | [borderInlineEnd](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end)                  | Inline end border property                 |
| 76    | [borderInlineEndColor](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-color)       | Inline end border color property           |
| 77    | [borderInlineEndWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-width)       | Inline end border width property           |
| 78    | [borderInlineEndStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-style)       | Inline end border style property           |
| 91    | [borderRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)                         | Border radius property                     |
| 92    | [borderTopLeftRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius)         | Top-left border radius property            |
| 93    | [borderTopRightRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius)       | Top-right border radius property           |
| 94    | [borderBottomRightRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius) | Bottom-right border radius property        |
| 95    | [borderBottomLeftRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius)   | Bottom-left border radius property         |
| 96    | [borderStartStartRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-start-start-radius)   | Start-start border radius property         |
| 97    | [borderStartEndRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-start-end-radius)       | Start-end border radius property           |
| 98    | [borderEndStartRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-end-start-radius)       | End-start border radius property           |
| 99    | [borderEndEndRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-end-end-radius)           | End-end border radius property             |
| 101   | [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)                                          | Font property                              |
| 102   | [fontFamily](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)                             | Font family property                       |
| 103   | [fontSize](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)                                 | Font size property                         |
| 104   | [fontStretch](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch)                           | Font stretch property                      |
| 105   | [fontStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)                               | Font style property                        |
| 106   | [fontVariant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant)                           | Font variant property                      |
| 107   | [fontWeight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)                             | Font weight property                       |
| 108   | [lineHeight](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)                             | Line height property                       |
| 109   | [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)                                        | Color property                             |
| 110   | [letterSpacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)                       | Letter spacing property                    |
| 111   | [writingMode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)                           | Writing mode property                      |
| 112   | [textAlign](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)                               | Text alignment property                    |
| 113   | [textTransform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)                       | Text transform property                    |
| 114   | [textShadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)                             | Text shadow property                       |
| 115   | [textOverflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)                         | Text overflow property                     |
| 116   | [textIndent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent)                             | Text indent property                       |
| 121   | [textDecoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)                     | Text decoration property                   |
| 122   | [textDecorationColor](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color)          | Text decoration color property             |
| 123   | [textDecorationLine](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line)            | Text decoration line property              |
| 124   | [textDecorationStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style)          | Text decoration style property             |
| 125   | [textDecorationThickness](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness)  | Text decoration thickness property         |
| 126   | [boxShadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)                               | Box shadow property                        |
| 127   | [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)                                    | Opacity property                           |
| 128   | [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)                                  | Overflow property                          |
| 131   | [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)                                    | Display property                           |
| 132   | [alignSelf](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)                               | Align self property                        |
| 133   | [justifyContent](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)                     | Justify content property                   |
| 134   | [alignItems](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)                             | Align items property                       |
| 135   | [flexDirection](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)                       | Flex direction property                    |
| 136   | [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)                                      | Height property                            |
| 137   | [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)                                        | Width property                             |
| 138   | [gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)                                            | Gap property                               |
| 139   | [columnGap](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)                               | Column gap property                        |
| 140   | [rowGap](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)                                     | Row gap property                           |
| 141   | [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)                                      | Filter property                            |
| 142   | [backdropFilter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)                     | Backdrop filter property                   |
| 143   | [objectFit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)                               | Object fit property                        |
| 144   | [objectPosition](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)                     | Object position property                   |
| 145   | [mixBlendMode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)                        | Mix blend mode property                    |
| 146   | [isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation)                                | Isolation property                         |
| 147   | [stroke](https://developer.mozilla.org/en-US/docs/Web/CSS/stroke)                                      | Stroke property                            |
| 148   | [strokeWidth](https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-width)                           | Stroke width property                      |
| 149   | [strokeOpacity](https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-opacity)                       | Stroke opacity property                    |
| 150   | [fill](https://developer.mozilla.org/en-US/docs/Web/CSS/fill)                                          | Fill property                              |
| 151   | [fillOpacity](https://developer.mozilla.org/en-US/docs/Web/CSS/fill-opacity)                           | Fill opacity property                      |

## Background Mode Enum

Background mode values for defining the type of background to be used.

| Value | Background Mode            | Description                                  |
| ----- | -------------------------- | -------------------------------------------- |
| 0     | UNKNOWN_BackgroundModeEnum | Default when no background mode is specified |
| 1     | shapeDividerSvg            | Shape divider SVG mode (Internal use only)   |

## Examples

## CSS Property Types Examples

**Note:** CSS Properties are defined in a `cssProperties` map where the **key** represents the CSS property type, and the **value** is the CSS Property Item object. The CSS Property Item itself does not contain a `cssPropertyType` field.

## Color (token-based)

```json
// In cssProperties map, key "color" points to:
{
  "defaultValue": "var(--wst-paragraph-2-color)",
  "displayName": "Button Font Color"
}
```

## Text Shadow with Length and Color (token-based):

```json
// In cssProperties map, key "textShadow" points to:
{
  "defaultValue": "0 2px 4px var(--wst-system-line-1-color)",
  "displayName": "Text Shadow Effect"
}
```

## Box Shadow with Multiple Values (token-based):

```json
// In cssProperties map, key "boxShadow" points to:
{
  "defaultValue": "0 4px 6px var(--wst-system-line-1-color)",
  "displayName": "Box Shadow Depth"
}
```

## Object Fit for Images:

```json
// In cssProperties map, key "objectFit" points to:
{
  "defaultValue": "cover",
  "displayName": "Image Fit Style"
}
```

## Mix Blend Mode:

```json
// In cssProperties map, key "mixBlendMode" points to:
{
  "defaultValue": "multiply",
  "displayName": "Blend Mode Effect"
}
```

## Text Overflow:

```json
// In cssProperties map, key "textOverflow" points to:
{
  "defaultValue": "ellipsis",
  "displayName": "Text Overflow Style"
}
```

## Gap for Grid/Flex:

```json
// In cssProperties map, key "gap" points to:
{
  "defaultValue": "16px",
  "displayName": "Element Spacing"
}
```

## Border Radius with Multiple Values:

```json
// In cssProperties map, key "borderRadius" points to:
{
  "defaultValue": "8px 16px 8px 16px",
  "displayName": "Corner Rounding"
}
```

## Font Variant:

```json
// In cssProperties map, key "fontVariant" points to:
{
  "defaultValue": "small-caps",
  "displayName": "Font Variant Style"
}
```
