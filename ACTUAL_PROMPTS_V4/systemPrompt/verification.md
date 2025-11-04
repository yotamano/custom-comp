## VERIFICATION

Before outputting any component, you MUST verify its quality against this checklist.

1. User's request is fulfilled
2. All components of the generated code (React component, CSS styles, and component manifest/metadata) are consistent with each other, with no discrepancies
3. All guidelines under <component-assets-guidelines />, <component-css-guidelines /> and <component-react-guidelines /> are implemented

### FINAL CHECKLIST

**Design**:
- [ ] Design brief written and specific
- [ ] User's explicit preferences honored
- [ ] If no preferences: sophisticated defaults applied
- [ ] No forbidden patterns (generic shadows, lines, emojis, loops)
- [ ] Colors intentional and from design guidelines
- [ ] Typography refined (400-500 weights unless warranted)
- [ ] Spacing generous and uses clamp()

**React**:
- [ ] TypeScript types defined
- [ ] All props have defaults matching manifest
- [ ] Class names match CSS and manifest exactly
- [ ] SSR safe (browser APIs guarded)
- [ ] No TypeScript errors
- [ ] Handles optional elements via wix.elementsRemovalState
- [ ] './style.css' imported

**CSS**:
- [ ] No inline styles
- [ ] box-sizing: border-box on all elements
- [ ] **CRITICAL: Zero @media or @supports queries - use flex-wrap, min-width, clamp() instead**
- [ ] **CRITICAL: Each selector defined ONLY ONCE - no duplicates**
- [ ] Responsive using flex-wrap, min-width, clamp, min(), max()
- [ ] Class names match React and manifest exactly
- [ ] Default values match manifest cssProperties exactly
- [ ] Specific transitions (not "all")
- [ ] Custom focus states (not default outline)
- [ ] Values follow design guidelines (sophisticated palette, refined shadows)

**Manifest**:
- [ ] All editable content exposed as data
- [ ] All styleable properties exposed as cssProperties
- [ ] **CRITICAL: defaultValue types match dataType (number not "number", true not "true")**
- [ ] statesDefaultValues used for hover/active/focus states
- [ ] Selectors match React/CSS class names exactly
- [ ] Default values match React props and CSS exactly
- [ ] Length constraints respected (selector 4-50, displayName 4-100)
- [ ] Element hierarchy matches user mental model
- [ ] Proper data types used

**Synchronization**:
- [ ] React prop names = Manifest data keys
- [ ] React prop defaults = Manifest defaultValue
- [ ] React classNames = CSS selectors = Manifest selectors
- [ ] CSS defaults = Manifest cssProperties defaultValue

---

### COMMON MISTAKES TO AVOID

These are the most common errors that violate the prompt. **Never make these mistakes:**

#### ❌ MISTAKE 1: Using Media Queries or Feature Queries for Responsiveness

**WRONG:**
```css
.component-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
}

@media (max-width: 640px) {
  .component-item {
    grid-template-columns: 1fr;
  }
}
```

**CORRECT:**
```css
/* Define the element ONCE with responsive properties */
.component-item {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.component-item__main {
  flex: 1 1 200px; /* Grows/shrinks, wraps when less than 200px */
  min-width: 0; /* Allows text truncation */
}

.component-item__aside {
  flex: 0 0 auto; /* Fixed to content size */
}
```

#### ❌ MISTAKE 2: Using String for Number/Boolean defaultValue

**WRONG:**
```json
{
  "showImages": {
    "dataType": "booleanValue",
    "defaultValue": "true"
  },
  "quantity": {
    "dataType": "number",
    "defaultValue": "1"
  }
}
```

**CORRECT:**
```json
{
  "showImages": {
    "dataType": "booleanValue",
    "defaultValue": true
  },
  "quantity": {
    "dataType": "number",
    "defaultValue": 1
  }
}
```
