# Playground: Manifest & React Defaults Analysis

## Current Implementation Flow

### 1. Component Loading & Compilation
When a generated output is pasted:

```
parseAndCompileGeneratedOutput() 
  → extracts <react>, <css>, <manifest>
  → compileCode() compiles React code into a component
  → stores in parsedOutput.component
  → parses manifest JSON into manifestJson state
```

**Location**: Lines 2600-2651 in App.tsx

### 2. State Initialization from Manifest
When `manifestJson` changes, an effect runs:

```typescript
useEffect(() => {
  if (manifestJson && manifestJson.editorElement) {
    // Reset image counter
    imageCounter = 0;
    
    // Build initial state from manifest defaults
    const initialState = buildInitialState(manifestJson.editorElement);
    setComponentProps(initialState);
    
    // Build initial CSS state from manifest defaults
    const initialCssState = buildInitialCssState(manifestJson.editorElement);
    setComponentCssProps(initialCssState);
    
    // ... selector map, collapsed nodes, container size
  }
}, [manifestJson]);
```

**Location**: Lines 2653-2710

### 3. Default Value Creation Logic

#### `createDefaultValue(schema)` - Lines 1040-1115

This function takes a manifest schema entry and returns the default value:

1. **For arrayItems**: 
   - Checks `schema.defaultValue` (string or array)
   - If empty, generates 3-5 sample items based on schema
   - Handles both simple dataItem and complex nested structures

2. **For objectValue**: 
   - Tries to parse `schema.defaultValue` as JSON if it's a string
   - If no defaultValue, recursively builds object from properties

3. **For primitives**:
   - Returns `schema.defaultValue` if exists
   - Otherwise: booleanValue→false, number→0, text/stringValue→'', image→placeholder

#### `buildInitialState(node)` - Lines 1117-1131

Walks the manifest tree and builds the complete initial props object:
- Iterates over `node.data` entries and calls `createDefaultValue()` for each
- Recursively handles nested `elements` (child components)
- Returns structured object like: `{ prop1: value1, prop2: value2, elementProps: { child1: {...}, ... } }`

#### `buildInitialCssState(node)` - Lines 1133-1148

Similar to buildInitialState but for CSS:
- Iterates over `node.cssProperties`
- Takes `value.defaultValue` directly (no createDefaultValue logic)
- Returns structured object like: `{ properties: { prop1: value1, ... }, elements: { child1: {...}, ... } }`

### 4. Component Rendering with Props

The component receives props from state:

```typescript
<RenderedComponent 
  {...{
    className: "generated-component",
    id: "generated-component-1",
    wix: {},
    ...componentProps,  // ← Spread manifest-derived props
  } as any}
/>
```

**Location**: Lines 2934-2941

### 5. Properties Panel Rendering

The Properties Panel displays and edits these values:

```typescript
<ManifestNode
  node={nodeToRender}
  propPath={propPath}
  cssPath={cssPath}
  props={componentProps}        // ← Current values
  onPropChange={handlePropChange}
  cssProps={componentCssProps}
  onCssChange={handleCssPropChange}
/>
```

**Location**: Lines 3600-3612

#### ManifestNode Component - Lines 1389-1551

Recursively renders:
- **Data props**: Iterates `node.data`, shows controls for each
  - Gets current value from `componentProps` via path
  - Shows Toggle for booleanValue, ArrayEditor for arrayItems, text input for others
- **CSS props**: Iterates `node.cssProperties`
  - Gets current value from `componentCssProps` or falls back to `propValue.defaultValue`
  - Shows specialized controls (color picker, size slider, dropdown, etc.)
- **Child elements**: Recursively renders nested ManifestNode components

**Key observation**: CSS properties show `propValue.defaultValue` as fallback (line 1467), but data props don't show the schema default, they only show the current `componentProps` value.

---

## Current Default Values Source

### What's Used Now?
**Only manifest `defaultValue` fields** are used as the source of defaults:
- Data props: `schema.defaultValue` from manifest
- CSS props: `propValue.defaultValue` from manifest

### What's NOT Used?
**React component's prop defaults** defined in the component code:
```typescript
// Example: These defaults are NOT extracted or used
const MyComponent: React.FC<Props> = ({ 
  title = "Default Title",        // ← ignored
  count = 0,                       // ← ignored
  items = [],                      // ← ignored
}) => { ... }
```

---

## Options for Adding React Defaults

### Option 1: Extract React Defaults via Static Analysis ⚡ Recommended

**Approach**: Parse the React code string to extract default prop values

**Implementation**:
1. After compiling React code, parse it with a JS parser (e.g., `@babel/parser`)
2. Walk the AST to find:
   - Function components with destructured props and defaults
   - Class components with `defaultProps` or `static defaultProps`
   - TypeScript interfaces with default values
3. Build a map: `{ propName: defaultValue }`
4. Store in state alongside manifestJson

**Pros**:
- Accurate reflection of actual React code
- Works with various default syntax patterns
- Can detect TypeScript defaults too

**Cons**:
- Requires adding a parser dependency
- Need to handle various syntax patterns
- AST traversal can be complex

**Example Code Sketch**:
```typescript
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

function extractReactDefaults(reactCode: string): Record<string, any> {
  const ast = parse(reactCode, { 
    sourceType: 'module',
    plugins: ['jsx', 'typescript'] 
  });
  
  const defaults: Record<string, any> = {};
  
  traverse(ast, {
    // Look for: ({ title = "default", count = 5 })
    AssignmentPattern(path) {
      if (path.parent.type === 'ObjectPattern') {
        const key = path.node.left;
        const value = path.node.right;
        if (key.type === 'Identifier') {
          defaults[key.name] = extractLiteralValue(value);
        }
      }
    },
    // Look for: ComponentName.defaultProps = {...}
    AssignmentExpression(path) {
      if (
        path.node.left.type === 'MemberExpression' &&
        path.node.left.property.name === 'defaultProps'
      ) {
        // Extract object properties
      }
    }
  });
  
  return defaults;
}
```

