## EditorElement

The editor element is where we define most of the element behaviors in the editor and start to define the element tree.

Main Properties of the element

| Key                                | Type                                                                | Description                                                                                                                                                                                                                                                         | More Info                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector                           | string                                                              | DOM Query selector for this element that we can use to find it when rendering it (preferably a className)                                                                                                                                                           | minLength: 4, maxLength: 50                                                                                                                                                  |
| displayName                        | string                                                              | Human friendly name on the editor stage when the component is in interaction with the user                                                                                                                                                                          | minLength: 4, maxLength: 20, translatable                                                                                                                                    |
| [cssProperties](css-properties.md) | [map<string, CssPropertyItem>](css-properties.md#css-property-item) | css-api of this element, a map of css-property-items where the key is the [css-property-type](css-properties.md#css-property-types) name and the value is the css-porperty-item definition. These will be manifested as CSS overrides in the scope of the component | -                                                                                                                                                                            |
| data                               | [map<string, DataItem>](data.md)                                    | data-api of this element, a map of data-items where the key is the data-item name and the value is the data-item definition. These will be manifested as `props` for the component                                                                                  | This is the data the user can set in the editor                                                                                                                              |
| elements                           | [map<string, ElementItem>](elements.md)                             | The key in the map is the element identifier. A map of inner-elements with definitions of editor behaviors                                                                                                                                                          | Elements defined here can have additional setting of data, CSS properties, CSS custom properties and presets. They allow better interaction with the component in the editor |
| layout                             | [Layout Object](layout.md)                                          | Layout capabilities of the component                                                                                                                                                                                                                                | -                                                                                                                                                                            |
| archetype                          | [Archetype](archetype.md)                                           | The Archetype of this component , to be used for classification for AI models                                                                                                                                                                                       | This hints of the main use case of the component                                                                                                                             |

Examples

### Button Component Example

```json
{
  "selector": ".custom-button",
  "displayName": "Custom Button",
  "archetype": "button",
  "data": {
    "text": {
      "dataType": "text",
      "displayName": "Button Text",
      "defaultValue": "Click me",
      "text": {
        "minLength": 1,
        "maxLength": 50
      }
    },
    "variant": {
      "dataType": "textEnum",
      "displayName": "Button Animation Style",
      "defaultValue": "primary",
      "textEnum": {
        "options": [
          {
            "value": "primary",
            "label": "Primary"
          },
          {
            "value": "secondary",
            "label": "Secondary"
          },
          {
            "value": "outline",
            "label": "Outline"
          }
        ]
      }
    },
    "disabled": {
      "dataType": "booleanValue",
      "displayName": "Disabled",
      "defaultValue": "false"
    },
    "link": {
      "dataType": "link",
      "displayName": "Button Link",
      "link": {
          "linkTypes": ["externalLink"]
      }
  },
  "cssProperties": {
    "backgroundColor": {
      "displayName": "Background Color",
      "defaultValue": "var(--wst-accent-1-color)"
    },
    "color": {
      "displayName": "Text Color",
      "defaultValue": "var(--wst-base-1-color)"
    },
    "padding": {
      "displayName": "Padding",
      "defaultValue": "12px 24px"
    }
  },
  "layout": {
    "resizeDirection": "horizontal",
    "contentResizeDirection": "none"
  },
}
```

### Paragraph Component Example

```json
{
  "selector": ".custom-paragraph",
  "displayName": "Rich Paragraph",
  "archetype": "text",
  "data": {
    "content": {
      "dataType": "richText",
      "displayName": "Paragraph Content",
      "defaultValue": "<p>Enter your text here...</p>",
      "text": {
        "minLength": 1,
        "maxLength": 2000
      },
      "richTextAbilities": ["bold", "italic", "underline", "link", "color"]
    },
    "alignment": {
      "dataType": "textEnum",
      "displayName": "Text Alignment",
      "defaultValue": "left",
      "textEnum": {
        "options": [
          {
            "value": "left",
            "label": "Left"
          },
          {
            "value": "center",
            "label": "Center"
          },
          {
            "value": "right",
            "label": "Right"
          },
          {
            "value": "justify",
            "label": "Justify"
          }
        ]
      }
    },
    "showDropCap": {
      "dataType": "booleanValue",
      "displayName": "Show Drop Cap",
      "defaultValue": "false"
    },
    "readMoreLink": {
      "dataType": "link",
      "displayName": "Read More Link",
      "link": {
        "linkTypes": ["internalLink", "externalLink"]
      }
    }
  },
  "cssProperties": {
    "color": {
      "displayName": "Text Color",
      "defaultValue": "var(--wst-paragraph-2-color)"
    },
    "fontSize": {
      "displayName": "Font Size",
      "defaultValue": "16px"
    },
    "fontFamily": {
      "displayName": "Font Family",
      "defaultValue": "Arial, sans-serif"
    },
    "margin": {
      "displayName": "Margin",
      "defaultValue": "0 0 16px 0"
    }
  },
  "layout": {
    "resizeDirection": "horizontal",
    "contentResizeDirection": "vertical"
  }
}
```
