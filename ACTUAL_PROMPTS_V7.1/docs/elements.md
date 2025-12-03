# Elements

Elements define the structure and behavior of components in the editor. They describe your component tree and elements that may be selectable in the editor and have their own attributes, just like the [editorElement](editorElement.md), some main ones are:

- [Data](data.md)
- [CSS Properties](css-properties.md)

## Element Type

The element type you should use is inlineElement:

1. [`inlineElement`](#inlineelement) - the developer defined the element in his React tree including all definitions of its schema

| Value | Type                | Description                                          |
| ----- | ------------------- | ---------------------------------------------------- |
| 0     | UNKNOWN_ElementType | Default value when element type is not specified     |
| 1     | inlineElement       | An element that was written as part of the component |

## ElementItem

Defines an element configuration for a component.

| Key           | Type                             | Description                                    | Constraints                                 |
| ------------- | -------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| elementType   | [ElementType](#element-type)     | Defines the type of element we are configuring | Required                                    |
| inlineElement | [InlineElement](#inline-element) | A new element definition                       | Only used when elementType is inlineElement |

## InlineElement

Defines a new element within a component.

| Key                                | Type                                                                | Description                                                                                                                                                                                                                                                         | Constraints                           |
| ---------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| selector                           | string                                                              | Relative DOM Query selector for this element                                                                                                                                                                                                                        | Length: 4-50 characters               |
| displayName                        | string                                                              | Human friendly name in the editor                                                                                                                                                                                                                                   | Length: 4-20 characters, translatable |
| [cssProperties](css-properties.md) | [map<string, CssPropertyItem>](css-properties.md#css-property-item) | css-api of this element, a map of css-property-items where the key is the [css-property-type](css-properties.md#css-property-types) name and the value is the css-porperty-item definition. These will be manifested as CSS overrides in the scope of the component | -                                     |

| data | map<string, [DataItem](data.md)> | Data API of this element | Will be manifested as props for the component |
| elements | map<string, [ElementItem](#elementitem)> | Map of inner elements | Elements can have additional settings |
| behaviors | [Behaviors](#behaviors) | Editor behaviors API | Determines supported editor experiences |
| archetype | [Archetype](editorElement.md#archetype) | Component archetype for AI classification | Hints at main use case |

## Behaviors

Defines the editor behaviors for an element.

| Key        | Type | Description                                                       | Constraints |
| ---------- | ---- | ----------------------------------------------------------------- | ----------- |
| selectable | bool | Determines if the inner-element can be selectable in the editor   | Optional    |
| removable  | bool | Determines if the inner-element can be removed from the component | Optional    |

## Examples

A custom product card element with nested element:

```json
{
  "elementType": "inlineElement",
  "inlineElement": {
    "selector": ".productCard",
    "displayName": "Product Card",
    "cssProperties": {
      "backgroundColor": {
        "displayName": "Card Background",
        "defaultValue": "var(--wst-base-1-color)"
      },
      "padding": {
        "displayName": "Card Padding",
        "defaultValue": "24px"
      },
      "borderRadius": {
        "displayName": "Card Radius",
        "defaultValue": "8px"
      }
    },
    "data": {
      "productTitle": {
        "dataType": "text",
        "displayName": "Product Title",
        "defaultValue": "Product Name"
      },
      "productPrice": {
        "dataType": "text",
        "displayName": "Product Price",
        "defaultValue": "$99.99"
      },
      "productDescription": {
        "dataType": "text",
        "displayName": "Product Description",
        "defaultValue": "Product description goes here"
      }
    },
    "elements": {
      "productImage": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".productImage",
          "displayName": "Product Image",
          "cssProperties": {
            "width": {
              "displayName": "Image Width",
              "defaultValue": "100%"
            },
            "height": {
              "displayName": "Image Height",
              "defaultValue": "auto"
            }
          },
          "data": {
            "imageUrl": {
              "dataType": "image",
              "displayName": "Product Image",
              "defaultValue": "https://example.com/default-product.jpg"
            }
          }
        }
      }
    },
    "behaviors": {
      "selectable": true,
      "removable": true
    }
  }
}
```

This example demonstrates:

1. A custom product card component with nested elements
2. CSS properties for styling the card and its elements
3. Data properties for product information
4. Editor behaviors
5. Proper selector and display name conventions
