# Approach Comparison: Show React Defaults vs Selective Prop Passing

## Your Proposed Approach

**Concept**: Don't extract/show React defaults. Instead:
1. Component renders with its natural React defaults (don't pass unset props)
2. Properties panel shows manifest defaults (as placeholders/suggestions)
3. Only when user changes a property, it gets passed to component (overriding React default)

---

## Current System (Baseline)

```typescript
// Always passes ALL props from manifest defaults
componentProps = {
  title: "Manifest Default",  // From manifest.defaultValue
  count: 5,                   // From manifest.defaultValue
  showBorder: false           // From manifest.defaultValue
}

<RenderedComponent {...componentProps} />
// React defaults NEVER run - all props are always provided
```

**Behavior**: Manifest is the single source of truth, React defaults are ignored.

---

## Approach A: Extract & Show Both Defaults (Previous Analysis)

```typescript
// Extract React defaults via AST
reactDefaults = extractReactDefaults(code)

// Show both in UI
Properties Panel:
  Title: [Manifest Default    ]
  📄 Manifest: "Manifest Default"
  ⚛️ React:    "React Default"

// Still pass all props
<RenderedComponent {...componentProps} />
```

**Implementation Complexity**: 
- ✅ Medium - AST parsing (~100 lines)
- ✅ Medium - UI changes
- ❌ Requires new dependency (@babel/parser)

**User Experience**:
- ✅ Clear - see both defaults
- ✅ Properties panel matches component
- ✅ Can test with either default
- ❌ More UI clutter

---

## Approach B: Selective Prop Passing (Your Proposal)

```typescript
// Track which props are "set" by user
componentProps = {
  title: "Manifest Default"     // Not set by user yet
}

componentPropsSetState = {
  title: false,  // false = not set, true = user modified
  count: false,
  showBorder: false
}

// Only pass "set" props
const propsToPass = {};
Object.entries(componentProps).forEach(([key, value]) => {
  if (componentPropsSetState[key]) {
    propsToPass[key] = value;
  }
});

<RenderedComponent {...propsToPass} />
// React defaults run for unset props!
```

**Implementation Complexity**:
- ✅ Simple - no AST parsing needed
- ✅ No new dependencies
- ⚠️ Medium - need "set state" tracking
- ⚠️ Medium - modify prop change handlers
- ⚠️ Complex - properties panel shows different values than component displays

**User Experience**:
- ❌ **Confusing** - properties panel doesn't match component
- ❌ **Inconsistent** - manifest defaults are just "suggestions"
- ✅ React defaults work naturally
- ❌ Hard to understand initial state

---

## Detailed Comparison

### Implementation Steps

#### Approach A (Show Both)
1. Add `@babel/parser` dependency
2. Create `extractReactDefaults()` function (~100 lines)
3. Add `reactDefaults` state variable
4. Modify properties panel UI to show both
5. Test extraction with various syntax patterns

#### Approach B (Selective Passing)
1. Add `componentPropsSetState` to track which props are user-modified
2. Initialize all to `false` (unset)
3. Modify `handlePropChange` to mark props as "set"
4. Filter props before passing to component
5. Handle initial render behavior
6. Update properties panel to show "unset" state differently

---

## The Core Problem with Approach B

### Visual Disconnect Example

```
Properties Panel                Component Preview
─────────────────              ─────────────────
Title: Welcome to My App       │ Default Title │  ← React default
       (not set, grayed out)   │               │
                               └───────────────┘

User thinks: "Wait, why doesn't it show 'Welcome to My App'?"
```

When user first loads component:
- Properties panel shows manifest defaults (grayed/placeholder)
- Component shows React defaults
- **They don't match** ❌

### User Confusion Scenarios

**Scenario 1: Initial Load**
```
User: "The panel says title should be 'Welcome', but I see 'Default Title'. Is it broken?"
```

**Scenario 2: Testing Defaults**
```
User: "I want to see what the manifest default looks like"
Action: Has to manually type it in? Or click to "apply" it?
```

**Scenario 3: Reset**
```
User: "I changed the title to 'My Custom Title'. Now I want to reset."
Question: "Reset to what?"
- Manifest default? (but it's not what was showing)
- React default? (but it's not in the panel)
- Empty/unset? (but then what happens?)
```

---

## Code Complexity Analysis

### Approach A: Extract & Show Both

**New Code Required**: ~200 lines

```typescript
// 1. Add extraction function (100 lines)
function extractReactDefaults(code: string): Record<string, any> {
  // AST parsing logic
}

// 2. Add state (1 line)
const [reactDefaults, setReactDefaults] = useState({});

// 3. Call after compile (2 lines)
const defaults = extractReactDefaults(reactCode);
setReactDefaults(defaults);

// 4. Modify properties panel UI (100 lines)
// Show both defaults with buttons
```

**Modified Code**: ManifestNode component (~50 lines changed)

---

### Approach B: Selective Prop Passing

**New Code Required**: ~150 lines

```typescript
// 1. Add set-state tracking (30 lines)
const [componentPropsSetState, setComponentPropsSetState] = useState({});

// Initialize on manifest load
const initialSetState = {};
Object.keys(node.data).forEach(key => {
  initialSetState[key] = false; // All unset initially
});
setComponentPropsSetState(initialSetState);

// 2. Modify handlePropChange (20 lines)
const handlePropChange = (path, value) => {
  // Update value
  setComponentProps(/* ... */);
  
  // Mark as "set"
  setComponentPropsSetState(prev => ({
    ...prev,
    [propName]: true
  }));
};

// 3. Filter props before passing to component (20 lines)
const getPropsToPass = () => {
  const result = {};
  Object.entries(componentProps).forEach(([key, value]) => {
    if (componentPropsSetState[key]) {
      result[key] = value;
    }
  });
  return result;
};

<RenderedComponent {...getPropsToPass()} />

// 4. Update properties panel UI (80 lines)
// Show "unset" state, handle nested props, add "apply" buttons?
```

**Modified Code**: 
- ManifestNode component (~30 lines)
- Component rendering logic (~20 lines)
- Multiple useEffects to sync state

---

## The "Easier" Question

### Is Approach B Actually Easier?

**Initial impression**: Yes - no AST parsing!

**Reality**: Not really, because:

1. **State management is complex**
   - Track "set" state for nested props (elementProps.child.prop)
   - Sync with componentProps changes
   - Handle array items (each item set independently?)
   - Handle object props (per-field set state?)

2. **UI/UX requires explanation**
   - Need to visually distinguish "unset" vs "set" props
   - Need to explain why component shows different values
   - Need "apply default" buttons anyway (to set manifest defaults)
   - Might need tooltip: "This is the manifest default. Click to apply."

3. **Edge cases multiply**
   - What if React has no default (prop is required)?
   - What if user sets prop to same value as React default?
   - How to handle CSS properties? (they have stylesheet defaults too)
   - Array editor: are new items "set" or "unset"?

4. **Testing is harder**
   - Can't easily test with manifest defaults without clicking
   - Hard to verify correct behavior
   - More state transitions to test

---

## Recommendation

### Approach A (Extract & Show Both) is BETTER because:

1. **Clearer mental model**
   - What you see in panel = what you see in component
   - Both defaults are explicit and visible
   - No hidden behavior

2. **Better UX**
   - User can see both defaults
   - User can test with either default (one click)
   - Reset is unambiguous (choose which default)
   - Panel and preview stay in sync

3. **Similar complexity**
   - AST parsing is ~100 lines, but it's isolated
   - Set-state tracking is ~150 lines, but it's invasive
   - Both require UI changes

4. **More flexible**
   - Can add features: highlight conflicts, prefer one over other
   - Can switch to "React as primary" later
   - Educational: users learn about both systems

5. **Easier to debug**
   - All state is explicit
   - No "why doesn't it match?" questions
   - Clearer testing

---

## Alternative: Hybrid Approach C

**Best of both worlds?**

1. **Use Approach A's extraction** (show React defaults in UI)
2. **But don't always pass all props** - be selective:
   - If prop value === manifest default AND user hasn't changed it → don't pass
   - This lets React defaults work when they match
   - But user sees both and can choose

**Implementation**:
```typescript
const getPropsToPass = () => {
  const result = {};
  Object.entries(componentProps).forEach(([key, value]) => {
    const manifestDefault = getManifestDefault(key);
    const userModified = componentPropsSetState[key];
    
    // Only pass if:
    // - User modified it, OR
    // - Value differs from manifest default
    if (userModified || value !== manifestDefault) {
      result[key] = value;
    }
  });
  return result;
};
```

**But**: This is even more complex and still has the disconnect issue.

---

## Conclusion

**Your proposed Approach B is NOT easier** because:

- ❌ More complex state management (set-state tracking)
- ❌ Confusing UX (panel vs preview mismatch)
- ❌ More edge cases to handle
- ❌ Harder to test and debug
- ✅ Only benefit: No AST parsing (but code complexity is similar)

**Recommended**: Stick with **Approach A** (Extract & Show Both Defaults)
- Simpler mental model
- Better UX
- Similar implementation complexity
- More future-proof

**If you want simpler**: Keep current system (manifest only)
- Already works
- No changes needed
- Users can manually type React defaults if needed

---

## Quick Decision Matrix

| Criteria | Current | Approach A (Both) | Approach B (Selective) |
|----------|---------|-------------------|------------------------|
| Implementation | ✅ 0 lines | ⚠️ ~200 lines | ⚠️ ~150 lines |
| Dependencies | ✅ None | ❌ @babel/parser | ✅ None |
| Panel ↔ Preview Sync | ✅ Always matches | ✅ Always matches | ❌ Often mismatches |
| User Confusion | ✅ Simple | ✅ Clear (both shown) | ❌ Confusing |
| React Defaults Work | ❌ Never | ❌ Never (all passed) | ✅ Yes (for unset) |
| Can Test Defaults | ⚠️ Manifest only | ✅ Both easily | ⚠️ React only w/ unset |
| Reset Behavior | ✅ Clear | ✅ Clear (choose) | ❌ Ambiguous |
| Future Features | ⚠️ Limited | ✅ Flexible | ⚠️ Limited |

**Winner**: Approach A (or keep Current if not worth the effort)





