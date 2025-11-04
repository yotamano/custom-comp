# Image Handling - Quick Reference

## TL;DR

**How images work:** Components receive image data via `elementProps` from the manifest, render them using the `url` field. The playground creates placeholder images from manifest definitions. Everything works! ✅

---

## For LLM: What to Generate

### ✅ DO THIS (Runtime Data Pattern)

**1. Define in Manifest:**
```json
{
  "data": {
    "images": {
      "dataType": "arrayItems",
      "displayName": "Gallery Images",
      "arrayItems": {
        "dataItem": {
          "dataType": "image",
          "displayName": "Gallery Image",
          "image": {
            "category": "IMAGE"
          }
        },
        "maxSize": 20
      }
    }
  }
}
```

**2. Use in React Component:**
```typescript
import React from 'react'
import './style.css'

type Image = {
  uri: string
  url: string
  name?: string
  width?: number
  height?: number
}

interface GalleryProps {
  elementProps: {
    galleryImages: {
      images: Image[]
    }
  }
}

const Gallery: React.FC<GalleryProps> = ({ elementProps }) => {
  // Provide fallback defaults
  const defaultImages = [
    {
      uri: 'wix:image://v1/default1.jpg',
      url: 'https://images.unsplash.com/photo-...?w=800&h=600',
      name: 'Descriptive Name',
      width: 800,
      height: 600,
    }
  ]

  const images = elementProps?.galleryImages?.images || defaultImages

  return (
    <div className="gallery">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.url}  // Use url field!
          alt={img.name || `Image ${idx + 1}`}
          width={img.width}
          height={img.height}
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default Gallery
```

### ⚠️ Optional (Static Import Pattern)

**If generating static imports, also provide XML tags:**

```typescript
// In <react> section:
import { heroImage, thumbnailImage } from './assets/defaultImages'
```

```xml
<!-- After </react>, before <css>: -->
<heroImage>
{
  "description": "A vibrant hero banner featuring a modern cityscape at sunset",
  "width": 1920,
  "height": 1080
}
</heroImage>

<thumbnailImage>
{
  "description": "Small thumbnail showing product preview",
  "width": 256,
  "height": 256
}
</thumbnailImage>
```

**Rules for image descriptions:**
- Width/height must be multiples of 64
- Range: 128-2048 pixels
- Tag name MUST match import variable name exactly
- Description should be detailed and comprehensive

---

## For Developers: Understanding the System

### Image Object Structure

```typescript
type Image = {
  uri: string      // Wix identifier: 'wix:image://v1/abc123.jpg'
  url: string      // Actual URL: 'https://cdn.example.com/image.jpg'
  name?: string    // Optional display name for alt text
  width?: number   // Optional pixel width
  height?: number  // Optional pixel height
}
```

### Where Images Come From

**In Production (Real Wix):**
```
User selects image in editor → Wix Media Manager 
  → Returns Image object with uri + url
  → Passed to component via elementProps
  → Component renders using img.url
```

**In Playground (Testing):**
```
Manifest defines "dataType": "image" 
  → Playground creates placeholder:
     { uri: 'wix:image://...', url: 'https://placehold.co/...' }
  → Passed to component via componentProps
  → Component renders placeholder
```

### How Playground Handles Images

**1. Parse Manifest → Find Image Definitions**
```typescript
// Playground reads manifest and finds:
"dataType": "image"
```

**2. Create Default Image Objects**
```typescript
// buildInitialState() creates:
{
  uri: 'wix:image://v1/placeholder.jpg',
  url: 'https://placehold.co/600x400'
}
```

**3. Pass to Component**
```typescript
<Component
  elementProps={{
    galleryImages: {
      images: [/* Image objects */]
    }
  }}
/>
```

**4. Component Renders**
```jsx
<img src={image.url} alt={image.name} />
```

---

## Common Patterns

### Single Image

**Manifest:**
```json
{
  "data": {
    "heroImage": {
      "dataType": "image",
      "displayName": "Hero Banner",
      "image": {
        "category": "IMAGE"
      }
    }
  }
}
```

