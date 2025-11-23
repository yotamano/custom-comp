# Playground Defaults: Concrete Examples

## Example 1: Simple Text Prop

### Manifest Definition
```json
{
  "editorElement": {
    "data": {
      "title": {
        "dataType": "text",
        "defaultValue": "Welcome to My App",
        "displayName": "Title"
      }
    }
  }
}
```

### React Component
```typescript
interface Props {
  title?: string;
}

const MyComponent: React.FC<Props> = ({ 
  title = "Default Title"  // ← React default
}) => {
  return <h1>{title}</h1>;
};
```

### Current Behavior
1. **Initial render**: Shows "Welcome to My App" (from manifest)
2. **Properties panel**: Input shows "Welcome to My App"
3. **React default ignored**: "Default Title" is never used

### Problem
The React default `"Default Title"` is the actual fallback in code, but users see and edit the manifest default. If manifest is missing/incorrect, user doesn't know the real React default.

---

## Example 2: Number Prop

### Manifest Definition
```json
{
  "editorElement": {
    "data": {
      "maxItems": {
        "dataType": "number",
        "defaultValue": 10,
        "displayName": "Max Items"
      }
    }
  }
}
```

### React Component
```typescript
const MyComponent: React.FC<Props> = ({ 
  maxItems = 5  // ← React default (different!)
}) => {
  return <div>Showing {maxItems} items</div>;
};
```

### Current Behavior
1. **Initial state**: `componentProps.maxItems = 10` (manifest)
2. **Component receives**: `<MyComponent maxItems={10} />`
3. **Renders**: "Showing 10 items"

### Issue
Manifest says 10, React says 5. Which is correct? User has no way to know.

---

## Example 3: Boolean Prop

### Manifest Definition
```json
{
  "editorElement": {
    "data": {
      "showBorder": {
        "dataType": "booleanValue",
        "defaultValue": false,
        "displayName": "Show Border"
      }
    }
  }
}
```

### React Component
```typescript
const MyComponent: React.FC<Props> = ({ 
  showBorder = true  // ← React default (opposite!)
}) => {
  return (
    <div style={{ border: showBorder ? '1px solid' : 'none' }}>
      Content
    </div>
  );
};
```

### Current Behavior
1. **Playground**: Toggle is OFF (false from manifest)
2. **Component**: Shows border (receives false, but if prop was omitted, would default to true)

### Confusion
If user deletes the prop from componentProps, React default (true) would kick in, showing different behavior.

---

## Example 4: Array Prop with Generated Items

### Manifest Definition
```json
{
  "editorElement": {
    "data": {
      "items": {
        "dataType": "arrayItems",
        "defaultValue": "[]",
        "displayName": "Items",
        "arrayItems": {
          "dataItem": {
            "dataType": "text"
          }
        }
      }
    }
  }
}
```

### React Component
```typescript
const MyComponent: React.FC<Props> = ({ 
  items = ["Item 1", "Item 2", "Item 3"]  // ← React default
}) => {
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
};
```

### Current Behavior
1. **Manifest has**: `"defaultValue": "[]"` (empty)
2. **Playground generates**: 3 sample items ("Sample Text", "Item 2", "Item 3")
3. **React default**: 3 specific items

### Result
User sees generated samples, not React's actual defaults. If they want React's defaults, they have to type them manually.

---

## Example 5: Object Prop

### Manifest Definition
```json
{
  "editorElement": {
    "data": {
      "config": {
        "dataType": "objectValue",
        "defaultValue": "{\"theme\":\"dark\",\"size\":\"large\"}",
        "displayName": "Configuration"
      }
    }
  }
}
```

### React Component
```typescript
const MyComponent: React.FC<Props> = ({ 
  config = { theme: "light", size: "medium" }  // ← React default
}) => {
  return <div className={`theme-${config.theme} size-${config.size}`} />;
};
```

### Current Behavior
1. **Manifest parses**: `{ theme: "dark", size: "large" }`
2. **Component receives**: dark theme, large size
3. **React would default to**: light theme, medium size

### Mismatch
Two different default objects. No way to see or test React's defaults in playground.

---

## Example 6: CSS Properties

### Manifest Definition
```json
{
  "editorElement": {
    "cssProperties": {
      "--primary-color": {
        "displayName": "Primary Color",
        "defaultValue": "#3498db"
      },
      "--font-size": {
        "displayName": "Font Size",
        "defaultValue": "16px"
      }
    }
  }
}
```

### React Component (CSS)
```css
.my-component {
  --primary-color: #2ecc71;  /* Different default! */
  --font-size: 14px;         /* Different default! */
  background: var(--primary-color);
  font-size: var(--font-size);
}
```

