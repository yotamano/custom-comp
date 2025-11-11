# Image & Media Flow Diagram

This document visualizes how images flow from prompt → generation → playground rendering.

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    1. PROMPT INSTRUCTIONS (V5.1)                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
        ┌───────────────────────────────────────────────────┐
        │  component-assets-guidelines.md instructs:        │
        │  ─────────────────────────────────────            │
        │  • Import from './assets/defaultImages'          │
        │  • Provide XML tags with image descriptions      │
        │  • Use Image type in manifest for editable imgs  │
        └───────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     2. LLM GENERATION OUTPUT                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                ▼                   ▼                   ▼
      ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
      │   <react>    │    │    <css>     │    │  <manifest>  │
      └──────────────┘    └──────────────┘    └──────────────┘
            │                                         │
            ▼                                         ▼
    ┌───────────────────────────────┐    ┌───────────────────────────┐
    │ import { heroImage }          │    │ "galleryImages": {        │
    │   from './assets/              │    │   "elementType":          │
    │   defaultImages'              │    │     "inlineElement",      │
    │                               │    │   "inlineElement": {      │
    │ const defaultImages = [       │    │     "data": {             │
    │   {                           │    │       "images": {         │
    │     uri: 'wix:image://v1/..', │    │         "dataType":       │
    │     url: 'https://unsplash..',│    │           "arrayItems",   │
    │     name: 'Mountain Lake',    │    │         "arrayItems": {   │
    │     width: 800,               │    │           "dataItem": {   │
    │     height: 600               │    │             "dataType":   │
    │   }                           │    │               "image"     │
    │ ]                             │    │           }               │
    │                               │    │         }                 │
    │ const images =                │    │       }                   │
    │   elementProps?.images        │    │     }                     │
    │     || defaultImages          │    │   }                       │
    │                               │    │ }                         │
    └───────────────────────────────┘    └───────────────────────────┘
            │                                         │
            └──────────────┬──────────────────────────┘
                           ▼
                    ⚠️  MISSING: No XML tags like
                        <heroImage> with descriptions
                        (as guidelines specify)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    3. PLAYGROUND (App.tsx)                           │
└─────────────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│ parseCSV()   │  │ compileCode()│  │ buildInitialState│
└──────────────┘  └──────────────┘  └──────────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
            ┌──────────────────────────────┐
            │ Extracts from CSV:           │
            │ • reactCode                  │
            │ • manifest JSON              │
            └──────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ compileCode() process:               │
        │ ─────────────────────────            │
        │ 1. Babel transforms React code      │
        │ 2. Mocks require() calls:            │
        │    if (name.includes(                │
        │        'defaultImages')) {           │
        │      return [];  // Empty array!    │
        │    }                                 │
        │ 3. Creates React component           │
        └──────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ buildInitialState() process:         │
        │ ─────────────────────────────────    │
        │ 1. Parses manifest JSON              │
        │ 2. Finds "dataType": "image"         │
        │ 3. Creates default Image objects:    │
        │    {                                 │
        │      uri: 'wix:image://v1/...',      │
        │      url: 'https://placehold.co/...' │
        │    }                                 │
        │ 4. Builds componentProps with        │
        │    elementProps structure            │
        └──────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ Component Rendering:                 │
        │ ─────────────────────────────────    │
        │ <RenderedComponent                   │
        │   className="generated-component"    │
        │   id="generated-component-1"         │
        │   wix={{}}                           │
        │   elementProps={{                    │
        │     galleryImages: {                 │
        │       images: [                      │
        │         {                            │
        │           uri: 'wix:image://...',    │
        │           url: 'https://...',        │
        │           name: 'Image 1',           │
        │           width: 600,                │
        │           height: 400                │
        │         }                            │
        │       ]                              │
        │     }                                │
        │   }}                                 │
        │   {...otherProps}                    │
        │ />                                   │
        └──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    4. COMPONENT EXECUTION                            │
└─────────────────────────────────────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ Inside Component:                    │
        │ ─────────────────────────────────    │
        │ // Import gets mocked to []          │
        │ import { heroImage }                 │
        │   from './assets/defaultImages'      │
        │                                      │
        │ // Component defines fallback        │
        │ const defaultImages = [              │
        │   {                                  │
        │     uri: 'wix:image://v1/...',       │
        │     url: 'https://unsplash.com/...',│
        │     name: 'Mountain Lake',           │
        │     width: 800,                      │
        │     height: 600                      │
        │   }                                  │
        │ ]                                    │
        │                                      │
        │ // Uses props or fallback            │
        │ const images =                       │
        │   elementProps?.galleryImages        │
        │     ?.images || defaultImages        │
        │                                      │
        │ // Renders                           │
        │ {images.map(img => (                 │
        │   <img                               │
        │     src={img.url}  ← Uses URL!      │
        │     alt={img.name}                   │
        │     width={img.width}                │
        │     height={img.height}              │
        │   />                                 │
        │ ))}                                  │
        └──────────────────────────────────────┘
                           │
                           ▼
                 ┌─────────────────┐
                 │ Browser renders │
                 │ actual images   │
                 └─────────────────┘
```

---

## Key Insights

### 🔴 The Import Pattern is Mocked Away

```typescript
// Component Code:
import { heroImage } from './assets/defaultImages'

