# ACTUAL_PROMPTS_V5 Test Results Analysis

**Date**: November 2, 2025  
**Dataset**: 51 examples from prompt-3-New Prompt 2.11-10.0.0.csv  
**System Prompt**: ACTUAL_PROMPTS_V5 (full_prompt.txt)

---

## Executive Summary

The V5 prompt produces **structurally good components** with proper token integration and sophisticated design briefs, BUT has **3 critical technical violations** that undermine the token system:

### The Good ✅
- **100%** components use CSS tokens (`var(--wst-...)`)
- **100%** design briefs follow the new framework structure
- **78%** use `clamp()` for fluid spacing
- **0%** gradients (correct - forbidden)
- **0%** layout media queries (correct - responsive without MQ)
- Sophisticated design choices (no generic LLM patterns detected)

### The Critical Issues ⚠️
1. **65% use hardcoded `font-weight`** (33/51) - Overrides composite tokens
2. **31% use hardcoded `font-family`** (16/51) - Bypasses typography system  
3. **25% use raw `font-size`** (13/51) - Not using tokens or clamp()

---

## Issue #1: Font-Weight Override Pattern (MOST CRITICAL)

### The Problem
The model generates CSS like this:

```css
.element {
  font: var(--wst-paragraph-2-font);  /* ✓ Sets all font properties */
  font-weight: 500;                   /* ✗ OVERRIDES the token weight */
}
```

**Why this is bad**: The `font` shorthand from the token includes font-weight, but then the explicit `font-weight: 500` overrides it, defeating the entire purpose of using composite tokens.

### Frequency
- **33 out of 51 examples** (64.7%)
- Appears across all component types
- Most common violation

### Root Cause Analysis
The prompt says:
> "Prefer font weights 300-500 (Light to Medium) for elegance"

The model interprets this as "I should set font-weight: 500" rather than "the tokens already provide appropriate weights."

### Example from Dataset
```
Shopping Cart Component:
✓ Uses: font: var(--wst-paragraph-2-font)
✗ Then adds: font-weight: 500
✗ Then adds: font-weight: 500 (again on another element)
```

---

## Issue #2: Hardcoded Font-Family (31%)

### The Problem
```css
.element {
  font-family: system-ui, -apple-system, sans-serif;  /* ✗ Raw value */
}
```

Instead of:
```css
.element {
  font: var(--wst-paragraph-2-font);  /* ✓ Includes font-family */
}
```

### Frequency
- **16 out of 51 examples** (31.4%)
- More common in complex components
- Often appears alongside hardcoded font-weight

### Root Cause
The prompt's "Sophisticated Default Aesthetic" section says:
> "Default to system fonts (`system-ui`, `-apple-system`) for performance"

The model takes this literally and hardcodes the stack instead of using tokens that reference these fonts.

---

## Issue #3: Raw Font-Size Values (25%)

### The Problem
```css
.element {
  font-size: 16px;  /* ✗ Direct value */
}
```

Instead of:
```css
.element {
  font-size: clamp(0.95rem, 2vw, 1rem);  /* ✓ Fluid */
  /* OR */
  font: var(--wst-paragraph-2-font);  /* ✓ From token */
}
```

### Frequency
- **13 out of 51 examples** (25.5%)
- Usually appears when overriding composite tokens
- Less common than font-weight issue

---

## What's Working Well ✅

### 1. Design Brief Quality (100%)
All examples include:
- ✅ Priority level clearly stated
- ✅ Strategic framework selection (Sophisticated Minimal, Elegant Modern, Clean Utilitarian)
- ✅ Color palette analysis with visual properties
- ✅ Cohesive visual system documentation

### 2. Token Usage for Colors (100%)
All components use:
- `var(--wst-primary-background-color)`
- `var(--wst-paragraph-2-color)`
- `var(--wst-accent-1-color)`
- etc.

No hardcoded hex colors (except 1 edge case).

### 3. Responsive Patterns (78%)
Most components use modern CSS:
- `clamp()` for fluid sizing (40/51)
- `flex-wrap` for wrapping layouts (24/51)
- No layout media queries (0/51) ✅