### Current Behavior
1. **Playground uses**: Manifest defaults (#3498db, 16px)
2. **Properties panel fallback**: Shows manifest defaults if not set
3. **Actual CSS**: Has different defaults in stylesheet

### Note
CSS defaults are harder to extract from React code, but CSS custom properties have a natural fallback in the stylesheet itself.

---

## Proposed Solution Examples

### Extracted React Defaults

After parsing React code:
```typescript
const reactDefaults = {
  title: "Default Title",
  maxItems: 5,
  showBorder: true,
  items: ["Item 1", "Item 2", "Item 3"],
  config: { theme: "light", size: "medium" }
};
```

### UI Option 1: Show Both in Properties Panel

```
┌────────────────────────────────────────┐
│ Property: title                        │
│ ┌────────────────────────────────────┐ │
│ │ [Welcome to My App          ]      │ │  ← Current value (editable)
│ └────────────────────────────────────┘ │
│                                        │
│ Defaults:                              │
│ ┌────────────────────────────────────┐ │
│ │ 📄 Manifest: "Welcome to My App"   │ │  ← Click to apply
│ │ ⚛️ React:    "Default Title"       │ │  ← Click to apply
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Property: maxItems                     │
│ ┌────────────────────────────────────┐ │
│ │ [━━━━━━●───────────] [10]          │ │  ← Slider + input
│ └────────────────────────────────────┘ │
│                                        │
│ Defaults:                              │
│ ┌────────────────────────────────────┐ │
│ │ 📄 Manifest: 10                    │ │
│ │ ⚛️ React:    5   ⚠️ Different!     │ │  ← Highlight conflicts
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### UI Option 2: Inline Reset Buttons

```
┌────────────────────────────────────────┐
│ Property: title                        │
│ [Welcome to My App          ] ⟲        │  ← Reset dropdown
│                                        │
│ When clicked:                          │
│ ┌────────────────────────────────────┐ │
│ │ Reset to:                          │ │
│ │ → 📄 Manifest: "Welcome to My App" │ │
│ │ → ⚛️ React:    "Default Title"     │ │
│ │ → ↩️  Original: "Welcome to My App"│ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### UI Option 3: Tooltip on Hover

```
┌────────────────────────────────────────┐
│ Property: title                     ℹ️  │  ← Hover for info
│ [Welcome to My App          ]          │
└────────────────────────────────────────┘
      │
      └─> Tooltip:
          ┌────────────────────────────┐
          │ Manifest default:          │
          │   "Welcome to My App"      │
          │                            │
          │ React default:             │
          │   "Default Title"          │
          │                            │
          │ Current: "Welcome to My App"│
          └────────────────────────────┘
```

---

## Code Changes Needed

### 1. Extract React Defaults (AST Approach)

```typescript
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

function extractReactDefaults(reactCode: string): Record<string, any> {
  const defaults: Record<string, any> = {};
  
  try {
    const ast = parse(reactCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    traverse(ast, {
      // Pattern: ({ prop1 = value1, prop2 = value2 })
      AssignmentPattern(path) {
        const parent = path.parent;
        if (parent.type === 'ObjectPattern') {
          const leftNode = path.node.left;
          const rightNode = path.node.right;
          
          if (leftNode.type === 'Identifier') {
            const propName = leftNode.name;
            const defaultValue = extractLiteralValue(rightNode);
            if (defaultValue !== undefined) {
              defaults[propName] = defaultValue;
            }
          }
        }
      },
      
      // Pattern: ComponentName.defaultProps = { ... }
      AssignmentExpression(path) {
        const left = path.node.left;
        const right = path.node.right;
        
        if (
          left.type === 'MemberExpression' &&
          left.property.type === 'Identifier' &&
          left.property.name === 'defaultProps' &&
          right.type === 'ObjectExpression'
        ) {
          right.properties.forEach((prop) => {
            if (
              prop.type === 'ObjectProperty' &&
              prop.key.type === 'Identifier'
            ) {
              const propName = prop.key.name;
              const defaultValue = extractLiteralValue(prop.value);
              if (defaultValue !== undefined) {
                defaults[propName] = defaultValue;
              }
            }
          });
        }
      },
    });
  } catch (error) {
    console.error('Failed to extract React defaults:', error);
  }
  
  return defaults;
}

function extractLiteralValue(node: any): any {
  switch (node.type) {
    case 'StringLiteral':
      return node.value;
    case 'NumericLiteral':
      return node.value;
    case 'BooleanLiteral':
      return node.value;
    case 'NullLiteral':
      return null;
    case 'ArrayExpression':
      return node.elements.map((el: any) => extractLiteralValue(el));
    case 'ObjectExpression':
      const obj: any = {};
      node.properties.forEach((prop: any) => {
        if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
          obj[prop.key.name] = extractLiteralValue(prop.value);
        }
      });
      return obj;
    case 'UnaryExpression':
      if (node.operator === '-' && node.argument.type === 'NumericLiteral') {
        return -node.argument.value;
      }
      return undefined;
    default:
      return undefined; // Can't extract (e.g., function calls, variables)
  }
}
```

### 2. Add State for React Defaults

```typescript
// In App.tsx, add new state:
const [reactDefaults, setReactDefaults] = useState<Record<string, any>>({});

// Modify parseAndCompileGeneratedOutput:
const parseAndCompileGeneratedOutput = (output: string) => {
  // ... existing code ...
  
  const { component, error } = compileCode(sanitizedReactCode);
  
  // NEW: Extract React defaults
  const defaults = extractReactDefaults(sanitizedReactCode);
  setReactDefaults(defaults);
  
  setParsedOutput({
    designBrief,
    reactCode,
    css,
    manifest,
    component,
    error,
  });
  
  // ... rest of code ...
};
```

### 3. Update ManifestNode to Show Both Defaults

```typescript
// In ManifestNode component, for data props:
{Object.entries(node.data).map(([propName, propValue]: [string, any]) => {
  const currentPath = [...propPath, propName];
  const currentValue = getValueByPath(props, currentPath.slice(1));
  
  // NEW: Get both defaults
  const manifestDefault = propValue.defaultValue;
  const reactDefault = reactDefaults[propName];
  const hasConflict = manifestDefault !== reactDefault && reactDefault !== undefined;
  
  return (
    <div key={propName} style={{ marginBottom: '12px' }}>
      {/* Property label and control */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <label style={{ color: '#71717a', fontSize: '11px' }}>
          {propValue.displayName || propName}:
          {hasConflict && <span style={{ color: '#f59e0b', marginLeft: '4px' }}>⚠️</span>}
        </label>
        
        {/* Control (input, toggle, etc.) */}
        <div>
          {propValue.dataType === 'booleanValue' ? (
            <Toggle checked={!!currentValue} onChange={(checked) => onPropChange(currentPath.slice(1), checked)} />
          ) : (
            <input
              type="text"
              value={currentValue || ''}
              onChange={(e) => onPropChange(currentPath.slice(1), e.target.value)}
              style={{ /* ... */ }}
            />
          )}
        </div>
      </div>
      
      {/* NEW: Show defaults */}
      <div style={{ paddingLeft: '8px', fontSize: '10px', color: '#71717a' }}>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          {manifestDefault !== undefined && (
            <button
              onClick={() => onPropChange(currentPath.slice(1), manifestDefault)}
              style={{
                padding: '2px 6px',
                fontSize: '9px',
                background: '#f4f4f5',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              title="Apply manifest default"
            >
              📄 {JSON.stringify(manifestDefault)}
            </button>
          )}
          
          {reactDefault !== undefined && (
            <button
              onClick={() => onPropChange(currentPath.slice(1), reactDefault)}
              style={{
                padding: '2px 6px',
                fontSize: '9px',
                background: hasConflict ? '#fef3c7' : '#f4f4f5',
                border: `1px solid ${hasConflict ? '#f59e0b' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              title="Apply React default"
            >
              ⚛️ {JSON.stringify(reactDefault)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
})}
```

### 4. Alternative: Use React Defaults as Primary

If you want React defaults to take priority:

```typescript
// Modify buildInitialState:
const buildInitialState = (node: any, reactDefaults: Record<string, any> = {}): any => {
  let state: any = {};
  if (node.data) {
    Object.entries(node.data).forEach(([key, value]: [string, any]) => {
      // NEW: Prefer React defaults
      if (reactDefaults[key] !== undefined) {
        state[key] = reactDefaults[key];
      } else {
        state[key] = createDefaultValue(value);
      }
    });
  }
  // ... rest of function ...
  return state;
};

