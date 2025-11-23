# Playground Data Flow Diagram

## Complete System Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER PASTES GENERATED OUTPUT                     │
│                     (or loads from CSV test results)                     │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              parseAndCompileGeneratedOutput(output)                     │
│                                                                          │
│  1. Extract tags via regex:                                            │
│     • <design-brief>...</design-brief>                                 │
│     • <react>...</react>                                               │
│     • <css>...</css>                                                   │
│     • <manifest>...</manifest>                                         │
│                                                                          │
│  2. Sanitize React code (remove style imports)                         │
│                                                                          │
│  3. compileCode(reactCode) → Component Function                        │
│     (uses Babel transform + eval)                                      │
│                                                                          │
│  4. Parse manifest JSON                                                │
└────────────┬───────────────────────────┬────────────────────────────────┘
             │                           │
             │                           │
             ▼                           ▼
┌────────────────────────┐   ┌──────────────────────────┐
│   setParsedOutput()    │   │   setManifestJson()      │
│   {                    │   │   {                      │
│     component: Comp,   │   │     editorElement: {...},│
│     reactCode,         │   │     installation: {...}, │
│     css,               │   │     ...                  │
│     manifest,          │   │   }                      │
│     error              │   └──────────┬───────────────┘
│   }                    │              │
└────────────────────────┘              │
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│            useEffect(() => { ... }, [manifestJson])                     │
│                                                                          │
│  Triggers when manifestJson changes:                                   │
│                                                                          │
│  1. buildInitialState(manifestJson.editorElement)                      │
│     └─> Walks manifest tree, calls createDefaultValue() for each prop │
│         Returns: { prop1: value1, elementProps: {...} }               │
│                                                                          │
│  2. setComponentProps(initialState)                                    │
│                                                                          │
│  3. buildInitialCssState(manifestJson.editorElement)                   │
│     └─> Walks manifest tree, extracts cssProperties.defaultValue      │
│         Returns: { properties: {...}, elements: {...} }               │
│                                                                          │
│  4. setComponentCssProps(initialCssState)                              │
│                                                                          │
│  5. buildSelectorMap() → map CSS selectors to paths                    │
│                                                                          │
│  6. setContainerState() → apply initialSize from manifest              │
└────────────┬──────────────────────────┬─────────────────────────────────┘
             │                          │
             ▼                          ▼
┌──────────────────────┐    ┌──────────────────────┐
│  componentProps      │    │  componentCssProps   │
│  {                   │    │  {                   │
│    title: "...",     │    │    properties: {     │
│    count: 5,         │    │      color: "...",   │
│    items: [...],     │    │      fontSize: "..." │
│    elementProps: {   │    │    },                │
│      child1: {...}   │    │    elements: {       │
│    }                 │    │      child1: {...}   │
│  }                   │    │    }                 │
└──────────┬───────────┘    │  }                   │
           │                └──────────┬───────────┘
           │                           │
           │                           │
           └───────────────┬───────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      COMPONENT RENDERING                                 │
