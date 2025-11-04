# Changes Applied to V6: Enhancing Design Creativity

## Summary

This document outlines all changes made to ACTUAL_PROMPTS_V5 to create a new version (V6) that addresses the regression in design creativity. The core issue was that the model was being too conservative and defaulting to minimal designs, not exploring the full creative potential of the brand token system.

## Problem Identified

After analyzing the test results from `last-output-testset/prompt-3-New Prompt 2.11-10.0.0.csv`, we identified:

1. **Over-reliance on "Sophisticated Minimal" framework**: The default framework was too restrictive, leading to safe but uninspiring designs
2. **Lack of creative exploration**: The workflow jumped directly from analysis to a single design solution without exploring alternatives
3. **Token rigidity**: The model was treating tokens as constraints rather than creative tools
4. **Overly analytical process**: The design brief focused on justification rather than exploration

## Solution Approach

**Core Philosophy**: Creativity doesn't come from breaking the token system rules, but from exploring the full expressive potential *within* those rules. The token palette is the set of paints—we need to teach the model to be a more adventurous artist with them.

---

## Files Modified

### 1. `/ACTUAL_PROMPTS_V5/systemPrompt/role.md`

**Changes Made**:
- Added emphasis on surprising and delighting users
- Reinforced that minimal direction is an **opportunity for creative excellence**, not a reason to play it safe
- Added language about exploring creative possibilities and pushing beyond generic interpretations

**Key Addition**:
> "Your mission is to surprise and delight users with components that are both stunning and functional. You don't settle for the first obvious solution—you explore creative possibilities and push beyond generic interpretations to deliver work that makes users say 'wow.'"

---

### 2. `/ACTUAL_PROMPTS_V5/systemPrompt/design-guidelines.md`

This file received the most significant updates:

#### A. Updated Design Decision Priority Hierarchy (Section 1.1)

**Changed**:
- Priority 4: "Sophisticated Defaults" → "Creative Defaults"
- New guidance: Default to creative, expressive choices that showcase the full potential of the token palette
- Lean towards Vibrant & Expressive framework unless the component clearly demands restraint

#### B. Renamed and Reframed Section 2: "The Sophisticated Default Aesthetic" → "The Creative Default Aesthetic"

**Before**: Pushed towards minimal, monochromatic designs
**After**: Encourages matching aesthetics to component potential

**Key Changes**:
- **Visual Profile Selection Strategy**: Now provides context-based guidance (consumer/B2B/luxury) instead of always defaulting to minimal
- **Default when unclear**: "Choose Vibrant or Dynamic over Minimal—demonstrate what's possible with the token palette"
- **Color Approach**: Changed from "default to monochromatic" to "embrace the full token palette"
- Added "Creative opportunity" framing for working within constraints

#### C. Added New Design Framework: "Vibrant & Expressive" (Section 4)

**Framework Position**: Designated as DEFAULT for creative exploration

**Key Features**:
- **Surface Ratio**: 70-20-10 (allows 20% colored surfaces vs. 5% in Sophisticated Minimal)
- **Token Strategy**: "Use the entire brand palette creatively"
- **Creative Opportunities**: Includes specific techniques like:
  - Layered backgrounds for depth
  - Color blocking for visual zones
  - Gradient-like effects through token layering
  - Interactive color shifts on hover
  - Accent combinations

**Pairs With Examples**: Provides 3 concrete pairing strategies (Bold & Modern, Playful & Light, Sophisticated & Colorful)

#### D. Updated Framework Selection Guide

**Before**: Sophisticated Minimal was default for "when no clear direction is given"
**After**: 
- Vibrant & Expressive is default when component has creative potential
- Added guidance: "Your job is to match the framework to the component's **potential**, not just its functional requirements"
- Reserve Sophisticated Minimal only for contexts that truly demand restraint

#### E. Updated "Key Decision Framework Across All Profiles" (Section 4)

**Changed**:
- Made questions less restrictive (e.g., "Use high-saturation tokens ONLY for actions" → "Identifies which tokens are neutral vs. vibrant")
- Updated Surface Ratio Principle to vary by framework
- Added framework-specific ratios:
  - Sophisticated Minimal: 85-95% / 5-10% / 0-5%
  - Elegant Modern: 85-95% / 10-15% / 0-5%
  - **Vibrant & Expressive: 70-80% / 15-25% / 5-10%** (NEW)

#### F. Completely Reframed Section 6: "Creative Anti-Patterns" → "Creative Patterns & Inspiration"

**Before**: Focused on what to AVOID with negative framing
**After**: Focused on what to EXPLORE with positive, actionable patterns

