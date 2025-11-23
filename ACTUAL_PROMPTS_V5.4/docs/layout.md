# Layout

The layout capabilities of a component define how it can be resized and positioned in the editor.

## EditorElementLayout

Defines the resizing and positioning capabilities of a component.

| Key                    | Type                                                | Description                                                                 | More Info                                     |
| ---------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------- |
| resizeDirection        | [ResizeDirection](#resize-direction)                | The resizing capabilities this component can support                        | Controls how the component can be resized     |
| contentResizeDirection | [ContentResizeDirection](#content-resize-direction) | Describes the ability of content to impact on the size of this component    | Controls how content affects component size   |
| disableStretching      | boolean                                             | Will control the availability of the stretch capability for this component  | Optional, when true prevents stretching       |
| disablePositioning     | boolean                                             | Will control the availability of freely positioning this component          | Optional, when true prevents free positioning |
| disableRotation        | boolean                                             | Will control the availability of the rotation capability for this component | Optional, when true prevents rotation         |

## Resize Direction

The supported resize directions for a component.

| Value | Direction               | Description                                               |
| ----- | ----------------------- | --------------------------------------------------------- |
| 0     | UNKNOWN_ResizeDirection | Default value when direction is not specified             |
| 1     | horizontal              | Component can only be resized horizontally                |
| 2     | vertical                | Component can only be resized vertically                  |
| 3     | horizontalAndVertical   | Component can be resized both horizontally and vertically |
| 4     | aspectRatio             | Component maintains its aspect ratio while resizing       |
| 5     | none                    | Component cannot be resized in any direction              |

## Content Resize Direction

The supported content sizing options for a component.

| Value | Direction                      | Description                                                                 |
| ----- | ------------------------------ | --------------------------------------------------------------------------- |
| 0     | UNKNOWN_ContentResizeDirection | Default value when content resize behavior is not specified                 |
| 1     | horizontal                     | Component's width will automatically adjust based on its content            |
| 2     | vertical                       | Component's height will automatically adjust based on its content           |
| 3     | horizontalAndVertical          | Component's width and height will automatically adjust based on its content |
| 4     | none                           | Component's size will not be affected by its content                        |

## Examples

A fixed-size image component that maintains its aspect ratio:

```json
{
  "resizeDirection": "aspectRatio",
  "contentResizeDirection": "none",
  "disableStretching": true,
  "disablePositioning": false
}
```

A text component that automatically adjusts to its content:

```json
{
  "resizeDirection": "horizontalAndVertical",
  "contentResizeDirection": "horizontalAndVertical",
  "disableStretching": false,
  "disablePositioning": false
}
```

A component that can be resized but not rotated:

```json
{
  "resizeDirection": "horizontalAndVertical",
  "contentResizeDirection": "horizontalAndVertical",
  "disableRotation": true
}
```
