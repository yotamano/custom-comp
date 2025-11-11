# Installation

The installation configuration defines how a component should be added to the stage in the editor.

## InstallationInfo

Defines the installation settings for a component.

| Key         | Type                                            | Description                                                        | More Info                                   |
| ----------- | ----------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| initialSize | [ComponentInitialSize](#component-initial-size) | Initial size with which the component should be added to the stage | Controls the component's initial dimensions |

## Component Initial Size

Defines the initial size settings for a component.

| Key                 | Type                                        | Description                                                                 | More Info                                                      |
| ------------------- | ------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- |
| width               | [InitialSizeSetting](#initial-size-setting) | The component initial width setting                                         | Controls the initial width                                     |
| height              | [InitialSizeSetting](#initial-size-setting) | The component initial height setting                                        | Controls the initial height                                    |
| preserveAspectRatio | boolean                                     | The component initial setting to keep relationship between height and width | Controls relationship between height and width while rendering |

## Initial Size Setting

Defines how the initial size should be determined.

| Key        | Type                       | Description                                       | More Info                                              |
| ---------- | -------------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| sizingType | [SizingType](#sizing-type) | The initial size type                             | Determines how size is calculated                      |
| pixels     | int32                      | The value we should set as initial size in pixels | Only used when sizing_type is pixels, minimum value: 1 |

## Sizing Type

The supported sizing types for initial component size.

| Value | Type               | Description                                                                                                 |
| ----- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| 0     | UNKNOWN_SizingType | Default value when sizing type is not specified                                                             |
| 1     | content            | Initial size should fit to the [content size](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content) |
| 2     | stretched          | Initial size should stretch to the parent size and will keep tracking it unless a user changes it           |
| 3     | pixels             | Initial size should be set in pixels                                                                        |

## Examples

A full-width header component:

```json
{
  "initialSize": {
    "width": {
      "sizingType": "stretched"
    },
    "height": {
      "sizingType": "stretched"
    }
  }
}
```

A sidebar component with fixed width and content-based height:

```json
{
  "initialSize": {
    "width": {
      "sizingType": "pixels",
      "pixels": 300
    },
    "height": {
      "sizingType": "content"
    }
  }
}
```

A media component that maintains relationship between height and width while rendering:

```json
{
  "initialSize": {
    "width": {
      "sizingType": "pixels",
      "pixels": 100
    },
    "height": {
      "sizingType": "pixels",
      "pixels": 300
    },
    "preserveAspectRatio": true
  }
}
```
