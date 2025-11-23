# Component Elements Guidelines

**Inner elements** represent the distinct visual parts of your component. Each part that users see as separate and want to edit independently should be an inner element.

---

## What Qualifies as an Inner Element

An element should be defined as an inner element when it:
- Has independent CSS styling
- Is user-recognizable as a distinct part (e.g., title, button, image, icon, description)
- Groups multiple related properties (e.g., button with text + link)


---

## What Goes at Top Level

### Top-level Data (`editorElement.data`)

Use ONLY for configuration flags, NEVER for content.

**Allowed at parent level:**
- Configuration flags: Booleans that control behavior (e.g., `showButton`, `enableAnimation`, `darkMode`)
- Component-wide settings: Enum values for layout variants (e.g., `layout: 'grid' | 'list'`)

**NEVER at top level:**
- Text content (e.g., titles, descriptions, labels, names, headlines)
- Links, images, videos, or any media
- Numbers that are displayed (e.g., prices, counts, ratings)
- Any data that has a CSS selector and visual representation


### Top-level CSS Properties (`editorElement.cssProperties`)

Use ONLY for styling the main component container itself, NEVER for child elements.

**Allowed at parent level:**
- Container styling (e.g., `backgroundColor`, `borderRadius`, `padding`, `gap`, `boxShadow`)
- Layout properties (e.g., `flexDirection`, `alignItems`, `justifyContent`)
- Component-level visual effects (e.g., overall container shadows, borders, transforms)

**NEVER at top level:**
- CSS for child elements (those MUST go in the corresponding inner element's `cssProperties`)

**Rule of thumb:** If a child element has its own CSS selector, its styles MUST be in that inner element's `cssProperties`.

---

## Element Behaviors

All inner elements MUST have `selectable: true`. Users need to click and select each inner element independently in the editor.

**Removable (`removable: true`):** Set this for optional elements that users may want to hide (secondary buttons, badges, auxiliary content). When an element is removable, your React component MUST check `wix.elementsRemovalState` and conditionally render.

**Default behaviors for all inner elements:**
```json
"behaviors": {
  "selectable": true,
  "removable": false
}
```

## Hierarchy Guidelines

- Nest only when necessary: Create nested elements only when there's a clear visual container relationship (e.g., a card element contains its own title, image, and button)
- Maximum depth: Limit nesting to 3 levels maximum to avoid complexity

---

## Correct Configuration Example

```json
"editorElement": {
  "selector": ".component",
  "data": {
    "enableAnimation": { "dataType": "booleanValue", "defaultValue": true }
  },
  "elements": {
    "title": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".component__title",
        "data": {
          "titleText": { "dataType": "text", "defaultValue": "Title Text" }
        },
        "cssProperties": {
          "fontFamily": { "defaultValue": "Inter, -apple-system, sans-serif" },
          "fontSize": { "defaultValue": "32px" },
          "fontWeight": { "defaultValue": "700" },
          "color": { "defaultValue": "#1A1A1A" }
        },
        "behaviors": {
          "selectable": true,
          "removable": false
        }
      }
    },
    "description": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".component__description",
        "data": {
          "descriptionText": { "dataType": "text", "defaultValue": "Description text" }
        },
        "cssProperties": {
          "fontFamily": { "defaultValue": "Inter, -apple-system, sans-serif" },
          "fontSize": { "defaultValue": "16px" },
          "fontWeight": { "defaultValue": "400" },
          "color": { "defaultValue": "#333333" }
        },
        "behaviors": {
          "selectable": true,
          "removable": true
        }
      }
    }
  }
}
```