│                                                                          │
│  <RenderedComponent                                                     │
│    className="generated-component"                                      │
│    id="generated-component-1"                                           │
│    wix={{}}                                                             │
│    {...componentProps}          ← Props spread here                    │
│  />                                                                     │
│                                                                          │
│  Component receives: { title, count, items, elementProps, ... }        │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                      CSS APPLICATION                                     │
│                                                                          │
│  useEffect(() => {                                                      │
│    // Walk manifest tree and apply CSS custom properties               │
│    applyStyles(node, cssStateNode) {                                   │
│      if (node.selector) {                                              │
│        const element = document.querySelector(node.selector);          │
│        Object.entries(cssStateNode.properties).forEach(([prop, val]) => {│
│          element.style.setProperty(prop, val);                         │
│        });                                                              │
│      }                                                                  │
│      // Recursively apply to child elements                            │
│    }                                                                    │
│  }, [componentCssProps, manifestJson]);                                │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                      PROPERTIES PANEL                                    │
│                                                                          │
│  User sees/edits properties:                                           │
│                                                                          │
│  <ManifestNode                                                          │
│    node={manifestJson.editorElement}                                   │
│    props={componentProps}        ← Current values                      │
│    cssProps={componentCssProps}  ← Current CSS values                  │
│    onPropChange={handlePropChange}                                     │
│    onCssChange={handleCssPropChange}                                   │
│  />                                                                     │
│                                                                          │
│  ManifestNode recursively renders:                                     │
│  ┌──────────────────────────────────────┐                             │
│  │ Data Props (from node.data)          │                             │
│  │  • Gets value: componentProps[prop]   │                             │
│  │  • Shows: Toggle, Input, ArrayEditor  │                             │
│  │  • On change: calls onPropChange()    │                             │
│  │                                       │                             │
│  │ CSS Props (from node.cssProperties)   │                             │
│  │  • Gets value: componentCssProps...   │                             │
│  │    OR schema.defaultValue (fallback)  │ ← Manifest default shown   │
│  │  • Shows: ColorPicker, SizeSlider...  │                             │
│  │  • On change: calls onCssChange()     │                             │
│  │                                       │                             │
│  │ Child Elements (from node.elements)   │                             │
│  │  • Recursively renders ManifestNode   │                             │
│  └──────────────────────────────────────┘                             │
└─────────────────────────────────────────────────────────────────────────┘
             │                          │
             │                          │
             ▼                          ▼
  ┌───────────────────┐    ┌───────────────────┐
  │ handlePropChange  │    │ handleCssChange   │
  │                   │    │                   │
  │ Updates:          │    │ Updates:          │
  │ componentProps    │    │ componentCssProps │
  │                   │    │                   │
  │ → Re-renders      │    │ → Re-applies CSS  │
  │   component       │    │   via useEffect   │
  └───────────────────┘    └───────────────────┘
```

---

## Default Values Flow (Current System)

```
MANIFEST SCHEMA                      COMPONENT PROPS STATE
────────────────                     ─────────────────────

editorElement: {
  data: {
    title: {
      dataType: "text",
      defaultValue: "Hello"   ──┐
    },                           │
    count: {                     │
      dataType: "number",        │
      defaultValue: 5        ──┐ │
    }                           │ │
  }                             │ │
}                               │ │
                                │ │
         buildInitialState()    │ │
         createDefaultValue()   │ │
                                │ │
                                ▼ ▼
                           componentProps = {
                             title: "Hello",
                             count: 5
                           }
                                │
                                ▼
                           <RenderedComponent 
                             title="Hello"
                             count={5}
                           />

REACT COMPONENT CODE
────────────────────
const MyComponent = ({ 
  title = "Default Title",    ← IGNORED! Not extracted or used
  count = 0,                  ← IGNORED! Not extracted or used
}) => { ... }
```

---

## Proposed Flow: Adding React Defaults

```
REACT CODE STRING                       EXTRACTED DEFAULTS
─────────────────                       ──────────────────

const MyComponent = ({ 
  title = "Default Title",
  count = 0,
  items = [],
}) => { ... }
        │
        ▼
   extractReactDefaults()
   (via AST parsing or regex)
        │
        ▼
   reactDefaults = {
     title: "Default Title",
     count: 0,
     items: []
   }

                    ┌─────────────┐
                    │             │
         ┌──────────▼──────────┐  │
         │                     │  │
    MANIFEST               REACT   │
    DEFAULTS               DEFAULTS│
         │                     │  │
         │                     │  │
         └──────────┬──────────┘  │
                    │             │
                    ▼             │
         ┌──────────────────────┐ │
         │  PROPERTIES PANEL    │ │
         │                      │ │
         │  Show both defaults: │ │
         │  • Manifest: "Hello" │◄┘
         │  • React: "Default   │
         │    Title"            │
         │                      │
         │  [Apply Manifest]    │
         │  [Apply React]       │
         └──────────────────────┘
```

---

## Key Functions Deep Dive

### createDefaultValue(schema)

```
Input: schema from manifest
  {
    dataType: "text",
    defaultValue: "Hello",
    displayName: "Title"
  }

