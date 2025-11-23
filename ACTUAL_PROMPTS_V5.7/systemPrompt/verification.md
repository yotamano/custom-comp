## VERIFICATION

Before outputting any component, you MUST verify its quality against this checklist.

1. User's request is fulfilled
2. All components of the generated code (React component, CSS styles, and component manifest/metadata) are consistent with each other, with no discrepancies
3. All guidelines under <component-assets-guidelines />, <component-css-guidelines /> and <component-react-guidelines /> are implemented
4. If a runtime brand palette is provided (base + aliases), it may be used for reasoning (contrast/pairings/overlays), but the output MUST NOT contain any raw hex/rgb/hsl/named colors from it; only tokens (`var(--wst-...)`), `transparent`, or `currentColor` are allowed.

5. If the user explicitly requested a color:
   - If a sufficiently similar brand token exists (per <css-variables-guidelines /> similarity guidance), a token is used.
   - If no sufficiently similar token exists, a literal is used for that specific property/element only, and the literal exactly matches in both CSS and manifest `defaultValue`.
   - No other literals appear elsewhere; all other colors remain token-only.

6. If the user explicitly requested a font:
   - If it is a web-safe/system family, a literal font-family stack is used only for that element/property and is exactly mirrored in the manifest defaultValue.
   - Otherwise, typography tokens are used (no raw font values elsewhere).

7. Contrast/legibility: No same/near-same text and background colors; overlays do not obscure text; body ≥ 4.5:1, large/UI ≥ 3:1. On hover, if background changes, adjust text color accordingly (accent → base-1, light surface → base-2).

### RESPONSIVE LAYOUT VALIDATION

Verify your component works in these scenarios:

#### Critical Test: Desktop + Narrow
- Viewport: 1920px, Container: 300px
- Component should look comfortable, not cramped
- Check: Spacing isn't excessive (avoid 40px+ padding in 300px container)

#### 4-Scenario Check
1. ✓ Mobile/Narrow (375px/340px) - Single column, minimal spacing
2. ✓ **Desktop/Narrow (1920px/300px)** - Still comfortable (critical!)
3. ✓ Desktop/Wide (1920px/1200px) - Multi-column, generous spacing
4. ✓ Tablet (768px/700px) - 2-3 columns

#### Layout Validation
- ✓ Root element has `width: 100%`
- ✓ No `max-width` with `margin: 0 auto` on root (unless overlay component)
- ✓ Uses container-responsive patterns (grid auto-fit OR flex-wrap)

#### Spacing Validation
- ✓ Fixed spacing OR tight clamp only (no wide ranges)
- ✓ If using clamp: (max - min) / min ≤ 0.5

*See [Component CSS Guidelines](component-css-guidelines.md) for implementation patterns.*

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
- [ ] **🚨 CRITICAL: ZERO GRADIENTS - No linear-gradient, radial-gradient, conic-gradient, or any gradient functions anywhere in CSS**
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

**CSS - Typography**:
- [ ] **🚨 CRITICAL: No font property overrides after composite tokens**
- [ ] Uses `font: var(--wst-*-font)` for typography (composite tokens preferred)
- [ ] If `font: var(--wst-*-font)` is used, NO subsequent `font-weight`, `font-size`, `font-family` on same selector
- [ ] If custom font combinations needed, uses atomic tokens: `var(--wst-*-font-weight)`
- [ ] No raw font-family stacks (except explicit user web-safe font exception)
- [ ] No raw font-weight numbers (400, 500, 600) unless composed from atomic tokens
- [ ] No raw font-size values (px/rem) unless in clamp() or composed from atomic tokens

**Manifest**:
- [ ] All editable content exposed as data
- [ ] All styleable properties exposed as cssProperties
- [ ] **CRITICAL: defaultValue types match dataType (number not "number", true not "true")**
- [ ] **CRITICAL: No defaultValue inside arrayItems fields (only in React props)**
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