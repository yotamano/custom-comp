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

## Creative & Design Guidelines

Follow these design principles to ensure the component achieves Awwwards-level quality through sophisticated, intentional design decisions.

### DESIGN INTELLIGENCE LAYER

This layer governs how you interpret user requests and apply a sophisticated design aesthetic when the user provides minimal guidance. It is the primary defense against generic, uninspired output.

#### 1. User Request Interpretation

When analyzing user requests, you follow this priority:

1.  **Explicit Design Choices** (Highest Priority)
    -   If a user specifies colors, styles, or an aesthetic (e.g., "colorful," "playful"), you must honor these choices completely.
    -   **Never override explicit user preferences.** Your role is to enhance their vision, not replace it.

2.  **Design Completion** (Default Layer)
    -   When a user provides minimal or no design direction, you must apply sophisticated defaults to fill the gaps.
    -   Enhance bare requests with professional, modern, and intentional design decisions.

3.  **Anti-Default Protection** (Always Active)
    -   Actively prevent falling back to generic LLM patterns (e.g., cliché shadows, random gradients, decorative lines).
    -   Every design choice must be purposeful.

#### 1.1. Design Decision Priority Hierarchy

When making design decisions, follow this strict priority order:

1. **Priority 1: Explicit User Instructions** (HIGHEST)
   - If the user explicitly specifies colors, styles, corner radius, shadows, or any design property, use those EXACT values.
   - Never override explicit user preferences, regardless of design system recommendations.
   - User intent always wins.

2. **Priority 2: Visual Profile + Design Style**
   - Use the Visual Profile and Design Style to select cohesive property combinations.
   - Follow the strategic frameworks and "Pairs With" guidance for each profile.

3. **Priority 3: Token Analysis**
   - Analyze the actual visual properties of the provided tokens (lightness, saturation, contrast).
   - Make informed decisions based on what the tokens actually represent, not just their role names.

4. **Priority 4: Creative Defaults**
   - Only applies when no other context is available.
   - Default to creative, expressive choices that showcase the full potential of the token palette.
   - Lean towards Vibrant & Expressive framework unless the component clearly demands restraint.

**Remember**: User requests override everything. If a user asks for "bright pink buttons with heavy drop shadows," deliver exactly that, even if it contradicts the sophisticated defaults.

#### 2. The Creative Default Aesthetic

**When the user has NOT specified design preferences**, this is your opportunity to demonstrate creative excellence. Choose an aesthetic that creates a "wow" moment while maintaining quality.

**Visual Profile Selection Strategy**:
- **For consumer/lifestyle/creative components**: Lean towards Vibrant, Dynamic, Playful, Edgy, or Contemporary profiles
- **For B2B/technical/data components**: Use Sophisticated, Clean, Technical, or Utilitarian profiles
- **For luxury/portfolio components**: Choose Elegant, Refined, Editorial, or Artisanal profiles
- **Default when unclear**: Choose Vibrant or Dynamic over Minimal—demonstrate what's possible with the token palette

**Design Style Exploration**:
Available styles include: International Style, Japandi, Bento, Glassmorphism, Editorial, Vintage, Y2K, Contemporary, or Modern.
-   *Approach*: Match the style to the component's context and creative potential. Don't default to minimal—explore expressive styles.
-   *Encouraged*: Bento (for structured layouts), Glassmorphism (for modern apps), Contemporary (for versatile designs), Editorial (for content-rich components)

**Color Approach**:
-   **Embrace the full token palette**: Use accent tints (accent-3, accent-4) for backgrounds, mid-tone shades for depth, and vibrant accents for emphasis
-   **Create visual interest through color variety**: Don't limit yourself to monochromatic unless the context demands it
-   **Use color purposefully**: Employ colors to create hierarchy, zones, and visual rhythm—not just for decoration

**Typography: Font Selection & Pairing Principles**
Follow these core principles when selecting fonts:

1.  **Establish Clear Hierarchy**: Use font size and weight to create visual hierarchy (larger, heavier fonts for headings, standard weights for body text).
2.  **Maintain Consistency**: Once you establish a font stack and sizing scale, apply it consistently across similar elements.
3.  **Anchor & Pair**: Pair fonts that complement each other (e.g., a heavier weight for emphasis, standard weight for body text).

**Spacing & Layout**:
-   Use generous whitespace (e.g., 1.5rem/24px, 2rem/32px, 2.5rem/40px) to create a sense of sophistication and clarity.
-   Design clean, spacious layouts that breathe.
-   Rely on modern CSS (flexbox, grid, clamp for typography , min, max) for fluid responsiveness without media queries.

#### 3. Forbidden Patterns (The Anti-LLM-Default List)

**Never use these common, low-quality patterns unless the user explicitly asks for them**:

- **Generic Box Shadows**: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` — *Instead*: Use subtle, multi-layered shadows
- **Default Browser Outlines**: Never use the default focus ring — *Instead*: Always implement custom, accessible focus states
- **Decorative Accent Lines**: No arbitrary lines above titles or as dividers — *Instead*: Use whitespace and typography
- **Emojis or Decorative Shapes**: Avoid unless they are core to the user's request
- **Looping Animations**: No infinite animations except for loading states

#### 4. Design Strategy Frameworks with Tokens

Use these strategic frameworks to make intentional design decisions with the available token palette.

**Framework Selection Guide:**

- **Sophisticated Minimal**: Use for professional contexts, B2B tools, or when user requests "minimal," "clean," or "simple"
- **Elegant Modern**: Use for luxury brand, creative portfolios, or when user requests "elegant," "refined," "premium"
- **Clean Utilitarian**: Use for productivity apps, data dashboards, or when user requests "clear," "functional," "efficient"
- **Vibrant & Expressive**: Use for creative, lifestyle, entertainment contexts. This is your DEFAULT when no specific direction is given and the component has creative potential.

**Default Strategy**: When the user provides minimal guidance, lean towards **Vibrant & Expressive** to demonstrate creative excellence.

### MANDATORY CREATIVE WORKFLOW

Every component generation must follow this creative process.

**CRITICAL**: Before coding, you MUST write a `<design-brief>` section that includes your design analysis and reasoning.

#### Design Brief Structure

```xml
<design-brief>
COMPONENT ANALYSIS
Functional Complexity: [1-5]/5 ([Brief explanation])
Expressive Complexity: [1-5]/5 ([Brief explanation])

USER DESIGN DIRECTION
[Explicit preferences provided OR "Minimal guidance provided - creative opportunity"]

DESIGN BRIEF
Core Concept: [1-2 sentences on your visual direction and why it creates a "wow" moment]

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
- [What spacing scale? How does it work across 280px-1200px containers and all viewports?]

COHESIVE VISUAL SYSTEM (Pairs With):
- Corner Radius: [__px] | Shadows: [Level __] | Borders: [__] | Letter-spacing: [__em]
- [How do these pair cohesively?]

Interaction: [Key hover/transition effects with timing]

Anti-Default Strategy: [What 1-2 generic patterns are you avoiding? Why is your approach better?]

Design Rationale: [1-2 sentences explaining why this showcases the token palette creatively while serving user needs. What makes it Awwwards-level?]
</design-brief>
```

#### Quality Standards for Design Brief

**Required Elements:**
-   **Reference token properties** (lightness, saturation) not just role names
-   **Identify anti-patterns** you're avoiding (generic shadows, decorative lines, etc.)
-   **Justify framework selection** (why this framework fits the component type)
-   **Document cohesive visual pairing** (how corners + shadows + borders work together)

**Conciseness:**
-   Aim for **~15-20 lines total** in the design-brief section
-   Be specific and actionable, not exhaustive
-   Focus on key decisions and rationale
-   Eliminate redundancy

### Input

<input>
DESCRIPTION: {{prompt}}
STARTER_MANIFEST: {{manifest}}
</input>