Flow:
  1. Is it arrayItems?
     └─> Check defaultValue, parse if needed
         └─> Generate sample items if empty
  
  2. Does it have defaultValue?
     └─> objectValue? Try JSON.parse
     └─> Return defaultValue
  
  3. Fallback by dataType:
     └─> booleanValue → false
     └─> number → 0
     └─> text/stringValue → ''
     └─> image → placeholder

Output: "Hello"
```

### buildInitialState(node)

```
Input: node = manifestJson.editorElement
  {
    data: {
      title: {...},
      count: {...}
    },
    elements: {
      button: {
        inlineElement: {...}
      }
    }
  }

Flow:
  1. Iterate node.data
     └─> For each prop: createDefaultValue(schema)
     └─> state[prop] = defaultValue
  
  2. Iterate node.elements
     └─> For each element: buildInitialState(element.inlineElement)
     └─> state.elementProps[elementName] = childState
  
  3. Return state

Output: 
  {
    title: "Hello",
    count: 5,
    elementProps: {
      button: {
        label: "Click",
        disabled: false
      }
    }
  }
```

### ManifestNode Rendering

```
Input:
  - node: manifest schema node
  - props: current componentProps
  - propPath: ['root', 'elementProps', 'button']

Rendering:
  For each node.data entry:
    1. Calculate currentPath = [...propPath, propName]
    2. Get currentValue = getValueByPath(props, currentPath)
    3. Render control (Toggle, Input, ArrayEditor, etc.)
    4. On change → onPropChange(currentPath, newValue)
  
  For each node.cssProperties entry:
    1. Get currentValue from componentCssProps
       OR fallback to propValue.defaultValue  ← Manifest default
    2. Render control (ColorPicker, SizeSlider, etc.)
    3. On change → onCssChange(cssPath, propName, newValue)
  
  For each node.elements entry:
    1. Recursively render <ManifestNode />
```

---

## Important State Variables

| Variable | Type | Purpose | Set By |
|----------|------|---------|--------|
| `manifestJson` | `any` | Parsed manifest JSON | `parseAndCompileGeneratedOutput()` |
| `componentProps` | `any` | Current data prop values | `buildInitialState()` then `handlePropChange()` |
| `componentCssProps` | `any` | Current CSS prop values | `buildInitialCssState()` then `handleCssPropChange()` |
| `selectorMap` | `{ [selector]: path[] }` | Maps CSS selectors to manifest paths | `buildSelectorMap()` |
| `selectedElementPath` | `string[] | null` | Currently selected element in panel | Click handlers |
| `parsedOutput.component` | `React.FC` | Compiled React component | `compileCode()` |

---

## Where React Defaults Could Fit In

### Option A: Primary Source (Replace Manifest)

```
buildInitialState(node) {
  // NEW: Check React defaults first
  if (reactDefaults[propName] !== undefined) {
    state[propName] = reactDefaults[propName];
  } else {
    // Fallback to manifest
    state[propName] = createDefaultValue(schema);
  }
}
```

### Option B: Secondary Source (Show Both)

```
ManifestNode rendering:
  <div>
    <label>{propName}</label>
    <input value={currentValue} onChange={...} />
    
    {/* NEW: Show both defaults */}
    <div className="defaults-panel">
      <button onClick={() => applyDefault(manifestDefault)}>
        📄 Manifest: {manifestDefault}
      </button>
      <button onClick={() => applyDefault(reactDefaults[propName])}>
        ⚛️ React: {reactDefaults[propName]}
      </button>
    </div>
  </div>
```

### Option C: Hybrid (Intelligent Merge)

```
buildInitialState(node) {
  // Use React defaults for props that exist in React
  // Use manifest defaults for props that don't exist in React
  // Prefer React defaults when both exist
  
  const reactValue = reactDefaults[propName];
  const manifestValue = createDefaultValue(schema);
  
  state[propName] = reactValue !== undefined 
    ? reactValue 
    : manifestValue;
}
```















