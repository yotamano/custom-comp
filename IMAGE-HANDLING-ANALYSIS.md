# Image & Media Handling Analysis

This document explains how images and media are handled across three key areas:
1. **What the prompts guide** (ACTUAL_PROMPTS_V5.1)
2. **What's actually generated** (CSV test output)
3. **How the playground handles it** (App.tsx)

---

## 1. What the Prompts Guide (ACTUAL_PROMPTS_V5.1)

### Image Asset Guidelines (`component-assets-guidelines.md`)

The prompt instructs the LLM to handle images using a **dual-approach system**:

#### A. Import Approach (For Static Default Images)
```typescript
import { heroImage, productImage } from './assets/defaultImages'
```

**Key Requirements:**
- Import images as **named exports** (not default) from `'./assets/defaultImages'`
- Use descriptive variable names (e.g., `heroImage`, `productImage`, `profileAvatar`)
- The LLM must then provide image descriptions in XML tags **outside the React code**

**Image Description Format:**
```xml
<heroImage>
{
  "description": "A vibrant hero banner image featuring a modern cityscape...",
  "width": 1920,
  "height": 1088
}
</heroImage>
```

**Rules:**
- XML tag name MUST match the imported variable name exactly
- Width and height must be multiples of 64, between 128-2048 pixels
- Description should be comprehensive and detailed

#### B. Runtime Data Approach (For User-Configurable Images)

For images that users can change in the editor, use the **manifest `image` data type**:

**In Manifest (data.md):**
```json
{
  "dataType": "image",
  "displayName": "Product Image",
  "image": {
    "category": "IMAGE"
  }
}
```

**Image Type Structure in React:**
```typescript
type Image = {
  uri: string      // e.g., 'wix:image://v1/gallery1.jpg'
  url: string      // Actual URL to render
  name?: string    // Optional display name
  width?: number   // Optional dimensions
  height?: number
}
```

**Usage in React Component:**
```typescript
// Component receives images through props
interface ComponentProps {
  elementProps: {
    galleryImages: {
      images: Image[]  // Array of image objects
    }
  }
}

// In the component
const images = elementProps?.galleryImages?.images || defaultImages
```

### React Guidelines (`component-react-guidelines.md`)

**Key Rules:**
1. Never hardcode image URLs directly
2. Always provide default fallback images
3. Handle empty states when no images provided
4. Use proper Image type definitions

---

## 2. What's Actually Generated (CSV Output Analysis)

### Findings from `prompt-3-Custom Component (updated)-5.1.0.csv`:

#### Generated Components Use **ONLY the Runtime Data Approach**

The LLM is **NOT** generating the static import approach in the test set. Instead, it generates:

**Example from CSV (Profile Card component):**

```typescript
import React from 'react'
import './style.css'
import { profileAvatar, bannerPlaceholder } from './assets/defaultImages'

type Image = {
  uri: string
  url: string
  name?: string
  width?: number
  height?: number
}

// Component defines props with Image type
interface ProfileCardProps {
  elementProps: {
    avatar: {
      profileImage: Image
    }
  }
}

// Component provides hardcoded defaults inline
const defaultImages = {
  profile: {
    uri: 'wix:image://v1/profile.jpg',
    url: 'https://images.unsplash.com/photo-1...',
    width: 200,
    height: 200
  }
}
```

**Important Observations:**

1. ✅ **Imports ARE present** in the React code (`import { profileAvatar } from './assets/defaultImages'`)
2. ❌ **Image XML tags are NOT present** in the CSV output (should be separate tags like `<profileAvatar>`)
3. ✅ **Manifest correctly defines** `"dataType": "image"` for editable images
4. ✅ **Default images are hardcoded** with Unsplash URLs inline in the component
5. ✅ **wix:image:// URIs** are used for the `uri` field

**This indicates a potential issue:** The LLM is importing images but not providing the corresponding XML description tags that the asset guidelines require.

### Manifest Image Definitions

In the generated manifests, images are properly defined:

```json
{
  "dataType": "arrayItems",
  "displayName": "Image Collection",
  "arrayItems": {
    "dataItem": {
      "dataType": "image",
      "displayName": "Gallery Image",
      "image": {
        "category": "IMAGE"  // Wix Media Manager category
      }
    },
    "maxSize": 20
  }
}
```

