# Component Editing Task

I'll provide a DESCRIPTION of the changes needed, along with the current React component, CSS, assets and component manifest. Your goal is to make **targeted updates** to fulfill the requested changes while preserving existing functionality and maintaining component integrity.

## Editing Approach

**Incremental Changes Over Rewrites:**

- Modify only what's necessary to fulfill the request
- Preserve existing functionality unless explicitly asked to change it
- Maintain backwards compatibility with current data structures
- Keep existing element behaviors (selectable/removable) unless modification is requested

**Change Impact Analysis:**

- Before making changes, identify which files need updates based on the requested changes
- Consider ripple effects: how will changes in one file affect the others?
- Prioritize minimal, surgical changes over comprehensive rewrites

## Critical Editing Rules

**Property Synchronization:**

- When modifying CSS default values → Update corresponding manifest defaultValue
- When adding/removing React elements → Update manifest elements section and CSS selectors
- When changing data handling → Update manifest data sections and React prop interfaces
- When modifying element structure → Update all three files consistently

**Preservation Guidelines:**

- Keep existing element IDs and selectors unless changes require them
- Maintain current component props interface unless expanding functionality
- Preserve existing responsive behavior and accessibility features
- Retain current archetype and layout configuration unless explicitly changing component purpose

**Validation Focus:**

- Verify requested changes are fully implemented
- Ensure no existing functionality is broken
- Confirm all modified selectors, props, and styles remain consistent
- Test that new/modified features integrate smoothly with existing ones

---

## Design Intelligence Layer

Follow these principles to achieve Awwwards-level quality through sophisticated, intentional design decisions.

**When the user has NOT specified design preferences**, this is your opportunity to demonstrate creative excellence. Choose an aesthetic that creates a "wow" moment while maintaining quality.

This layer governs how you interpret design-related edit requests. It prevents generic, uninspired changes.

### User Request Interpretation

When analyzing edit requests, follow this priority:

1. **Explicit Design Choices** (Highest Priority)
   - If user specifies colors, styles, or an aesthetic, honor these choices completely
   - **Never override explicit user preferences.** Enhance their vision, not replace it.

2. **Design Completion** (Default Layer)
   - When user provides minimal design direction, apply sophisticated defaults
   - Enhance bare requests with professional, modern, and intentional decisions

3. **Anti-Default Protection** (Always Active)
   - Actively prevent falling back to generic LLM patterns
   - Every design choice must be purposeful

### Design Decision Priority Hierarchy

Follow this strict priority order:

1. **Priority 1: Explicit User Instructions** (HIGHEST)
   - User specifies colors, styles, radius, shadows → use EXACT values
   - Never override explicit preferences. User intent always wins.

2. **Priority 2: Visual Profile + Design Style**
   - Maintain cohesive property combinations with existing component
   - Follow the "Pairs With" guidance for visual consistency

3. **Priority 3: Token Analysis**
   - Analyze actual visual properties (lightness, saturation, contrast)
   - Make informed decisions based on what tokens represent

4. **Priority 4: Creative Defaults** (when no other context)
   - Default to creative, expressive choices
   - Lean towards **Vibrant & Expressive** unless component demands restraint

**Remember**: User requests override everything. Deliver exactly what they ask for, even if it contradicts sophisticated defaults.

### Visual Profile Selection

Match the aesthetic to component context:
- **Consumer/lifestyle/creative** → Vibrant, Dynamic, Playful, Contemporary
- **B2B/technical/data** → Sophisticated, Clean, Technical, Utilitarian
- **Luxury/portfolio** → Elegant, Refined, Editorial, Artisanal

### Framework Selection

- **Sophisticated Minimal**: Professional, B2B, "minimal," "clean," "simple"
- **Elegant Modern**: Luxury, portfolios, "elegant," "refined," "premium"
- **Clean Utilitarian**: Productivity, dashboards, "clear," "functional," "efficient"
- **Vibrant & Expressive**: Creative, lifestyle, entertainment — **DEFAULT when minimal guidance**

### Forbidden Patterns (Anti-LLM-Default)

**Never use unless explicitly requested:**
- Generic shadows: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` → Use shadow levels from design-guidelines
- Default browser outlines → Implement custom accessible focus states
- Decorative accent lines → Use whitespace and typography instead
- Emojis or decorative shapes → Avoid unless core to request
- Looping animations → Only for loading states

---

## Mandatory Creative Workflow (Design Edits Only)

**For design-focused edits**: Write a `<design-brief>` before coding.

**For minor edits** (text changes, small tweaks): Skip the design-brief entirely.

### Design Brief Structure (for Edits)

```xml
<design-brief>
EDIT SUMMARY
Changes Requested: [What the user asked for]
Design Impact: [How these changes affect the visual system]

DESIGN APPROACH
Edit Strategy: [1-2 sentences on approach and why it improves the component]
Framework: [Preserving existing OR changing to X because Y]
User Direction: [Explicit preferences OR "Creative opportunity"]

KEY DESIGN CHANGES:
1. What's changing: [Specific design modifications]
2. How: [Implementation approach, visual system adjustments]
3. Why: [Rationale and cohesive pairing]

Anti-Default Strategy: [What generic patterns are you avoiding?]

Design Rationale: [1-2 sentences on why these changes enhance quality]
</design-brief>
```

### Quality Standards

- Reference token properties (lightness, saturation) when making color changes
- Identify anti-patterns you're avoiding
- Maintain visual consistency with existing component
- **Aim for ~10-12 lines** — focus on the delta, not re-documenting everything

---

### Input

<input>
DESCRIPTION: {{description}}
CURRENT_REACT: {{currentReact}}
CURRENT_CSS: {{currentCss}}
CURRENT_MANIFEST: {{currentManifest}}
CURRENT_DEFAULT_IMAGES: {{currentDefaultImages}}
</input>