// Playground compileCode():
const require = (name: string) => {
  if (name.includes('defaultImages')) {
    return [];  // ← Returns empty array!
  }
}

// Result: heroImage === undefined
```

**Why it still works:** Components never actually use the imported values! They use `elementProps` instead.

### 🟢 The Runtime Data Pattern Works Perfectly

```typescript
// Manifest defines:
"dataType": "image"

// Playground creates:
componentProps.elementProps.galleryImages.images = [
  {
    uri: 'wix:image://v1/placeholder.jpg',
    url: 'https://placehold.co/600x400'
  }
]

// Component receives and renders:
const images = elementProps?.galleryImages?.images || defaultImages
<img src={images[0].url} />

// ✅ Image displays!
```

### ⚠️ The Missing Piece: XML Description Tags

**What the prompt expects:**
```xml
<react>
import { heroImage } from './assets/defaultImages'
// ... component code ...
</react>

<heroImage>
{
  "description": "A vibrant hero banner showing...",
  "width": 1920,
  "height": 1080
}
</heroImage>
```

**What the CSV contains:**
```xml
<react>
import { heroImage } from './assets/defaultImages'
// ... component code ...
</react>

<!-- ❌ No <heroImage> tag! -->
```

---

## Image Object Structure

### Full Image Type Definition

```typescript
type Image = {
  uri: string      // Wix internal identifier (wix:image://v1/...)
  url: string      // Actual URL to render (https://...)
  name?: string    // Display name (optional)
  width?: number   // Pixel dimensions (optional)
  height?: number  // Pixel dimensions (optional)
}
```

### Where Each Field is Used

| Field  | Purpose                          | Required | Example                                           |
|--------|----------------------------------|----------|---------------------------------------------------|
| `uri`  | Wix internal reference           | Yes      | `'wix:image://v1/8bb438_e50b...'`                |
| `url`  | Actual image src for `<img>`     | Yes      | `'https://images.unsplash.com/photo-...'`        |
| `name` | Alt text, captions, labels       | No       | `'Mountain Lake Sunset'`                          |
| `width`| Image width attribute           | No       | `800`                                             |
| `height`| Image height attribute         | No       | `600`                                             |

---

## Working Examples from Your Codebase

### Example 1: Gallery Component (initialGeneratedOutput in App.tsx)

**Manifest Definition:**
```json
"galleryImages": {
  "elementType": "inlineElement",
  "inlineElement": {
    "data": {
      "images": {
        "dataType": "arrayItems",
        "arrayItems": {
          "dataItem": {
            "dataType": "image",
            "image": {
              "category": "IMAGE"
            }
          },
          "maxSize": 20
        }
      }
    }
  }
}
```

**Component Usage:**
```typescript
interface Gallery3DProps {
  elementProps: {
    galleryImages: {
      images: Image[]
    }
  }
}

const Gallery3D: React.FC<Gallery3DProps> = ({ elementProps }) => {
  const defaultImages = [
    {
      uri: 'wix:image://v1/gallery1.jpg',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
      name: 'Mountain Lake',
      width: 800,
      height: 600,
    },
    // ... more images
  ]

  const images = elementProps?.galleryImages?.images || defaultImages

  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.name || `Gallery image ${index + 1}`}
          width={image.width}
          height={image.height}
        />
      ))}
    </div>
  )
}
```

### Example 2: Playground Default Creation

**When manifest has `"dataType": "image"`:**
```typescript
const createDefaultItemFromSchema = (schema: any) => {
  switch(schema.dataType) {
    case 'image':
      return {
        uri: 'wix:image://v1/8bb438_e50b552e5a76447990391456cf81f7c3~mv2.jpg',
        url: 'https://placehold.co/600x400'
      };
  }
}
```

**Result:** Every image field gets a placeholder image that displays in the playground.

---

## Summary Table

| Aspect                    | What Prompt Says                  | What Gets Generated              | How Playground Handles It           |
|---------------------------|-----------------------------------|----------------------------------|-------------------------------------|
| **Image Imports**         | Import from `./assets/defaultImages` | ✅ Imports are present          | 🔴 Mocked to empty array            |
| **XML Image Tags**        | Provide `<imageName>` with JSON  | ❌ Not in CSV output             | N/A (not used)                      |
| **Manifest Definitions**  | Use `"dataType": "image"`        | ✅ Correctly defined             | ✅ Creates placeholder Image objects|
| **Image Type**            | `{ uri, url, name?, width?, height? }` | ✅ Used correctly           | ✅ Type-compatible props passed     |
| **Default Fallbacks**     | Provide inline defaults          | ✅ Hardcoded Unsplash URLs       | ✅ Falls back to component defaults |
| **Rendering**             | Use `image.url` in `<img src>`   | ✅ Correctly implemented         | ✅ Images display                   |

### Status: ✅ **WORKING** (with one caveat)

The image system works end-to-end in the playground. The missing XML tags don't break anything because:
1. Components don't rely on the imports (mocked away)
2. Components use `elementProps` from the manifest
3. Playground creates proper Image objects from manifest
4. Images render successfully

The XML tags are likely for a **separate image generation pipeline** that processes test results to create actual images, which isn't part of the playground's concern.



