# Changes Applied to ACTUAL_PROMPTS_V5

**Date**: November 2, 2025  
**Purpose**: Fix typography token override issues identified in test results analysis

---

## Summary of Changes

Based on analysis of 51 test examples, we identified critical violations where the model was overriding composite font tokens with explicit `font-weight`, `font-family`, and `font-size` declarations. This defeated the purpose of the token system.

### Key Violations Found:
- **65%** of examples used hardcoded `font-weight` after composite tokens
- **31%** used hardcoded `font-family` instead of tokens
- **25%** used raw `font-size` values instead of clamp() or tokens

---

## Files Modified

### 1. ✅ design-guidelines.md (Priority 1 - CRITICAL)

**Location**: Lines 84-113

**Changes**:
- Completely rewrote the "Typography: Font Selection & Pairing Principles" section
- Added 7 clear principles emphasizing composite token usage
- Added explicit "NEVER do this" and "Always do this" code examples
- Removed ambiguous language about "prefer weights 300-500"
- Added warning about never overriding composite token properties

**Key Addition**:
```markdown
**NEVER do this**:
```css
.text {
  font: var(--wst-paragraph-2-font);
  font-weight: 500;  /* ✗ WRONG - overrides token weight */
}
```

**Always do this**:
```css
.text {
  font: var(--wst-paragraph-2-font);  /* ✓ Trust the complete token */
}
```

---

### 2. ✅ css-variables-guidelines.md (Priority 3)

**Location**: After line 82 (new section added)

**Changes**:
- Added new section: "Typography Override Prevention"
- Provided comprehensive forbidden and correct patterns
- Explained WHY overriding tokens breaks the brand system
- Showed examples of when atomic tokens are appropriate

**Key Addition**:
```markdown
### Typography Override Prevention

**CRITICAL RULE**: When using composite font tokens, NEVER add separate font property declarations after them.

**Why this matters**: Overriding composite tokens defeats the brand token system. When a designer updates `--wst-paragraph-2-font`, your override blocks the update from reaching the element.
```

---

### 3. ✅ verification.md (Priority 4)

**Location**: Lines 54-61 (new section added)

**Changes**:
- Added dedicated "CSS - Typography" verification section
- Created 7 specific checkpoints for typography token usage
- Marked the critical override check with 🚨 emoji
- Placed before "Manifest" section for visibility

**Key Addition**:
```markdown
**CSS - Typography**:
- [ ] **🚨 CRITICAL: No font property overrides after composite tokens**
- [ ] Uses `font: var(--wst-*-font)` for typography (composite tokens preferred)
- [ ] If `font: var(--wst-*-font)` is used, NO subsequent `font-weight`, `font-size`, `font-family` on same selector
```

---

### 4. ✅ wix-component-example.md (Priority 5)

**Location**: Multiple sections updated

**Changes Made**:

#### Design Brief (Lines 27-62):
- Updated to show proper Strategic Framework structure
- Added complete Color Palette Analysis with token reasoning
- Added Typography section showing composite token usage
- Added explicit note: "All composite tokens used—no font property overrides"
- Enhanced Design Rationale to explain token system benefits

#### CSS Section (Lines 183-217):
- **Before**: 
  ```css
  .feature-card__title {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 500;
    line-height: 1.3;
    color: #1F2937;
  }
  ```
- **After**:
  ```css
  .feature-card__title {
    margin: 0;
    font: var(--wst-heading-4-font);
    color: var(--wst-heading-4-color);
  }
  ```

- Applied same fix to `.feature-card__description` and `.feature-card__button`

#### Manifest Section (Lines 347-413):
- Changed title cssProperties from individual properties to composite:
  ```json
  "cssProperties": {
    "font": {
      "displayName": "Title Font",
      "defaultValue": "var(--wst-heading-4-font)"
    },
    "color": {
      "displayName": "Title Color",
      "defaultValue": "var(--wst-heading-4-color)"
    }
  }
  ```
- Applied same pattern to description and button elements
- Removed individual `fontSize`, `fontWeight`, `lineHeight` properties
- Used composite `font` property instead

---

## Impact Assessment

### Before Changes:
```css
/* Typical output from V5 (WRONG) */
.element {
  font: var(--wst-paragraph-2-font);  /* Sets all properties */
  font-weight: 500;                   /* ✗ Overrides the token weight */
  font-family: system-ui, sans-serif; /* ✗ Overrides the token family */
}
```

### After Changes:
```css
/* Expected output from V5+ (CORRECT) */
.element {
  font: var(--wst-paragraph-2-font);  /* ✓ Trust the complete token */
}

/* If different weight needed */
.emphasis {
  font: var(--wst-heading-4-font);  /* ✓ Use different token */
}
```

---

## Expected Results

### Quantitative Improvements:
- **Font-weight overrides**: Drop from 65% → <10%
- **Font-family hardcoding**: Drop from 31% → <5%
- **Raw font-size usage**: Drop from 25% → <5%
- **Token system integrity**: Increase to 95%+

### Qualitative Improvements:
1. **Brand Consistency**: When designers update tokens, all components update automatically
2. **Maintainability**: No font property overrides to track and fix
3. **System Understanding**: Model learns to trust the token system
4. **Example Quality**: Reference example now demonstrates perfect token usage

---

## Testing Recommendations

### Immediate Testing:
1. Regenerate 10-20 examples from the original test set
2. Run the analysis script to check for violations
3. Verify composite token usage without overrides

### Success Criteria:
- ✅ Zero instances of `font: var(--wst-*); font-weight: *;` pattern
- ✅ Zero hardcoded font-family stacks (except explicit user requests)
- ✅ All typography uses composite tokens by default
- ✅ Atomic tokens only used for custom combinations

---

## Maintenance Notes

### What to Watch For:
1. **New ambiguous language** being added that suggests setting font properties
2. **Examples that show overrides** in documentation
3. **Verification checklist drift** where typography checks get removed

### Future Enhancements:
1. Consider adding shadow tokens to reduce `rgba()` usage in shadows
2. Add more composite tokens for common combinations
3. Create a "Common Token Patterns" quick reference guide

---

## Rollback Plan (if needed)

If these changes cause unexpected issues:

1. **design-guidelines.md**: Revert to commit before changes (lines 84-113)
2. **css-variables-guidelines.md**: Remove "Typography Override Prevention" section
3. **verification.md**: Remove "CSS - Typography" section (lines 54-61)
4. **wix-component-example.md**: Revert to previous version with individual font properties

All changes are localized to typography guidance and can be independently reverted.

---

## Conclusion

These changes directly address the #1 violation in the V5 test results. The fixes are:
- **Targeted**: Only affect typography token usage
- **Clear**: Use explicit examples and forbidden patterns
- **Comprehensive**: Cover guidelines, examples, and verification
- **Measurable**: Can track improvement through automated testing

Expected improvement: Token system integrity from 35% → 95%+