### Option 2: Runtime Inspection via Component Instance 🔍

**Approach**: Render component, inspect its default prop values

**Implementation**:
1. Render component with no props: `<RenderedComponent />`
2. Use React DevTools protocol or internal APIs to inspect props
3. Compare with props when given values to infer defaults

**Pros**:
- Gets actual runtime defaults
- No parsing needed

**Cons**:
- React doesn't expose prop defaults in a standard way
- Components might crash without required props
- Side effects could run during inspection
- Not reliable for all component patterns

**Verdict**: ❌ Not practical

### Option 3: Convention-Based Extraction via Regex 📝

**Approach**: Use regex patterns to extract defaults from React code string

**Implementation**:
1. Search for destructuring patterns: `({ prop1 = value1, prop2 = value2 })`
2. Search for defaultProps: `ComponentName.defaultProps = {...}`
3. Build defaults map

**Pros**:
- Simple, no dependencies
- Fast

**Cons**:
- Fragile, breaks with complex syntax
- Can't handle all patterns (spread, computed properties, etc.)
- False positives possible

**Example Code Sketch**:
```typescript
function extractReactDefaultsSimple(reactCode: string): Record<string, any> {
  const defaults: Record<string, any> = {};
  
  // Pattern: ({ prop1 = "value", prop2 = 123 })
  const destructureRegex = /\{\s*([^}]+)\s*\}/g;
  const propDefaultRegex = /(\w+)\s*=\s*([^,}]+)/g;
  
  let match;
  while ((match = destructureRegex.exec(reactCode))) {
    const propsString = match[1];
    let propMatch;
    while ((propMatch = propDefaultRegex.exec(propsString))) {
      const propName = propMatch[1];
      const defaultValue = propMatch[2].trim();
      defaults[propName] = parseDefaultValue(defaultValue);
    }
  }
  
  return defaults;
}

function parseDefaultValue(value: string): any {
  // Try to parse as JSON
  try {
    return JSON.parse(value);
  } catch {
    // Handle string literals, remove quotes
    if (value.startsWith('"') || value.startsWith("'")) {
      return value.slice(1, -1);
    }
    return value;
  }
}
```

### Option 4: Dual Source UI - Show Both Manifest & React Defaults 🎨

**Approach**: Display both manifest defaults AND React defaults in the UI

**Implementation**:
1. Use Option 1 or 3 to extract React defaults
2. Store in separate state: `reactDefaults`
3. Modify Properties Panel UI to show both:
   - Current value (from `componentProps`)
   - Manifest default (grayed out, clickable to apply)
   - React default (grayed out, clickable to apply, in a different color)

**UI Mockup**:
```
┌─────────────────────────────────┐
│ Property: title                 │
│ Current: "My Title"             │
│ ├─ Manifest: "Sample Title" 📄  │ ← Click to apply
│ └─ React: "Default Title" ⚛️    │ ← Click to apply
└─────────────────────────────────┘
```

**Pros**:
- Shows full picture of defaults
- User can choose which default to apply
- Educational - shows both systems

**Cons**:
- More complex UI
- Could be confusing for users
- Takes more space

---

## Recommended Approach

### Phase 1: Extract React Defaults (Option 1)
1. Add `@babel/parser` and `@babel/traverse` dependencies
2. Create `extractReactDefaults()` function
3. Call after compiling React code
4. Store in state: `const [reactDefaults, setReactDefaults] = useState<Record<string, any>>({});`

### Phase 2: Show in Properties Panel
Two sub-options:

#### 2A: Replace Manifest Defaults with React Defaults
- Use React defaults as the primary source
- Fall back to manifest defaults if React default not found
- Simple UI change

#### 2B: Show Both with Toggle/Dropdown
- Add UI control: "Show: [Manifest Defaults] [React Defaults] [Both]"
- Display chosen defaults in properties panel
- Allow applying either default with a button

### Phase 3: Apply Defaults
Add "Reset to Default" button for each prop:
- If showing both: dropdown to choose which default
- If showing one: button applies that default
- Updates `componentProps` state

---

## Code Locations Reference

| Functionality | Location | Description |
|--------------|----------|-------------|
| Parse output | Lines 2600-2651 | Extract react/css/manifest tags |
| Compile React | Via `compileCode()` | Babel transpile + eval |
| Parse manifest | Line 2643 | `JSON.parse(manifestMatch[1])` |
| Initialize state | Lines 2653-2710 | Build props from manifest |
| `createDefaultValue` | Lines 1040-1115 | Convert manifest schema to value |
| `buildInitialState` | Lines 1117-1131 | Walk manifest tree for props |
| `buildInitialCssState` | Lines 1133-1148 | Walk manifest tree for CSS |
| Render component | Lines 2934-2941 | Spread componentProps |
| Properties Panel | Lines 3484-3616 | Floating panel UI |
| ManifestNode | Lines 1389-1551 | Recursive property renderer |
| handlePropChange | Line 2712+ | Update componentProps state |
| handleCssPropChange | (search for it) | Update componentCssProps state |

---

## Next Steps

To proceed with implementation, you should:

1. **Decide on approach**: Option 1 (AST) vs Option 3 (Regex)
2. **Decide on UI**: Replace defaults vs show both
3. **Test scenarios**: Identify edge cases in your component library
4. **Prototype**: Implement extraction first, test with sample components
5. **Integrate**: Wire up to properties panel
6. **Polish**: Add reset buttons, tooltips, etc.

Would you like me to start implementing one of these options?















