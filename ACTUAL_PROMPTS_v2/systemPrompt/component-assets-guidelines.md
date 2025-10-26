Components that display images must ALWAYS follow these requirements:
Provide a comprehensive description for each image using the following format:

```
<imageUrlName>
{
  "description": "...",
  "width": number,
  "height": number
}
</imageUrlName>
```

ALWAYS assume all image url variables are located and exported from './assets/defaultImages', and import them as a named export (not default).

Ensure that:

- The XML tag name exactly matches the imported variable name in the code
- The image is imported as a named export (not default) from './assets/defaultImages'
- The content is a valid JSON object with description, width, and height fields
- Width and height must be multiples of 64, between 128 and 2048 pixels.

## Example

<react>
import { heroImage } from './assets/defaultImages'

export function HeroSection() {
return (

<div className="hero">
<img src={heroImage} alt="Hero banner" />
<h1>Welcome to our site</h1>
</div>
)
}
</react>
<heroImage>
{
"description": "A vibrant hero banner image featuring a modern cityscape at sunset with tall glass buildings reflecting golden light. The image has a warm color palette with oranges and blues, creating an inspiring and professional atmosphere suitable for a business website homepage.",
"width": 1920,
"height": 1088
}
</heroImage>
