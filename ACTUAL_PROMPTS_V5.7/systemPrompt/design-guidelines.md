# Design Guidelines: Technical Implementation Standards

This document outlines the technical composition principles and motion standards for implementing Wix custom components. These principles ensure components are structurally sound, performant, and maintain high usability standards.

---

## COMPONENT COMPOSITION PRINCIPLES

These principles guide how you structure and compose components to achieve clarity, usability, and visual excellence within the token system.

### 1. Spacing Intelligence

**Spacing creates hierarchy, not just separation.** Use a systematic approach to spacing that communicates relationships and importance.

**Spacing Roles**:
- **Padding** (Internal breathing room): Space within elements (cards, buttons, containers) that creates comfort and prevents cramped layouts
- **Gaps** (Relationship indicator): Space between related elements that shows they belong together. Consistent gaps = visual unity
- **Margins** (Section separation): Space around major layout blocks that creates clear boundaries
- **Whitespace** (Focus amplifier): Empty space that isn't padding, gaps, or margins. Strategic whitespace = premium feel and visual calm

**Spacing Scale System**:
Establish a consistent multiplier system (not random values):
- **Tight spacing** (8px, 12px, 16px): For closely related content, compact UI, dense data
- **Comfortable spacing** (20px, 24px, 32px): For standard layouts, general content, balanced designs
- **Generous spacing** (40px, 48px, 64px+): For premium feel, emphasis, hero content, breathing room

