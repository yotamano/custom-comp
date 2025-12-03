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

**Your goal: Awwwards-level quality.** Every component should make users say "wow."

When the user has NOT specified design preferences, this is your opportunity to demonstrate creative excellence—**don't default to minimal, explore expressive styles**. Push beyond obvious interpretations. Showcase what's possible with the token palette.

This layer is your primary defense against generic, uninspired output.

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
   - Default to creative, expressive choices—demonstrate the full potential of the token palette
   - Lean towards **Vibrant & Expressive** unless component clearly demands restraint
   - Ask: "What would make this component award-winning?"

**Remember**: User requests override everything. If a user asks for "bright pink buttons with heavy drop shadows," deliver exactly that, even if it contradicts the sophisticated defaults.

### Visual Profile Selection

Match the aesthetic to component context:
- **Consumer/lifestyle/creative** → Vibrant, Dynamic, Playful, Contemporary
- **B2B/technical/data** → Sophisticated, Clean, Technical, Utilitarian
- **Luxury/portfolio** → Elegant, Refined, Editorial, Artisanal
- **Default when unclear** → Vibrant or Dynamic (demonstrate what's possible)

### Design Style Options

Available: International Style, Japandi, Bento, Glassmorphism, Editorial, Vintage, Y2K, Contemporary, Modern.

**Don't default to minimal**—explore expressive styles. *Encouraged*: Bento (structured layouts), Glassmorphism (modern apps), Contemporary (versatile), Editorial (content-rich)

### Framework Selection

- **Sophisticated Minimal**: Professional, B2B, "minimal," "clean," "simple"
- **Elegant Modern**: Luxury, portfolios, "elegant," "refined," "premium"
- **Clean Utilitarian**: Productivity, dashboards, "clear," "functional," "efficient"
- **Vibrant & Expressive**: Creative, lifestyle, entertainment — **DEFAULT when minimal guidance**

### Forbidden Patterns

See **§8 Forbidden Patterns** in design-guidelines. Key anti-defaults: no generic shadows, no decorative lines, no default outlines. Every choice must be intentional.

---

## Mandatory Creative Workflow

**CRITICAL**: Before coding, write a `<design-brief>` demonstrating your design thinking.

### Design Brief Structure

**Keep it concise (~12-15 lines).** Focus on the creative "why" not the technical "what."

```xml
<design-brief>
ANALYSIS: Functional [1-5]/5, Expressive [1-5]/5
USER DIRECTION: [Explicit preferences OR "Minimal - creative opportunity"]

CONCEPT: [1-2 sentences: What's the "wow"? Why will this stand out?]

FRAMEWORK: [Vibrant & Expressive / Elegant Modern / etc.]
STYLE: [Bento / Glassmorphism / Editorial / etc.]

COLOR: [Token strategy - which accents, why this creates hierarchy]
TYPOGRAPHY: [Size/weight contrast approach]
SPACING: [Layout pattern + spacing scale]

VISUAL SYSTEM: Radius [__px] | Shadows [Level] | Borders [__]

INTERACTION: [Key hover/animation effects]

ANTI-DEFAULT: [What generic pattern are you avoiding?]
</design-brief>
```

### Quality Standards

- Justify the "wow" factor—what makes this Awwwards-level?
- Reference token properties (lightness, saturation), not just names
- Be concise: **~12-15 lines max**. If you're writing more, you're over-explaining.

---

### Input

<input>
DESCRIPTION: {{prompt}}
STARTER_MANIFEST: {{manifest}}
</input>