**Component:**
```typescript
interface HeroProps {
  heroImage?: Image
}

const Hero: React.FC<HeroProps> = ({ heroImage }) => {
  const defaultImage = {
    uri: 'wix:image://v1/default.jpg',
    url: 'https://images.unsplash.com/...',
    width: 1920,
    height: 1080
  }

  const image = heroImage || defaultImage

  return <img src={image.url} alt={image.name || 'Hero banner'} />
}
```

### Image Array

**Manifest:**
```json
{
  "data": {
    "items": {
      "dataType": "arrayItems",
      "displayName": "Gallery Items",
      "arrayItems": {
        "dataItem": {
          "dataType": "image",
          "displayName": "Gallery Image",
          "image": { "category": "IMAGE" }
        },
        "maxSize": 50
      }
    }
  }
}
```

**Component:**
```typescript
interface GalleryProps {
  items?: Image[]
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const defaultItems = [
    { uri: 'wix:image://v1/1.jpg', url: 'https://...', width: 800, height: 600 }
  ]

  const images = items || defaultItems

  return (
    <div className="gallery">
      {images.map((img, i) => (
        <img key={i} src={img.url} alt={img.name || `Image ${i+1}`} />
      ))}
    </div>
  )
}
```

### Nested Image (Inside elementProps)

**Manifest:**
```json
{
  "elements": {
    "heroSection": {
      "elementType": "inlineElement",
      "inlineElement": {
        "data": {
          "backgroundImage": {
            "dataType": "image",
            "displayName": "Background",
            "image": { "category": "IMAGE" }
          }
        }
      }
    }
  }
}
```

**Component:**
```typescript
interface HeroSectionProps {
  elementProps: {
    heroSection: {
      backgroundImage?: Image
    }
  }
}

const Hero: React.FC<HeroSectionProps> = ({ elementProps }) => {
  const bgImage = elementProps?.heroSection?.backgroundImage || {
    uri: 'wix:image://v1/bg.jpg',
    url: 'https://images.unsplash.com/...',
  }

  return (
    <div 
      className="hero"
      style={{ backgroundImage: `url(${bgImage.url})` }}
    >
      Hero Content
    </div>
  )
}
```

---

## Media Categories

### Image Categories
```json
"image": {
  "category": "IMAGE"  // General images, photos, illustrations
}
```

### Video Categories
```json
"video": {
  "category": "VIDEO_OPAQUE"  // Videos with player controls
}
```

### Vector Art Categories
```json
"vectorArt": {
  "category": "SHAPE_ART"  // SVG graphics, icons, logos
}
```

---

## Troubleshooting

### ❌ Images not displaying

**Check:**
1. Using `image.url` not `image.uri` in `<img src>`
2. Providing fallback defaults
3. Handling undefined/empty arrays
4. Manifest has correct `"dataType": "image"`

### ❌ Props not reaching component

**Check:**
1. Props interface matches manifest structure
2. Using `elementProps?.nestedElement?.imageField`
3. Destructuring props correctly

### ❌ Playground shows error

**Check:**
1. Component exports default
2. No TypeScript errors
3. Import statements (even though mocked)
4. Babel can compile the code

---

## Examples from Your Codebase

### Gallery3D Component (App.tsx)

**See:** Lines 112-342 in `src/App.tsx`

- ✅ Image type defined
- ✅ Default images provided
- ✅ Falls back: `elementProps?.galleryImages?.images || defaultImages`
- ✅ Renders with `image.url`
- ✅ Handles empty state
- ✅ Manifest defines arrayItems of image type

### Playground Image Defaults (App.tsx)

**See:** Lines 951-969 and 1015-1022 in `src/App.tsx`

- `createDefaultItemFromSchema()` - Creates placeholder Image objects
- `createDefaultValue()` - Returns proper defaults for image fields
- Placeholder: `https://placehold.co/600x400`
- URI: `wix:image://v1/8bb438_e50b552e5a76447990391456cf81f7c3~mv2.jpg`

---

## Key Takeaways

1. **Always use the runtime data pattern** via manifest + elementProps
2. **Always provide fallback defaults** with realistic Unsplash URLs
3. **Always use `image.url`** for the `<img src>` attribute
4. **Always handle empty/undefined** gracefully
5. **Image objects have 5 fields:** uri (required), url (required), name, width, height (optional)
6. **Manifest category** determines what media types users can upload

Everything else is handled automatically by Wix and the playground! 🎉