**Decision Framework**:
- Elements with **high relationship** → Small gap (8-12px)
- Elements in **same category** → Medium gap (16-24px)
- Elements in **different sections** → Large gap (32px+)
- **More whitespace** = more sophisticated feel (but verify component isn't sparse/empty)

### 2. Visual Hierarchy Through Alignment

**Alignment is a design decision, not a default.** Every alignment choice should support content comprehension and visual flow.

**Core Alignment Principles**:
1. **Proximity** → Group related elements together visually. Reduce gaps between related items, increase gaps between unrelated items
2. **Consistency** → Use the same alignment pattern for similar content types across the component
3. **Balance** → Distribute visual weight evenly. Avoid one side feeling heavy while the other is empty
4. **Scanability** → Alignment should guide the eye naturally through the content hierarchy

**Text Alignment Strategy**:
- **Left-aligned**: Default for body text, descriptions, lists (natural reading pattern). Creates strong left edge for eye tracking
- **Center-aligned**: Headlines, CTAs, hero content, single-line emphasis. Never for multi-line body text (hard to read)
- **Right-aligned**: Use sparingly—timestamps, metadata, numerical data. Can create tension or formality

**Component Alignment**:
- **Top-aligned**: Most natural for cards, lists, standard content flow
- **Center-aligned**: Buttons within containers, icons with text, vertically centered modals
- **Stretch/Fill**: Form inputs, full-width CTAs, container-filling elements

### 3. Structural Layout Patterns for Components

Choose a layout pattern that best serves the component's purpose. Don't default to the first structure that comes to mind.

**Single-Column Flow**:
- **When**: Simple, linear content (single CTA, hero message, form with one input per row)
- **Token Strategy**: Maximum breathing room. Use generous vertical spacing (32-48px gaps)
- **Best for**: Focused actions, minimal complexity, mobile-first designs

**Two-Column Split**:
- **When**: Contrasting content (image + text, primary + secondary info)
- **Token Strategy**: Balance weight—if one side is visually heavier (image), use more whitespace on the other
- **Best for**: Product cards, profile displays, content-media pairs

**Grid/Multi-Column**:
- **When**: Repeating items of equal importance (card lists, galleries, feature grids)
- **Token Strategy**: Consistent gaps between all items. Use base-1 backgrounds with shade-1 cards for subtle depth
- **Best for**: Collections, catalogs, dashboards

**Stacked with Emphasis**:
- **When**: Primary content with supporting metadata (pricing card, product detail)
- **Token Strategy**: Large top element (accent-1 for CTA), smaller secondary elements (shade-3 for meta)
- **Best for**: Conversion-focused components, pricing, announcements

### 4. Visual Treatment Consistency

**All similar UI elements must share the same visual DNA.** This creates intuitive, learnable interfaces.

**Define and Maintain Across Component**:

#### Corner Radius Strategy

Choose corner radius based on Visual Profile and Design Style. Maintain consistency across similar element types.

**Sharp Corners (0-4px)**
- **Use for**: Editorial, Luxury, Data-focused, or Technical contexts
- **Values**: 0px (pure sharp), 2px (subtle), 4px (refined)
- **Typical breakdown**: Buttons 0-2px, Cards 0-4px, Inputs 2-4px

**Moderate Rounded (6-12px)** [DEFAULT for sophisticated designs]
- **Use for**: Contemporary, Professional, Modern, Minimalist contexts
- **Values**: 6px, 8px, 10px, 12px
- **Typical breakdown**: Buttons 6-8px, Cards 8-12px, Inputs 6-8px

**Consistency Rule**: All buttons must share the same radius, all cards must share the same radius, all inputs must share the same radius within a single component.

#### Shadow System

Define 2-3 shadow levels maximum:
- **Level 1 (Subtle)**: `0 1px 2px rgba(0,0,0,0.05)` for cards at rest
- **Level 2 (Elevated)**: `0 4px 12px rgba(0,0,0,0.08)` for hover states
- **Level 3 (Floating)**: `0 8px 24px rgba(0,0,0,0.12)` for modals, dropdowns

#### Border Treatment
- If using borders, keep weight consistent (all 1px or all 2px)
- Use same token (e.g., `--wst-shade-2-color`) for all structural borders
- Avoid mixing border styles within a component

#### Element Heights
- All primary buttons same height (e.g., 40-45px)
- All secondary buttons same height (e.g., 36-40px)
- All inputs consistent height (e.g., 40px)

### 5. Typography as Structure

**Typography creates hierarchy without color.** Use size, weight, and spacing to organize information.

**3-Level Hierarchy Rule**:
Every component should have max 3 levels of typographic hierarchy:
- **Primary** (Heading): Largest, commands attention (`--wst-heading-3-font` or `--wst-heading-4-font`)
- **Secondary** (Body): Standard reading size (`--wst-paragraph-2-font`)
- **Tertiary** (Meta): Smallest, supporting info (`--wst-paragraph-3-font` or smaller `--wst-paragraph-2-font`)

**Legibility Rules**:
- **Avoid orphans**: No single word on a final line of a paragraph
- **No hyphenation**: Keep words whole
- **Line length**: 45-75 characters for body text (optimal readability)
- **Line height**: 1.5-1.7 for body text, 1.1-1.3 for headings
- **Text alignment**: See "Visual Hierarchy Through Alignment" section for comprehensive text alignment guidance

### 6. Creative Patterns & Inspiration

**Push beyond the obvious.** Award-winning design comes from exploring multiple creative directions before settling on the best one.

**Creative Exploration Questions** (Answer these during your design brainstorming):
1. "What are 3 different layout approaches for this component?" → Sketch out alternatives mentally before choosing
2. "How can I use the brand tokens in an unexpected way?" → Look for creative applications of accent tints and shades
3. "What would make a user say 'wow' when they see this?" → Aim for delight, not just function
4. "How can proportion and scale create visual interest?" → Vary sizes, use asymmetry intentionally
5. "What interaction details would make this feel polished?" → Hover states, transitions, micro-animations

**Creative Layout Patterns to EXPLORE**:

**For Cards & Containers**:
- **Asymmetric Grid**: Vary card widths/heights intentionally (e.g., 60/40 split, or staggered heights)
- **Overlapping Elements**: Layer elements slightly with z-index for depth (e.g., image overlapping card border)
- **Accent Borders**: Use thick accent-colored borders (3-4px) on one side for visual punch
- **Color Blocking**: Give cards distinct colored backgrounds using accent-3 or accent-4, not just white
- **Typography-First Cards**: Make the headline massive and let it be the visual anchor, minimize other elements

**For Lists & Collections**:
- **Alternating Styles**: Vary between bordered and shadow-based cards within the same list
- **Spotlight Pattern**: Make every 3rd item larger or differently styled to break monotony
- **Color Rhythm**: Alternate background colors (base-1, accent-4, base-1) for visual variety
- **Horizontal Scroll**: For galleries, use a fluid horizontal scroll with varied item widths

**For Interactive Elements**:
- **Split Buttons**: Divide buttons into two interactive zones with different colors (e.g., primary action + dropdown)
- **Icon Integration**: Place icons in colored circles/squares (accent-4 background) instead of inline
- **Progress Indicators**: Use accent-colored fills that transition through tints (accent-1 → accent-2 → accent-3)
- **Toggle Delight**: Make toggles/switches large and use colored backgrounds with smooth transitions

**For Content Hierarchy**:
- **Large Numbers**: Make statistics/metrics huge (3-4x normal text size) with accent colors
- **Quote Callouts**: Use thick accent-1 border on left (4px) + accent-4 background for emphasis
- **Section Dividers**: Instead of lines, use generous whitespace (64px+) or subtle accent-4 color blocks
- **Label Badges**: Put labels/tags in small colored pills (accent-3 or accent-4 backgrounds, tight padding)

**For Spacing & Rhythm**:
- **Generous Padding**: Don't be shy—use 40-64px padding for hero sections to create luxury feel
- **Tight Clustering**: Group related items very close (4-8px gap) then add huge gaps (40px+) between groups
- **Asymmetric Margins**: Use different top/bottom margins (24px top, 40px bottom) to create visual flow

**Token Creativity Challenges**:
- "How can I use accent-4 as more than just a subtle background?" → Try it for large content blocks, alternating rows, info panels
- "Can I use accent-1 for something other than a button?" → Try colored underlines for links, colored icons, accent borders, status indicators
- "How can shade tokens create depth?" → Layer shade-1 containers on base-1 backgrounds, use shade-2 for hover states
- "What if I combined multiple accent tints in one component?" → Create visual zones with accent-4 + accent-3 for hierarchy

**Remember**: These patterns work within the token system. Creativity comes from *how* you apply the tokens, not from breaking the rules.

### 7. Token-Based Visual Treatment Patterns

**Use tokens to create sophisticated depth and distinction without introducing new colors.**

**Depth Through Layering** (Token + Opacity):
```css
/* Base surface */
background: var(--wst-base-1-color);

/* Elevated surface */
background: var(--wst-shade-1-color);

/* Interactive surface hover */
background: var(--wst-shade-2-color);
```

**Emphasis Through Saturation Contrast**:
- Neutral backgrounds (base/shade tokens) make saturated accents (accent-1) feel powerful
- Use accent sparingly—5-10% of visual area for maximum impact

**Borders vs. Shadows vs. Background Shifts**:
- **Borders**: Use when component needs clear containment (forms, cards, data tables)
- **Shadows**: Use when component needs elevation feeling (modals, dropdowns, hover states)
- **Background shifts**: Use when component needs subtle distinction without hard edges (secondary cards, info panels)

### 8. Responsive Layout Design

**Components live in user-resizable bounding boxes within varying viewports.** Must respond to: Container (300px-1200px) AND Viewport (375px-1920px).

#### Layered Responsiveness Strategy

| What | Responds To | Pattern |
|------|-------------|---------|
| Layout structure | Container | Grid auto-fit, flex-wrap |
| Typography | Viewport | Clamp |
| Spacing | Both | Fixed or tight clamp |
| Root element | Container | width: 100% |

#### Component Type Decision Tree

**Most Components** (forms, cards, galleries):
- Root: width: 100% (fill container)
- Layout: Grid auto-fit or flex-wrap
- Spacing: Fixed (1.5rem)

**Overlays** (tooltips, modals):
- Root: Can have max-width
- Layout: Fixed dimensions

**Content with readability** (articles, heroes):
- Root: width: 100%
- Inner wrapper: Can have max-width

*See [Component CSS Guidelines](component-css-guidelines.md) for implementation patterns.*

---

## STANDARD MOTION SYSTEM

All animations and transitions must be smooth, purposeful, and implemented with pure CSS. They must follow these rules to ensure a sleek, high-performance, and library-free result.

### 1. Default Content Appearance Transition
For any component or content that appears on screen (e.g., modals, accordion panels, tab content), it **MUST** use this standard, non-blocking CSS animation. This creates a consistent and sophisticated reveal effect.

```css
@keyframes contentAppear {
  from {
    opacity: 0;
    transform: translateY(10px); /* Default for vertical reveals */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Example Usage */
.appearing-element {
  animation: contentAppear 450ms ease-out forwards;
}
```
- For horizontal reveals (e.g., sidebars, horizontal tabs), use `translateX(-15px)`.

### 2. Timing & Easing Rules
Consistency in timing and easing is crucial for a professional feel. Adhere to these defaults:

| Interaction Type      | Duration      | Easing Function |
| --------------------- | ------------- | --------------- |
| Micro-interactions (hovers) | 150-200ms     | `ease-out`      |
| UI Controls (active states) | 250ms         | `ease-out`      |
| Content Reveals (`contentAppear`) | 400-500ms     | `ease-out`      |

### 3. Core Performance & Accessibility Principles
-   **GPU-Acceleration**: All motion **MUST** only use `transform` and `opacity`. Animating layout properties like `width`, `height`, `margin`, or `left`/`top` is strictly forbidden as it leads to poor performance.
-   **Accessibility**: All animations **MUST** respect the user's motion preferences. Use the `prefers-reduced-motion` media query to disable or reduce animations for users who need it.
-   **No Looping**: Animations must execute once per interaction and should not loop, except for explicit loading states (e.g., spinners).
