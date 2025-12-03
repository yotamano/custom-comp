# Design Guidelines

## 1. Spacing as Communication

Spacing communicates relationships and hierarchy—not decoration.

**Semantic Roles:**
- **Padding**: Internal breathing room. Prevents cramped layouts.
- **Gap**: Relationship indicator. Consistent gaps = visual unity.
- **Whitespace**: Focus amplifier. Strategic emptiness = premium feel.

**Spacing Scale:**
| Relationship | Value | Use Case |
|---|---|---|
| Tight (icon + label) | 0.25-0.5rem (4-8px) | Clustering related items |
| Same category | 1-1.5rem (16-24px) | Card sections, form fields |
| Different sections | 2-3rem (32-48px) | Major content blocks |
| Emphasis/Drama | 4rem+ (64px+) | Hero content, luxury feel |

**Generous Whitespace Examples:** 1.5rem/24px, 2rem/32px, 2.5rem/40px create sophistication and clarity. Design clean, spacious layouts that breathe.

*Ask: "What relationship am I expressing with this space?"*

---

## 2. Alignment as Intent

Every alignment choice must support comprehension and flow—never default.

**Principles:** Proximity (group related), Consistency (same pattern for same type), Balance (distribute visual weight), Scanability (guide the eye).

**Quick Reference:**
| Element Type | Horizontal | Vertical |
|---|---|---|
| Body text, lists | Left | Top |
| Headlines, CTAs | Center | Center |
| Metadata, timestamps | Right | — |
| Form inputs | Stretch | — |

*Ask: "Does this alignment guide the eye or fight it?"*

---

## 3. Layout Patterns

Choose the pattern that serves the component's purpose—don't default to the first idea.

| Pattern | When to Use | Spacing Strategy |
|---|---|---|
| **Single-Column** | Simple, focused (hero, single CTA) | Generous vertical gaps (2-3rem) |
| **Two-Column Split** | Contrasting content (image + text) | Balance weight with whitespace |
| **Grid/Multi-Column** | Repeating items (galleries, cards) | Consistent gaps, subtle depth |
| **Stacked + Emphasis** | Primary + metadata (pricing) | Large top element, smaller secondary |

*Ask: "What are 3 different layout approaches for this?" → Sketch mentally before choosing.*

---

## 4. Visual Consistency

All similar elements must share the same visual DNA.

**Corner Radius:**
- Sharp (0-4px): Editorial, Luxury, Technical
- Rounded (6-12px): Contemporary, Professional [DEFAULT]
- *Rule: All buttons same radius, all cards same radius, all inputs same radius.*

**Shadow Levels (max 3):**
- Rest: `0 1px 2px rgba(0,0,0,0.05)`
- Hover: `0 4px 12px rgba(0,0,0,0.08)`
- Floating: `0 8px 24px rgba(0,0,0,0.12)`

**Borders:** Consistent weight (all 1px or all 2px). Don't mix styles.

**Element Heights:** All primary buttons same height, all inputs same height.

---

## 5. Color Strategy

Color creates hierarchy, zones, and rhythm—not just decoration.

**Token Usage:**
- **Backgrounds**: Use accent tints (accent-3, accent-4) for section backgrounds, base-1 for primary
- **Depth**: Mid-tone shades for layering, subtle background shifts for distinction
- **Emphasis**: Vibrant accents (accent-1, accent-2) for CTAs, highlights, focus states
- **Text**: High contrast for readability. Primary on base, secondary with reduced opacity or shade

**Principles:**
- Embrace the full palette—don't limit to monochromatic unless context demands it
- Create visual interest through color variety
- Use color purposefully for hierarchy and zones, not decoration
- Ensure sufficient contrast (WCAG AA minimum)

---

## 6. Typography as Structure

Typography creates hierarchy without relying on color.

**Font Selection & Pairing Principles:**
1. **Establish Clear Hierarchy**: Use font size and weight to create visual hierarchy (larger, heavier fonts for headings, standard weights for body text)
2. **Maintain Consistency**: Once you establish a font stack and sizing scale, apply it consistently across similar elements
3. **Anchor & Pair**: Pair fonts that complement each other (e.g., a heavier weight for emphasis, standard weight for body text)

**Hierarchy Rules:**
- Max 3 levels per component
- Size contrast: Headlines 1.5-2x body size minimum
- Weight contrast: 700 for emphasis, 400-500 for body

**Legibility:**
- Line-height: 1.5-1.7 (body), 1.1-1.3 (headings)
- Line length: 45-75 characters (optimal readability)
- Avoid orphans (no single word on final line)

---

## 7. Creative Exploration

**Push beyond the obvious.** Award-winning design explores multiple directions.

**Trigger Questions:**
1. "What would make a user say 'wow'?" → Aim for delight, not just function.
2. "How can proportion create interest?" → Vary sizes, use asymmetry intentionally.
3. "What interaction details would feel polished?" → Hover states, micro-animations.

**Pattern Ideas:**

*Cards:* Asymmetric grids (60/40 split) · Overlapping elements with z-index · Thick accent border (3-4px) on one side · Color blocking backgrounds · Typography-first (massive headline as anchor)

*Content Hierarchy:* Large numbers (3-4x size for stats) · Quote callouts (thick left border + tinted background) · Whitespace as divider (4rem+) · Pill badges (tight padding, accent background)

*Spacing Drama:* Tight clustering (0.25-0.5rem) + huge gaps (2.5rem+) between groups · Asymmetric margins · Generous hero padding (2.5-4rem)

*Depth Techniques:*
- Borders → Clear containment (forms, tables)
- Shadows → Elevation (modals, hover)
- Background shifts → Subtle distinction (info panels)

---

## 8. Responsive Design

Components live in user-resizable bounding boxes (300-1200px) within varying viewports (375-1920px).

**CSS Approach:** Rely on modern CSS (flexbox, grid, `clamp()` for typography, `min()`, `max()`) for fluid responsiveness without media queries.

**Layered Strategy:**
| What | Responds To | Pattern |
|---|---|---|
| Layout structure | Container | `grid auto-fit`, `flex-wrap` |
| Typography | Viewport | `clamp()` |
| Spacing | Both | Fixed or tight clamp |
| Root element | Container | `width: 100%` |

**Component Types:**
- Most (cards, forms): `width: 100%`, grid/flex, fixed spacing
- Overlays (modals): Can have `max-width`, fixed dimensions
- Readable content: `width: 100%` root, `max-width` inner wrapper

---

## 9. Motion System

All animations: pure CSS, smooth, purposeful.

**Timing:**
| Interaction | Duration | Easing |
|---|---|---|
| Hover, click | 150-200ms | `ease-out` |
| Active states | 250ms | `ease-out` |
| Content reveals | 400-500ms | `ease-out` or `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring) |

**Standard Reveal:**
```css
@keyframes contentAppear {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Rules:**
- Only animate `transform` and `opacity` (GPU-accelerated)
- Respect `prefers-reduced-motion` (only allowed media query)
- No looping (except loading spinners)
