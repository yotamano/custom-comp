Automatic Panels Service
------------------------

The Automatic Panels Service is a powerful feature that automatically generates editor panels for CSS properties and data properties defined in your component manifest. This service eliminates the need for manual panel configuration by creating intuitive, user-friendly editing interfaces based on your component's schema definition.

When you define [CSS Properties](css-properties.md), [CSS Custom Properties](css-properties.md#css-custom-property-item), or [Data Items](data.md) in your component manifest, the Automatic Panels Service analyzes these definitions and generates appropriate editor panels with the correct input controls, validation, and user experience patterns.

## How It Works

The service automatically:
1. **Scans** your component manifest for CSS properties, CSS custom properties, and data definitions
2. **Generates** appropriate input controls based on the property type (color pickers, text inputs, dropdowns, etc.)
3. **Applies** validation rules and constraints defined in your schema
4. **Creates** organized panel layouts with proper grouping and labeling
5. **Handles** default values and state management automatically

## Supported Data Types

The Automatic Panels Service currently supports the following [Data Types](data.md#datatype) for automatic panel generation:

| Data Type | Value | Description | Panel Control |
|-----------|-------|-------------|---------------|
| text | 1 | A simple text value | Text input field |
| textEnum | 2 | A list of predefined textual values to choose from | Dropdown/Select control |
| number | 3 | Any number | Number input with validation |
| booleanValue | 4 | true / false value | Toggle/Checkbox control |
| localDate | 12 | Local date output ISO-8601 extended local date format (YYYY-MM-DD) | Date picker |
| localTime | 13 | Local time output ISO-8601 extended local time format (hh:mm[:ss][.sss]) | Time picker |
| webUrl | 15 | a URL with scheme http or https | URL input with validation |
| link | 6 | A Wix Link object type | Link selector with multiple link types |
| vectorArt | 9 | A Wix Sanitized Vector Art object | Vector art picker from media manager |
| video | 8 | A Wix Video object type | Video picker from media manager |
| image | 7 | A Wix Image object type | Image picker from media manager |
| direction | 24 | selected `direction` for the component according to [HTML `dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) | Direction selector (LTR/RTL) |
| arrayItems | 23 | An array type of data | Dynamic array editor with add/remove controls |

### Array Items Support
The service fully supports nested array items with all the above data types as array elements, allowing for complex data structures with automatic panel generation for each array item.

## Supported CSS Property Types

The Automatic Panels Service supports the following [CSS Property Types](css-properties.md#css-property-types) for automatic panel generation:

### Background Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| background | 21 | Background property | Background editor with image/color options |
| backgroundColor | 23 | Background color property | Color picker |
| backgroundImage | 24 | Background image property | Image picker with background options |
| opacity | 127 | Opacity property | Slider (0-1) or percentage input |

### Border Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| border | 51 | Border property | Border editor with width/style/color |
| borderTop | 55 | Top border property | Border editor for top side |
| borderRight | 59 | Right border property | Border editor for right side |
| borderBottom | 63 | Bottom border property | Border editor for bottom side |
| borderLeft | 67 | Left border property | Border editor for left side |
| borderWidth | 52 | Border width property | Width input with units |
| borderStyle | 53 | Border style property | Style dropdown (solid, dashed, etc.) |
| borderColor | 54 | Border color property | Color picker |
| borderTopWidth | 57 | Top border width property | Width input for top border |
| borderRightWidth | 61 | Right border width property | Width input for right border |
| borderBottomWidth | 65 | Bottom border width property | Width input for bottom border |
| borderLeftWidth | 69 | Left border width property | Width input for left border |
| borderTopStyle | 58 | Top border style property | Style dropdown for top border |
| borderRightStyle | 62 | Right border style property | Style dropdown for right border |
| borderBottomStyle | 66 | Bottom border style property | Style dropdown for bottom border |
| borderLeftStyle | 70 | Left border style property | Style dropdown for left border |
| borderTopColor | 56 | Top border color property | Color picker for top border |
| borderRightColor | 60 | Right border color property | Color picker for right border |
| borderBottomColor | 64 | Bottom border color property | Color picker for bottom border |
| borderLeftColor | 68 | Left border color property | Color picker for left border |
| borderInlineStart | 71 | Inline start border property | Border editor for inline start |
| borderInlineEnd | 75 | Inline end border property | Border editor for inline end |

### Border Radius Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| borderRadius | 91 | Border radius property | Radius editor with corner controls |
| borderTopLeftRadius | 92 | Top-left border radius property | Radius input for top-left corner |
| borderTopRightRadius | 93 | Top-right border radius property | Radius input for top-right corner |
| borderBottomLeftRadius | 95 | Bottom-left border radius property | Radius input for bottom-left corner |
| borderBottomRightRadius | 94 | Bottom-right border radius property | Radius input for bottom-right corner |
| borderStartStartRadius | 96 | Start-start border radius property | Radius input for start-start corner |
| borderStartEndRadius | 97 | Start-end border radius property | Radius input for start-end corner |
| borderEndStartRadius | 98 | End-start border radius property | Radius input for end-start corner |
| borderEndEndRadius | 99 | End-end border radius property | Radius input for end-end corner |

### Typography Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| color | 109 | Color property | Color picker |
| font | 101 | Font property | Font selector with family/size/weight |
| fontFamily | 102 | Font family property | Font family dropdown |
| fontSize | 103 | Font size property | Size input with units |
| fontStyle | 105 | Font style property | Style dropdown (normal, italic) |
| fontWeight | 107 | Font weight property | Weight selector (100-900) |
| lineHeight | 108 | Line height property | Line height input |
| letterSpacing | 110 | Letter spacing property | Spacing input with units |
| textAlign | 112 | Text alignment property | Alignment buttons (left, center, right, justify) |
| textTransform | 113 | Text transform property | Transform dropdown (none, uppercase, lowercase, capitalize) |
| textDecorationLine | 123 | Text decoration line property | Decoration options (none, underline, line-through) |
| textShadow | 114 | Text shadow property | Shadow editor with offset/blur/color |
| writingMode | 111 | Writing mode property | Writing mode selector |
| listStyle | - | List style property | List style editor with type/position/image |
| textIndent | 116 | Text indent property | Indent input with units |
| textDirection | - | Text direction property | Direction selector (ltr/rtl) |

### Spacing Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| padding | 41 | Padding property | Spacing editor with individual sides |
| paddingTop | 42 | Top padding property | Spacing input for top |
| paddingRight | 43 | Right padding property | Spacing input for right |
| paddingBottom | 44 | Bottom padding property | Spacing input for bottom |
| paddingLeft | 45 | Left padding property | Spacing input for left |
| paddingInlineStart | 46 | Inline start padding property | Spacing input for inline start |
| paddingInlineEnd | 47 | Inline end padding property | Spacing input for inline end |

### Layout Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| height | 136 | Height property | Size input with units |
| flexDirection | 135 | Flex direction property | Direction selector (row, column, etc.) |
| justifyContent | 133 | Justify content property | Alignment selector for flex items |

### Gap Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| gap | 138 | Gap property | Gap input with units |
| columnGap | 139 | Column gap property | Column gap input |
| rowGap | 140 | Row gap property | Row gap input |

### Shadow Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| boxShadow | 126 | Box shadow property | Shadow editor with multiple shadow support |
| backdropFilter | 142 | Backdrop filter property | Filter editor (dropShadow function only) |
| filter | 141 | Filter property | Filter editor (dropShadow function only) |

### SVG Properties
| Property Type | Value | Description | Panel Control |
|---------------|-------|-------------|---------------|
| stroke | 147 | Stroke property | Stroke color picker |
| strokeWidth | 148 | Stroke width property | Width input for stroke |
| strokeOpacity | 149 | Stroke opacity property | Opacity slider for stroke |

### CSS Data Types
The service also supports CSS data types for custom properties:

| Data Type | Value | Description | Panel Control |
|-----------|-------|-------------|---------------|
| length | 4 | Length value (e.g., px, em, rem) | Length input with unit selector |
| angle | 3 | Angle value (e.g., deg, rad) | Angle input with unit selector |
| number | 1 | Numeric value | Number input |
| blendMode | 7 | Blend mode value | Blend mode dropdown |
| customEnum | 9 | Custom enumeration value | Custom dropdown with defined options |
| color | 4 | Color value | Color picker |

## Unsupported Types

The following types from the [CSS Properties](css-properties.md) and [Data](data.md) documentation are **currently not supported** by the Automatic Panels Service:

### Unsupported Data Types
- `a11y` (5) - Accessibility attributes
- `audio` (10) - Audio objects
- `localDateTime` (14) - Local date-time
- `email` (16) - Email addresses
- `phone` (17) - Phone numbers
- `hostname` (18) - Hostnames
- `regex` (19) - Regular expressions
- `guid` (20) - Unique identifiers
- `richText` (21) - Rich text with HTML
- `container` (22) - Container elements
- `menuItems` (25) - Menu item arrays

### Unsupported CSS Property Types
The service does not support many advanced CSS properties including:
- Margin properties (`margin`, `marginTop`, etc.)
- Advanced background properties (`backgroundSize`, `backgroundPosition`, etc.)
- Text decoration properties (`textDecoration`, `textDecorationColor`, etc.)
- Display and positioning properties (`display`, `alignSelf`, etc.)
- Advanced layout properties (`width`, `alignItems`, etc.)
- Object properties (`objectFit`, `objectPosition`)
- Advanced effects (`mixBlendMode`, `isolation`)
- Fill properties (`fill`, `fillOpacity`)

For a complete list of all available CSS property types, see [CSS Property Types](css-properties.md#css-property-types).
For the most up-to-date information on supported types and features, refer to this documentation