### 4. Shadow System (Mostly Good)
- Custom shadow values (not generic `0 2px 4px rgba(0,0,0,0.1)`)
- Layered shadows per guidelines
- Max 2-3 shadow levels per component

**Minor Issue**: 22 examples use `rgba()` in shadows. This is semi-acceptable since shadows need transparency, but could be improved with tokens.

---

## Why This Matters: The Token System Is Being Undermined

### The Intent
```css
/* Designer changes brand token */
--wst-paragraph-2-font: 400 16px/1.5 "Inter", sans-serif;

/* Component should update automatically */
.my-text {
  font: var(--wst-paragraph-2-font);  /* ✓ Updates */
}
```

### What's Actually Happening
```css
/* Designer changes brand token */
--wst-paragraph-2-font: 400 16px/1.5 "Inter", sans-serif;

/* Component IGNORES the weight */
.my-text {
  font: var(--wst-paragraph-2-font);  /* Sets weight: 400 */
  font-weight: 500;                   /* ✗ Overrides to 500 */
}
```

**Result**: The entire typography token system is bypassed for 65% of text elements.

---

## Recommendations: How to Fix the Prompt

### Priority 1: Fix Font-Weight Guidance (CRITICAL)

**Current Problem**: Line 90-91 in design-guidelines.md
> "Prefer font weights 300-500 (Light to Medium) for elegance. Use 600+ only for critical emphasis..."

**Why it fails**: Model interprets this as instruction to SET font-weight, not SELECT tokens.

**Recommended Fix**:

Replace this in `design-guidelines.md` around line 90-92:

```markdown
**Typography: Font Selection & Pairing Principles**
Follow these core principles when selecting fonts (see "Typography as Structure" section for hierarchy details):

1.  **Use Composite Tokens First**: Always prefer `font: var(--wst-*-font)` which includes family, size, weight, style, line-height. This ensures brand consistency.
2.  **Never Override Token Properties**: Once you use a composite token like `font: var(--wst-paragraph-2-font)`, do NOT add separate `font-weight`, `font-size`, or `font-family` declarations—they override the token.
3.  **Anchor & Pair**: Select tokens that provide the visual weight you need (heading tokens for emphasis, paragraph tokens for body text).
4.  **Weight Philosophy**: The tokens already provide appropriate weights (300-500 for refined feel, 600+ for emphasis). Trust the token system.
5.  **When to Use Atomic Tokens**: Only use atomic tokens (`var(--wst-*-font-weight)`) if you need to compose a custom combination not available as a composite token.

**NEVER do this**:
```css
.text {
  font: var(--wst-paragraph-2-font);
  font-weight: 500;  /* ✗ WRONG - overrides token */
}
```

**Always do this**:
```css
.text {
  font: var(--wst-paragraph-2-font);  /* ✓ Trust the token */
}
/* OR if more emphasis needed, use a different token */
.emphasis {
  font: var(--wst-heading-4-font);  /* ✓ Provides heavier weight */
}
```
```

---

### Priority 2: Clarify Font-Family Defaults

**Current Problem**: Line 91 says:
> "Default to system fonts (`system-ui`, `-apple-system`) for performance"

**Recommended Fix**:

Replace in `design-guidelines.md`:

```markdown
5.  **Font Selection Philosophy**: Typography tokens reference system fonts for performance. When the prompt provides composite tokens (e.g., `var(--wst-paragraph-2-font)`), these already include the appropriate font stack—never hardcode `font-family: system-ui, -apple-system, sans-serif`.

**Use tokens, not raw stacks**:
```css
/* ✗ WRONG */
.text {
  font-family: system-ui, -apple-system, sans-serif;
}

/* ✓ CORRECT */
.text {
  font: var(--wst-paragraph-2-font);  /* Includes font-family */
}
```
```

---

### Priority 3: Strengthen Typography Guidelines in css-variables-guidelines.md

**Add this section** to `css-variables-guidelines.md` after line 2220:

