# Component Creation Task

I'll provide a DESCRIPTION and a STARTER_MANIFEST. Your goal is to create a complete, production-ready React component by interpreting the user's vision and building upon the provided foundation.

## Creation Strategy

**Requirement Analysis:**

- Parse the DESCRIPTION to identify core functionality and visual requirements
- Determine what elements users would conceptually recognize as distinct, editable components
- Identify opportunities to enhance the description with modern UX patterns
- Plan component hierarchy that matches user mental models

**Starter Manifest Utilization:**

- Use STARTER_MANIFEST as the architectural foundation—never ignore or override its structure
- Expand the manifest with additional elements, data, and styling capabilities beyond the starter
- Ensure manifest completeness: every interactive or styleable element should be properly exposed
- Validate that manifest structure supports all described functionality

**Editability Maximization:**

- Expose text content as editable data properties
- Make colors, spacing, and typography customizable through CSS properties
- Provide meaningful choices for layout variants, styles, or display options
- Ensure text, links, images, icons, and media are properly configurable

## Creation Verification

**Functional Completeness:**

- All DESCRIPTION requirements are implemented and working
- Component handles edge cases (empty content, long text, missing data)
- Interactive elements respond appropriately to user actions
- Data flows correctly from manifest through props to rendered output
- Component MUST be fully SSR-compatible (follow all SSR guidelines from system prompt)

**User Experience Excellence:**

- Component performs well across different content lengths and screen sizes
- Visual design feels modern, polished, and consistent with current design trends
- Element hierarchy is logical and matches user expectations
- Editing capabilities are intuitive and comprehensive

---

## Design Intelligence Layer

Follow these principles to achieve Awwwards-level quality through sophisticated, intentional design decisions.

**When the user has NOT specified design preferences**, this is your opportunity to demonstrate creative excellence. Choose an aesthetic that creates a "wow" moment while maintaining quality.

This layer governs how you interpret user requests and apply sophisticated design. It is the primary defense against generic, uninspired output.

### User Request Interpretation

When analyzing user requests, follow this priority:

1. **Explicit Design Choices** (Highest Priority)
   - If user specifies colors, styles, or an aesthetic (e.g., "colorful," "playful"), honor these choices completely
   - **Never override explicit user preferences.** Your role is to enhance their vision, not replace it.

2. **Design Completion** (Default Layer)
   - When user provides minimal or no design direction, apply sophisticated defaults to fill the gaps
   - Enhance bare requests with professional, modern, and intentional design decisions

3. **Anti-Default Protection** (Always Active)
   - Actively prevent falling back to generic LLM patterns (cliché shadows, random gradients, decorative lines)
   - Every design choice must be purposeful

### Design Decision Priority Hierarchy

When making design decisions, follow this strict priority order:

1. **Priority 1: Explicit User Instructions** (HIGHEST)
   - User specifies colors, styles, radius, shadows → use EXACT values
   - Never override explicit preferences, regardless of design system recommendations
   - User intent always wins.

2. **Priority 2: Visual Profile + Design Style**
   - Select cohesive property combinations based on component context
   - Follow the "Pairs With" guidance for visual consistency

3. **Priority 3: Token Analysis**
   - Analyze actual visual properties (lightness, saturation, contrast)
   - Make informed decisions based on what tokens represent, not just role names

4. **Priority 4: Creative Defaults** (when no other context)
   - Default to creative, expressive choices that showcase the full token palette
   - Lean towards **Vibrant & Expressive** unless component demands restraint

**Remember**: User requests override everything. If a user asks for "bright pink buttons with heavy drop shadows," deliver exactly that, even if it contradicts the sophisticated defaults.

### Visual Profile Selection

Match the aesthetic to component context:
- **Consumer/lifestyle/creative** → Vibrant, Dynamic, Playful, Contemporary
- **B2B/technical/data** → Sophisticated, Clean, Technical, Utilitarian
- **Luxury/portfolio** → Elegant, Refined, Editorial, Artisanal
- **Default when unclear** → Vibrant or Dynamic (demonstrate what's possible)

### Design Style Options

Available: International Style, Japandi, Bento, Glassmorphism, Editorial, Vintage, Y2K, Contemporary, Modern.

*Encouraged*: Bento (structured layouts), Glassmorphism (modern apps), Contemporary (versatile), Editorial (content-rich)

### Framework Selection

- **Sophisticated Minimal**: Professional, B2B, "minimal," "clean," "simple"
- **Elegant Modern**: Luxury, portfolios, "elegant," "refined," "premium"
- **Clean Utilitarian**: Productivity, dashboards, "clear," "functional," "efficient"
- **Vibrant & Expressive**: Creative, lifestyle, entertainment — **DEFAULT when minimal guidance**

### Forbidden Patterns (Anti-LLM-Default)

**Never use unless explicitly requested:**
- Generic shadows: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` → Use the shadow levels from design-guidelines
- Default browser outlines → Implement custom accessible focus states
- Decorative accent lines → Use whitespace and typography instead
- Emojis or decorative shapes → Avoid unless core to request
- Looping animations → Only for loading states

---

## Mandatory Creative Workflow

**CRITICAL**: Before coding, write a `<design-brief>` demonstrating your design thinking.

### Design Brief Structure

```xml
<design-brief>
COMPONENT ANALYSIS
Functional Complexity: [1-5]/5 ([Brief explanation])
Expressive Complexity: [1-5]/5 ([Brief explanation])

USER DESIGN DIRECTION
[Explicit preferences provided OR "Minimal guidance - creative opportunity"]

DESIGN BRIEF
Core Concept: [1-2 sentences on visual direction and why it creates a "wow" moment]

Strategic Framework: [Sophisticated Minimal / Elegant Modern / Clean Utilitarian / Vibrant & Expressive]
Visual Profile: [Profile name]
Design Style: [Style name]

Color Palette Analysis:
- [Which token groups (base/shade/accent) create hierarchy? Why these choices based on lightness/saturation analysis?]

Typography:
- [Which font tokens create hierarchy? Why this pairing? Composite tokens used, no overrides]

Spacing & Layout:
- [Container-responsive approach: grid auto-fit OR flex-wrap]
- [Spacing strategy: fixed OR tight clamp with specific values]
- [What spacing scale from design-guidelines? How does it work across 280px-1200px containers?]

COHESIVE VISUAL SYSTEM (Pairs With):
- Corner Radius: [__px] | Shadows: [Level __] | Borders: [__] | Letter-spacing: [__em]
- [How do these pair cohesively?]

Interaction: [Key hover/transition effects with timing from design-guidelines]

Anti-Default Strategy: [What 1-2 generic patterns are you avoiding? Why is your approach better?]

Design Rationale: [1-2 sentences explaining why this showcases the token palette creatively while serving user needs. What makes it Awwwards-level?]
</design-brief>
```

### Quality Standards

- Reference token properties (lightness, saturation), not just role names
- Identify anti-patterns you're avoiding
- Justify framework selection for this component type
- Document cohesive visual pairing (corners + shadows + borders)
- **Aim for ~15-20 lines** — specific and actionable, not exhaustive

---

### Input

<input>
DESCRIPTION: {{prompt}}
STARTER_MANIFEST: {{manifest}}
</input>
