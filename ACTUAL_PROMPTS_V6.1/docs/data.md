#Data

---

This is where the component data definition is. The data defined here is what Wix allows users to store as configuration for your component on their site.

The data has _three_ actual formats:

1. The data defined in this schema
2. The format in which we store it in the editor - this is done via panels and APIs in the editor UI
3. The format in which we will provide it the component in runtime - this is provided to the component as its `props`. These types can be attained in the [@wix/public-schemas](https://github.com/wix-private/thunderbolt/tree/master/packages/public-schemas) npm package.

## DataType

Let's look at the Schema format for defining the component.
These are the supported data types for storage in our system:

| Key              | Value | Description                                                                                                                                                           |
| ---------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNKNOWN_DataType | 0     | Default type when nothing is specified                                                                                                                                |
| text             | 1     | A simple text value                                                                                                                                                   |
| textEnum         | 2     | A list of predefined textual values to choose from                                                                                                                    |
| number           | 3     | Any number                                                                                                                                                            |
| booleanValue     | 4     | true / false value                                                                                                                                                    |
| a11y             | 5     | An object containing the selected A11Y fields chosen                                                                                                                  |
| link             | 6     | A Wix Link object type                                                                                                                                                |
| image            | 7     | A Wix Image object type                                                                                                                                               |
| video            | 8     | A Wix Video object type                                                                                                                                               |
| vectorArt        | 9     | A Wix Sanitized Vector Art object                                                                                                                                     |                                                  |
| localDate        | 12    | Local date output ISO-8601 extended local date format (YYYY-MM-DD)                                                                                                    |
| localTime        | 13    | Local time output ISO-8601 extended local time format (hh:mm[:ss][.sss])                                                                                              |                          |
| webUrl           | 15    | a URL with scheme http or https                                                             |                                                                                               |
| richText         | 21    | a HTML text with css inline styling                                                                                                                                   |
| arrayItems       | 23    | An array type of data                                                                                                                                                 |
| direction        | 24    | selected `direction` for the component according to [HTML `dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)                   |
| menuItems        | 25    | An array type of of menu-items                                                                                                                                        |

> Some of these have additional configuration you can specify, we will expand on that below.

## DataItem

Let's look at how we define a single data item.

| Key          | Type                      | Description                                                                                          | More Info                                                                                                    |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| dataType     | [DataType](#datatype)     | Defines the type of data we are configuring                                                          | See the list above in the dataType Section                                                                   |
| displayName  | string                    | Display name of this data item                                                                       | maxLength: 100, translatable: SHORT_TEXT                                                                     |
| defaultValue | Value                     | The default value of this data item (only for display purposes in the editor panels)                 | This value will be in string format and should align with the runtime format of the data, AKA `props` format |
| text         | [Text](#text-type)        | An optional object to define limitations on the text input                                           | Can only used when [dataType](#datatype) is text                                                             |
| textEnum     | TextEnum                  | A required list of options to supply to the users to choose from                                     | Can only used when [dataType](#datatype) is text_enum                                                        |
| number       | Number                    | An optional set of restrictions to apply to the number                                               | Can only used when [dataType](#dataitem) is number                                                           |
| a11y         | A11y                      | A required list of types we want to user to be able to specify, empty means all possible A11Y values | Only used when data_type is a11y                                                                             |
| link         | Link                      | A definition of what links should be supported                                                       | Only used when [dataType](#dataitem) is link                                                                 |
| arrayItems   | ArrayItems                | An array of a data type                                                                              | _Required_ when [dataType](#dataitem) is array_items                                                         |
| image        | Image                     | A definition of how images can be edited                                                             | Only used when [dataType](#dataitem) is `image`                                                              |
| video        | Video                     | A definition of how videos can be edited                                                             | Only used when [dataType](#dataitem) is `video`                                                              |
| vectorArt    | VectorArt                 | A definition of how SVG content can be edited                                                        | Only used when [dataType](#dataitem) is `vectorArt`                                                          |
| deprecated   | bool                      | Whether this data item is deprecated                                                                 | internal field for when a developer removes an item. _Can't be set from outside Wix_                         |
| richText     | [RichText](#richtexttype) | Filters for rich text abilities                                                                      | Defines which richText capabilities are enabled, if not defined then all of them                             |

## Data Types Enhancements

Some of the data type _may_ have additional definitions, some of them hav e _required_ additional definitions.

Here we will cover the options for each type which can be ehnanced.
Note that enhancements are enforced by the client and the server, so they are a binding part of the schema.

## Text Type

Configuration options for text type data items.

| Key       | Type   | Description                                    | More Info      |
| --------- | ------ | ---------------------------------------------- | -------------- |
| maxLength | int32  | Indicates maximum length allowed for the text  | Optional       |
| minLength | int32  | Indicates minimum length required for the text | Optional       |
| pattern   | string | A regex pattern that the text must comply with | maxLength: 100 |

## TextEnum Type

_Required_ configuration for text enum type data items.

| Key     | Type                        | Description              | More Info    |
| ------- | --------------------------- | ------------------------ | ------------ |
| options | [Option[]](#textenumoption) | List of valid enum items | maxSize: 100 |

### TextEnum.Option

Configuration for each option in a text enum.

| Key         | Type   | Description                     | More Info                    |
| ----------- | ------ | ------------------------------- | ---------------------------- |
| value       | string | Actual text value for this item | maxLength: 100, unique       |
| displayName | string | Display name for this text item | maxLength: 100, translatable |

## Number Type

Configuration options for number type data items.

| Key        | Type  | Description                                     | More Info |
| ---------- | ----- | ----------------------------------------------- | --------- |
| minimum    | float | Indicates minimum value required for the number | Optional  |
| maximum    | float | Indicates maximum value allowed for the number  | Optional  |
| multipleOf | float | The multiplier for the number value             | Optional  |

## A11y Type

Configuration options for accessibility attributes.

| Key        | Type                                | Description                                                    | More Info    |
| ---------- | ----------------------------------- | -------------------------------------------------------------- | ------------ |
| attributes | [A11yAttributes[]](#a11yattributes) | A collection of attributes that will be stated in the manifest | maxSize: 100 |

### A11yAttributes

Available accessibility attributes that can be configured.

| Value | Attribute              | Description                                                     |
| ----- | ---------------------- | --------------------------------------------------------------- |
| 0     | Unknown_AriaAttributes | Default when no attribute is specified                          |
| 1     | tabIndex               | The value used for tabIndex attribute                           |
| 2     | ariaLevel              | The value used for aria-level                                   |
| 3     | ariaExpanded           | The value used for aria-expanded                                |
| 4     | ariaDisabled           | The value used for aria-disabled                                |
| 5     | ariaAtomic             | The value used for aria-atomic                                  |
| 6     | ariaHidden             | The value used for aria-hidden                                  |
| 7     | ariaBusy               | The value used for aria-busy                                    |
| 8     | multiline              | Indicates if should add Multiline instructions to aria-label    |
| 9     | ariaAutocomplete       | Indicates if should add Autocomplete instructions to aria-label |
| 10    | ariaPressed            | The value used for aria-pressed                                 |
| 11    | ariaHaspopup           | The value used for aria-haspopup                                |
| 12    | ariaRelevant           | The value used for aria-relevant                                |
| 13    | role                   | The value used for role attribute                               |
| 14    | ariaLive               | The value used for aria-live                                    |
| 15    | ariaCurrent            | The value used for aria-current                                 |
| 16    | ariaLabel              | The text used for aria-label                                    |
| 17    | ariaRoledescription    | The text used for aria-roledescription                          |
| 18    | ariaDescribedby        | The value used for aria-describedby                             |
| 19    | ariaLabelledby         | The value used for aria-labelledby                              |
| 20    | ariaErrormessage       | The text used for aria-errormessage                             |
| 21    | ariaOwns               | The text used for aria-owns                                     |
| 22    | ariaControls           | The text used for aria-controls                                 |
| 23    | tag                    | The HTML tag to use for the element                             |
| 24    | ariaMultiline          | The value used for aria-multiline                               |
| 25    | ariaInvalid            | The value used for aria-invalid                                 |

## Link Type

Configuration options for link type data items.

| Key       | Type                    | Description                                                                                                                       | More Info   |
| --------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| linkTypes | [LinkType[]](#linktype) | A collection of possible link types that the component supports. Only one of the types will make it to the component after input. | maxSize: 12 |

### LinkType

Available types of links that can be configured.

| Value | Type             | Description                                                   |
| ----- | ---------------- | ------------------------------------------------------------- |
| 0     | UNKNOWN_LinkType | Default when no link type is specified                        |
| 1     | externalLink     | A link to another website                                     |
| 2     | anchorLink       | A link to an item on the current page                         |
| 3     | emailLink        | A valid email link (`mailto:example@example.com`)             |
| 4     | phoneLink        | A valid phone link (`phone:11111111111`)                      |
| 5     | dynamicPageLink  | A link to a page in Wix that needs to be selected dynamically |
| 6     | pageLink         | A link to another page on the site                            |
| 7     | whatsAppLink     | A link to open a whatsapp conversation                        |
| 8     | documentLink     | A link to a PDF file hosted by Wix                            |
| 9     | popupLink        | A link that opens a lightbox                                  |
| 10    | addressLink      | A link that directs the user to an address on google maps     |
| 11    | edgeAnchorLinks  | A link that scrolls to the top/bottom of the page             |
| 12    | loginToWixLink   | A link that directs the user to wix login dialog              |

## RichText Type

Configuration options for rich text type data items. Rich text data type allows manipulation of text with HTML & inline styles.

| Key       | Type                                      | Description                                                                                                                                | More Info   |
| --------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| abilities | [RichTextAbilities[]](#richtextabilities) | A collection of possible rich text abilities that the component supports. Only one of the types will make it to the component after input. | maxSize: 22 |

### RichTextAbilities

Available rich text formatting abilities that can be configured.

| Value | Ability                   | Description                                      |
| ----- | ------------------------- | ------------------------------------------------ |
| 0     | UNKNOWN_RichTextAbilities | Default when no ability is specified             |
| 1     | font                      | Selected theme font, also changing the HTML tag  |
| 2     | fontFamily                | Font family selection                            |
| 3     | fontSize                  | Font size control (should also include min/max)  |
| 4     | fontStyle                 | Font style control (italic / normal)             |
| 5     | fontWeight                | Font weight control (bold / normal / 100-900)    |
| 6     | textDecoration            | Text decoration (underline / line-through)       |
| 8     | color                     | Text color                                       |
| 9     | backgroundColor           | Background color                                 |
| 10    | letterSpacing             | Letter spacing control                           |
| 11    | textAlign                 | Text alignment (left / center / right / justify) |
| 15    | direction                 | Text direction (rtl/ltr)                         |
| 16    | marginStart               | Indent control                                   |
| 17    | marginEnd                 | Outdent control                                  |
| 19    | bulletedList              | Bulleted list implemented with `<ul>`            |
| 20    | numberedList              | Numbered list implemented with `<ol>`            |
| 21    | seoTag                    | SEO tags (h1,h2,h3,h4,h5,h6,p,blockquote)        |

## ArrayItems Type

An array of data items or complex data types.

| Key      | Type                    | Description                                                     | More Info                                                                                                     |
| -------- | ----------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| data     | [DataItems](#dataitems) | The definition of multiple data items in each item of the Array | Only used when defining multiple data items per array element. Can only be used if `dataItem` is not defined. |
| dataItem | [DataItem](#dataitem)   | For a single data type in the array                             | Only used when defining a single data type for array elements. Can only be used if `data` is not defined      |
| maxSize  | int32                   | The maximum size of the Array                                   | Optional, there will be a size limit in the Storage as well                                                   |

### DataItems

For an array of complex object types. Each item in the array will contain all this data structure.

| Key   | Type                               | Description                                                   | More Info                                       |
| ----- | ---------------------------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| items | map<string, [DataItem](#dataitem)> | Map of data items that will be included in each array element | This is the same as defining a regular dataItem |
        |

## Verbose example inside [`EditorElement`](editorElement.md)

```json
{    ...
    "data": {
        "title": {
            "dataType": "text",
            "displayName": "Section Title",
            "text": {
                "maxLength": 100
            }
        },
        "description": {
            "dataType": "richText",
            "displayName": "Section Description",
            "richText": {
                "abilities": ["font", "color", "textAlign", "bulletedList"]
            }
        },
        "image": {
            "dataType": "image",
            "displayName": "Hero Image",
        },
        "ctaButton": {
            "dataType": "link",
            "displayName": "Call to Action",
            "link": {
                "linkTypes": ["externalLink", "pageLink"]
            }
        },
        "features": {
            "dataType": "arrayItems",
            "displayName": "Feature List",
            "arrayItems": {
                "data": {
                    "items": {
                        "title": {
                            "dataType": "text",
                            "displayName": "Feature Title"
                        },
                        "description": {
                            "dataType": "text",
                            "displayName": "Feature Description"
                        },
                        "icon": {
                            "dataType": "vectorArt",
                            "displayName": "Feature Icon"
                        }
                    }
                },
                "maxSize": 6
            }
        },
        "isActive": {
            "dataType": "booleanValue",
            "displayName": "Show Section"
        },
    }
}
```

## Simple Data Item Examples

Some simple examples of the data items you can define in your manifest.

### text

```json
{
  "dataType": "text",
  "displayName": "Main Text"
}
```

### booleanValue

```json
{
  "dataType": "booleanValue",
  "displayName": "Available outside business hours"
}
```

### number

```json
{
  "dataType": "number",
  "displayName": "Product Price"
}
```

### textEnum

```json
{
  "dataType": "textEnum",
  "displayName": "Product Category",
  "textEnum": {
    "options": [
      {
        "value": "electronics",
        "displayName": "Electronics"
      },
      {
        "value": "clothing",
        "displayName": "Clothing"
      }
    ]
  }
}
```

### a11y

```json
{
  "dataType": "a11y",
  "displayName": "Accessibility Settings",
  "a11y": {
    "attributes": ["ariaLabel", "ariaDescribedby", "role"]
  }
}
```

### link

```json
{
  "dataType": "link",
  "displayName": "Product Link",
  "link": {
    "linkTypes": ["externalLink", "pageLink"]
  }
}
```

### image

```json
{
  "dataType": "image",
  "displayName": "Product Image",
}
```

### video

```json
{
  "dataType": "video",
  "displayName": "Product Video",
}
```

### vectorArt

```json
{
  "dataType": "vectorArt",
  "displayName": "Product Icon",
}
```

### localDate

```json
{
  "dataType": "localDate",
  "displayName": "Event Date"
}
```

### localTime

```json
{
  "dataType": "localTime",
  "displayName": "Event Time"
}
```

### webUrl

```json
{
  "dataType": "webUrl",
  "displayName": "Website URL"
}
```

### richText

```json
{
  "dataType": "richText",
  "displayName": "Product Description",
  "richText": {
    "abilities": ["font", "color", "textAlign", "bulletedList"]
  }
}
```

### arrayItems

```json
{
  "dataType": "arrayItems",
  "displayName": "Product List",
  "arrayItems": {
    "dataItem": {
      "dataType": "text",
      "displayName": "Product Name"
    },
    "maxSize": 100
  }
}
```

### direction

```json
{
  "dataType": "direction",
  "displayName": "Text Direction"
}
```