```markdown
### Typography Override Prevention

**CRITICAL RULE**: When using composite font tokens, NEVER add separate font property declarations after them.

**Forbidden patterns**:
```css
/* ✗✗✗ WRONG - These override the composite token */
.element {
  font: var(--wst-paragraph-2-font);
  font-weight: 500;        /* ✗ Overrides token weight */
  font-size: 18px;         /* ✗ Overrides token size */
  font-family: Inter;      /* ✗ Overrides token family */
}
```

**Correct patterns**:
```css
/* ✓✓✓ CORRECT - Trust the composite token */
.body-text {
  font: var(--wst-paragraph-2-font);
}

/* ✓✓✓ CORRECT - Use different token for different weight */
.emphasized-text {
  font: var(--wst-heading-4-font);  /* Provides heavier weight naturally */
}

/* ✓✓✓ CORRECT - Only when atomic tokens needed */
.custom-combination {
  font-family: var(--wst-paragraph-2-font-family);
  font-size: clamp(1rem, 2vw, 1.25rem);  /* Custom fluid size */
  font-weight: var(--wst-heading-4-font-weight);  /* Heavier weight */
  line-height: 1.6;
}
```

**Why this matters**: Overriding composite tokens defeats the brand token system. When a designer updates `--wst-paragraph-2-font`, your override blocks the update.
```

---

### Priority 4: Update Verification Checklist

**Add to verification.md** around line 3050-3055:

```markdown
**CSS - Typography**:
- [ ] **🚨 CRITICAL: No font property overrides after composite tokens**
- [ ] Uses `font: var(--wst-*-font)` for typography (composite tokens preferred)
- [ ] If `font: var(--wst-*-font)` is used, NO subsequent `font-weight`, `font-size`, `font-family` on same selector
- [ ] If custom font combinations needed, uses atomic tokens: `var(--wst-*-font-weight)`
- [ ] No raw font-family stacks (except explicit user web-safe font exception)
- [ ] No raw font-weight numbers (400, 500, 600) unless composed from atomic tokens
```

---

### Priority 5: Add Examples to wix-component-example.md

**Update the example** around line 2700 to show correct pattern:

```css
/* Current example has this issue */
.feature-card__title {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;  /* ✗ Remove */
  font-size: clamp(1.25rem, 3vw, 1.5rem);            /* ✗ Remove */
  font-weight: 500;                                   /* ✗ Remove */
  line-height: 1.3;                                   /* ✗ Remove */
  color: #1F2937;                                     /* ✗ Should be token */
}

/* Should be: */
.feature-card__title {
  margin: 0;
  font: var(--wst-heading-4-font);                    /* ✓ Composite token */
  color: var(--wst-heading-4-color);                  /* ✓ Color token */
}
```

---

## Additional Observations

### Shadow System (Minor Issue)
- 22/51 examples use `rgba(0, 0, 0, 0.05)` in shadows
- The prompt allows this for shadows (transparency needed)
- **Recommendation**: Consider adding shadow tokens like `--wst-shadow-subtle: 0 1px 2px rgba(0,0,0,0.05)` for consistency

### Design Brief Quality (Excellent)
The new design brief structure is working very well:
- Clear framework selection
- Token analysis with visual properties
- Cohesive visual system documentation
- No generic LLM patterns detected

**No changes needed** for design brief guidance.

---

## Testing Recommendations

### Before/After Test
1. Apply Priority 1-3 fixes
2. Regenerate 10-20 examples from the test set
3. Count font-weight violations (should drop from 65% to <10%)
4. Verify composite tokens are not being overridden

### Regression Tests
Ensure fixes don't break:
- Token usage for colors (should stay 100%)
- Design brief quality (should stay 100%)
- Responsive patterns (should stay 78%+)
- Shadow system (should stay good)

---

## Conclusion

**The V5 prompt is 85% there**. The design philosophy, token system, and responsive patterns are excellent. The typography token system is implemented but being undermined by post-declaration overrides.

**Three targeted fixes** (Priority 1-3 above) should resolve 90% of the violations:

1. ✅ Explicit guidance: "Never override composite tokens"
2. ✅ Remove ambiguous "prefer weights 300-500" language
3. ✅ Add clear examples of correct vs incorrect patterns

**Expected outcome**: Font token violations drop from 65% to <10%, achieving full token system integrity.