// Update the useEffect:
useEffect(() => {
  if (manifestJson && manifestJson.editorElement) {
    const initialState = buildInitialState(manifestJson.editorElement, reactDefaults);
    setComponentProps(initialState);
    // ...
  }
}, [manifestJson, reactDefaults]); // Add reactDefaults as dependency
```

---

## Testing the Feature

### Test Case 1: Matching Defaults
```typescript
// Manifest: defaultValue: "Hello"
// React:    title = "Hello"
// Expected: No conflict warning, both buttons show same value
```

### Test Case 2: Conflicting Defaults
```typescript
// Manifest: defaultValue: 10
// React:    maxItems = 5
// Expected: ⚠️ warning icon, both buttons show different values
```

### Test Case 3: Missing Manifest Default
```typescript
// Manifest: no defaultValue
// React:    title = "Default"
// Expected: Only React button shown
```

### Test Case 4: Missing React Default
```typescript
// Manifest: defaultValue: "Hello"
// React:    title: string (no default)
// Expected: Only Manifest button shown
```

### Test Case 5: Complex Types
```typescript
// Manifest: defaultValue: "[1, 2, 3]"
// React:    items = [1, 2, 3]
// Expected: Both buttons, no conflict (same value)

// Manifest: defaultValue: "{\"a\":1}"
// React:    config = { a: 1 }
// Expected: Both buttons, JSON displayed
```

---

## Migration Strategy

### Phase 1: Extract & Store (No UI changes)
- Add extraction logic
- Store in state
- Log to console for debugging
- Test with various component patterns

### Phase 2: Show React Defaults (Read-only)
- Display React defaults in properties panel
- Add tooltips or info icons
- No interaction yet
- Gather feedback

### Phase 3: Add Apply Buttons
- Add "Apply React Default" buttons
- Add "Apply Manifest Default" buttons
- Add conflict warnings
- Test thoroughly

### Phase 4: Make React Defaults Primary (Optional)
- Change initialization to prefer React defaults
- Update documentation
- Announce breaking change if needed