**New Structure**:
1. **Creative Exploration Questions**: 5 questions to guide brainstorming
2. **Creative Layout Patterns to EXPLORE**: Organized by category with specific techniques:
   - For Cards & Containers (5 patterns)
   - For Lists & Collections (4 patterns)
   - For Interactive Elements (4 patterns)
   - For Content Hierarchy (4 patterns)
   - For Spacing & Rhythm (3 patterns)
3. **Token Creativity Challenges**: 4 specific challenges that encourage creative token usage while staying within the system

**Example Pattern**:
- OLD: "[AVOID] Generic centered card with drop shadow"
- NEW: "**Asymmetric Grid**: Vary card widths/heights intentionally (e.g., 60/40 split, or staggered heights)"

#### G. Added Mandatory Creative Exploration Step to Workflow

**New Step 2: "Explore Creative Concepts"**

**Requirements**:
- Must write a `<creative-exploration>` section BEFORE the design brief
- Must generate 3 distinct creative concepts
- Each concept must include:
  - Name
  - Brief description (2-3 sentences)
  - Token strategy
  - Layout approach
  - Key visual hook
- Must select one concept and justify the choice
- At least one concept should be bold/expressive

**Format**:
```xml
<creative-exploration>
CONCEPT 1: [Name]
CONCEPT 2: [Name]
CONCEPT 3: [Name]
SELECTED CONCEPT: [Choice]
Reasoning: [Why this one?]
</creative-exploration>
```

**Purpose**: Forces divergent thinking before converging on a solution

#### H. Updated Design Brief Template (Step 3)

**Changes**:
- References Priority 4 as "Creative Defaults" instead of "Sophisticated Defaults"
- Added Vibrant & Expressive to framework list with [DEFAULT] marker
- Updated guidance: "Must match the selected concept from creative exploration"
- Changed "Minimal guidance provided" to "Minimal guidance provided - creative opportunity"
- Added instruction: "Explain why this framework was selected and how it delivers the 'wow' factor"

---

## Impact on Model Behavior

### Expected Behavioral Changes

1. **More Framework Diversity**:
   - Before: 80%+ components used Sophisticated Minimal
   - Expected: 50%+ components use Vibrant & Expressive or other creative frameworks

2. **Richer Token Usage**:
   - Before: Primarily base-1, base-2, accent-1 (3-4 tokens)
   - Expected: Full spectrum usage including accent-3, accent-4, shade-2 (6-8+ tokens)

3. **Creative Exploration**:
   - Before: Single design direction
   - Expected: 3 concepts explored, best one selected

4. **Visual Variety**:
   - Before: Similar layouts across different prompts
   - Expected: Diverse layouts using patterns from the "Creative Patterns & Inspiration" section

### What Stays the Same (Guardrails)

✅ All designs MUST still use tokens (no hardcoded colors)
✅ Technical constraints remain (no gradients, SSR compatibility, etc.)
✅ Accessibility requirements unchanged (WCAG contrast ratios)
✅ User explicit instructions still have Priority 1 (highest)
✅ Quality standards remain (Awwwards-level)

---

## Testing Recommendations

To evaluate the effectiveness of these changes:

1. **Run the same test prompts** from `last-output-testset` with the updated V6 prompt
2. **Compare metrics**:
   - Framework distribution (count how many use Vibrant & Expressive vs. Sophisticated Minimal)
   - Token variety (count unique tokens used per component)
   - Presence of creative exploration section
   - Visual diversity (subjective review of layouts)
3. **Sample 10-20 outputs** and rate them on:
   - Creativity (1-5)
   - Appropriate use of tokens (1-5)
   - "Wow" factor (1-5)
   - Technical correctness (1-5)

---

## Key Terminology Changes

| Old Term | New Term | Rationale |
|----------|----------|-----------|
| Sophisticated Defaults | Creative Defaults | Emphasizes exploration over restraint |
| The Sophisticated Default Aesthetic | The Creative Default Aesthetic | Reframes minimal direction as opportunity |
| Creative Anti-Patterns | Creative Patterns & Inspiration | Shifts from negative (avoid) to positive (explore) framing |
| DEFAULT: Sophisticated Minimal | DEFAULT: Vibrant & Expressive | Changes the starting point to encourage boldness |

---

## Philosophy Summary

**Before V6**: "When in doubt, be minimal and safe"
**After V6**: "When in doubt, be creative and bold (while staying within the token system)"

The token system is not a limitation—it's a creative constraint that, when embraced fully, enables sophisticated, brand-consistent design. The model should see tokens as a complete palette to paint with, not a small subset of safe colors to hide behind.

---

## Version

- **Previous Version**: ACTUAL_PROMPTS_V5
- **Current Version**: ACTUAL_PROMPTS_V6 (modifications to V5 files)
- **Date**: November 4, 2025
- **Primary Goal**: Enhance design creativity while maintaining brand system integrity