**Supported Categories:**
- `IMAGE` - General images
- `VIDEO_OPAQUE` - Videos with controls
- `SHAPE_ART` - SVG vector graphics

---

## 3. How the Playground Handles It (App.tsx)

### Component Compilation (`compileCode` function)

The playground uses Babel to compile React code and mocks the image imports:

```typescript
const require = (name: string) => {
  if (name === 'react') return React;
  if (name.includes('defaultImages')) {
    console.warn(`Mocking missing module '${name}' with an empty array.`);
    return [];  // Returns empty array for image imports!
  }
  console.warn(`Mocking missing module '${name}' with an empty object.`);
  return {};
};
```

**Key Point:** When components import from `'./assets/defaultImages'`, the playground **returns an empty array**, not actual image data.

### Initial State Building (`buildInitialState` function)

The playground reads the manifest and creates initial props:

```typescript
const buildInitialState = (node: any): any => {
  let state: any = {};
  if (node.data) {
    Object.entries(node.data).forEach(([key, value]: [string, any]) => {
      state[key] = createDefaultValue(value);
    });
  }
  // Recursively builds elementProps
  if (node.elements) {
    state.elementProps = {};
    Object.entries(node.elements).forEach(([key, value]: [string, any]) => {
      state.elementProps[key] = buildInitialState(value.inlineElement);
    });
  }
  return state;
};
```

### Image Default Value Creation

```typescript
const createDefaultItemFromSchema = (schema: any): any => {
  if (!schema) return null;

  switch(schema.dataType) {
    case 'image': 
      return { 
        uri: 'wix:image://v1/8bb438_e50b552e5a76447990391456cf81f7c3~mv2.jpg',
        url: 'https://placehold.co/600x400'  // Placeholder image
      };
    // ... other cases
  }
};
```

**When rendering a component with image data:**

1. Playground parses the manifest JSON
2. Finds all `"dataType": "image"` fields
3. Creates default Image objects with placeholder URLs
4. Passes these as props to the component via `elementProps`

### Component Rendering

```typescript
<RenderedComponent 
  {...{
    className: "generated-component",
    id: "generated-component-1",
    wix: {},
    ...componentProps,  // Contains image data from manifest
  } as any}
/>
```

The component receives:
- `elementProps.galleryImages.images[]` - Array of Image objects
- Each Image has `{ uri, url, name?, width?, height? }`

### Example Flow for Gallery Component

**Initial Example (hardcoded in App.tsx):**
```typescript
const defaultImages = [
  {
    uri: 'wix:image://v1/gallery1.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    name: 'Mountain Lake',
    width: 800,
    height: 600,
  },
  // ... more images
]

const images = elementProps?.galleryImages?.images || defaultImages
```

Then renders:
```jsx
<img
  src={image.url}  // Uses the url field, not uri
  alt={image.name || `Gallery image ${index + 1}`}
  className="gallery-3d__image"
  loading="lazy"
  width={image.width}
  height={image.height}
/>
```

---

## Summary & Gaps

### What Works ✅

1. **Manifest definitions** - Images properly defined as `"dataType": "image"`
2. **Type definitions** - Correct `Image` type with uri, url, name, width, height
3. **Playground rendering** - Successfully creates placeholder images and passes them as props
4. **Component fallbacks** - Components provide default images when none supplied
5. **Runtime data approach** - Components correctly receive and render image arrays from props

### Potential Issues ⚠️

1. **Missing XML tags in CSV output** - Generated components import images but don't include the required `<imageName>` XML description tags that the asset guidelines specify

2. **Import mocking** - The playground returns empty arrays for image imports, but components don't rely on this (they use props instead), so it works

3. **No actual image generation** - The prompt expects image descriptions to be processed later (likely by a separate image generation service), but the CSV doesn't contain them

4. **Dual approach confusion** - The prompt describes two approaches (imports + XML vs. runtime data), but generated code uses runtime data while still including the imports (which are mocked away)

### Recommendation 💡

The **runtime data approach via manifest** is working perfectly and is the correct pattern for Wix custom components. The **static import approach** with XML tags appears to be:
- Either for a different use case (pre-built components with specific imagery)
- Or not being followed by the LLM in generation
- Or meant for post-processing that extracts images from test results

The playground correctly handles the working pattern (runtime data), so the system functions as expected for component testing purposes.



