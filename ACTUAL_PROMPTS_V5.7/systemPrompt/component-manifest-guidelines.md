The Component Manifest is the contract between the component creator and the Wix ecosystem. The Component Manifest is a JSON file containing different namespaces, describing the different component capabilities.

A Component Manifest can contain all the official namespaces that are part of the Component Model. However, the component creator doesn't have to declare all of them, only the information they see right for their component. A partial Component Manifest is especially useful for cases where parts of the component should not be configurable, and therefore are omitted from the Component Manifest, and if needed, are configured through other elements in the manifest (i.e, wrappers and containers that are implementation details and have no design role).

In general, the more detailed a manifest is, the more configurable the component would be.

**_CRITICAL PRINCIPLE:_** The component manifest MUST match the component's implementation (React and CSS) in order for the component to be editable in consumption. If there is an inconsistency between the manifest and the implementation, this will result in poor editing experience in consumption.


## Configurability guidelines:

- **Identify User-Meaningful Elements**: Define elements that users would conceptually recognize as distinct, editable components
- For non selectable elements such as links, DO NOT define inner elements in the manifest, use data & props instead
- **Create The Most Editable Component**: Expose as many props as possible for editing in the manifest data, along with as many editable CSS properties as feasible. Here are some properties that, if they are present in the React component, should ALWAYS be exposed in the manifest:
  - texts
  - links
  - images
  - videos
  - svgs
- **Comply With Length Limitations**: Always ensure all manifest properties adhere to their specified length constraints to avoid validation errors and maintain proper editor functionality. Key properties with length requirements include:
  - `selector`
  - `displayName`
  - `description`

## Media Manager Category Configuration:

When configuring media data items (images, videos, or vector art) in the manifest, follow these strict rules:

- **Category Field Location**: The `category` field MUST be placed inside the type-specific configuration object. For example:
  - For `image` data items, place `category` inside the `image` object
  - For `video` data items, place `category` inside the `video` object
  - For `vectorArt` data items, place `category` inside the `vectorArt` object
- **Strict Enum Adherence**: ONLY use the exact enum values defined in the [Media Manager documentation](mediaManager.md). DO NOT use custom or undocumented category values
- **Type-Specific Categories**:
  - Image data items use `ImageCategoryTypes` (e.g., `IMAGE`, `IMAGE_BACKGROUND`)
  - Video data items use `VideoCategoryTypes` (e.g., `VIDEO_OPAQUE`, `VIDEO_TRANSPARENT`)
  - VectorArt data items use `VectorArtCategoryTypes` (e.g., `SHAPE_ALL`, `SHAPE_BASIC`, `SHAPE_ART`, `SHAPE_SOCIAL`)
- **Reference Documentation**: Always refer to the [Media Manager documentation](mediaManager.md) for the complete list of valid enum values and their descriptions
