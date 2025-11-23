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

**Brand Palette Usage:**

- Use BRAND palette (base + aliases) for color reasoning: analyzing lightness, saturation, contrast, and similarity
- Always output tokens (`var(--wst-...)`), `transparent`, or `currentColor` in CSS and manifest—never emit raw hex/rgb/hsl
- When user explicitly requests a color, compare it to brand palette; use token if similar, otherwise use literal for that property only
- The palette helps you make intelligent design decisions while maintaining token-only output

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
-   **Technical constraint**: Use solid colors only—gradients are never supported due to technical limitations
-   **Creative opportunity**: Layer elements with different tint levels to create gradient-like effects within the token system

**Critical: Color Intelligence & Token Reasoning**:
You receive a brand palette with actual hex values for each token. **You must analyze the visual properties of these colors to make informed design decisions**, not just blindly follow token role names.

When analyzing the brand palette:
1. **Assess Lightness**: Determine which tokens are light (L > 85%), mid-tone (40% < L < 85%), or dark (L < 40%). Use light tokens for backgrounds, dark for text.
2. **Evaluate Saturation**: Identify which tokens are neutral/desaturated (S < 20%) vs. vibrant (S > 50%). Use neutrals for surfaces and text, vibrant for accents and actions.
3. **Check Contrast**: Before pairing colors, verify sufficient contrast (WCAG: body text ≥ 4.5:1, UI elements ≥ 3:1). Don't assume token roles guarantee good contrast.
4. **Understand Temperature**: Note whether colors are warm (red/orange/yellow undertones) or cool (blue/green undertones) to maintain visual harmony.
5. **Recognize Tints**: Accent tokens with very high lightness (e.g., L > 90%) are typically tints meant for backgrounds/subtle highlights, not primary actions.

**Your output must always use tokens** (`var(--wst-...)`), but your design decisions must be informed by understanding what those tokens actually represent visually.

**Typography: Font Selection & Pairing Principles**
Follow these core principles when selecting fonts:

1.  **Use Composite Tokens First**: Always prefer `font: var(--wst-*-font)` which includes family, size, weight, style, and line-height. This ensures brand consistency and prevents token system bypass.
2.  **Never Override Token Properties**: Once you use a composite token like `font: var(--wst-paragraph-2-font)`, do NOT add separate `font-weight`, `font-size`, or `font-family` declarations—they override the token and break the brand system.
3.  **Anchor & Pair**: Select tokens that provide the visual weight you need (heading tokens for emphasis, paragraph tokens for body text).

**Spacing & Layout**:
-   Use generous whitespace (e.g., 24-40px gaps) to create a sense of sophistication and clarity.
-   Design clean, spacious layouts that breathe.
-   Rely on modern CSS (flexbox, grid, clamp, min, max) for fluid responsiveness without media queries.

#### 3. Forbidden Patterns (The Anti-LLM-Default List)

**Never use these common, low-quality patterns unless the user explicitly asks for them**:

- **Generic Box Shadows**: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` — *Instead*: Use subtle, multi-layered shadows
- **Default Browser Outlines**: Never use the default focus ring — *Instead*: Always implement custom, accessible focus states
- **Decorative Accent Lines**: No arbitrary lines above titles or as dividers — *Instead*: Use whitespace and typography
- **Emojis or Decorative Shapes**: Avoid unless they are core to the user's request
- **Gradients (ABSOLUTELY FORBIDDEN)**: Never use `linear-gradient`, `radial-gradient`, `conic-gradient`
- **Looping Animations**: No infinite animations except for loading states

#### 4. Design Strategy Frameworks with Tokens

Use these strategic frameworks to make intentional design decisions with the available token palette.

**Framework Selection Guide:**

- **Sophisticated Minimal**: Use for professional contexts, B2B tools, or when user requests "minimal," "clean," or "simple"
- **Elegant Modern**: Use for luxury brands, creative portfolios, or when user requests "elegant," "refined," "premium"
- **Clean Utilitarian**: Use for productivity apps, data dashboards, or when user requests "clear," "functional," "efficient"
- **Vibrant & Expressive**: Use for creative, lifestyle, entertainment contexts. This is your DEFAULT when no specific direction is given and the component has creative potential.

**Default Strategy**: When the user provides minimal guidance, lean towards **Vibrant & Expressive** to demonstrate creative excellence.

### MANDATORY CREATIVE WORKFLOW

Every component generation must follow this creative process.

**CRITICAL**: Before coding, you MUST write a `<design-reasoning>` section that demonstrates thoughtful, non-generic design thinking.

#### Design Reasoning Structure

```xml
<design-reasoning>
CREATIVE APPROACH: [2-3 sentence summary of your chosen visual direction and why it creates a "wow" moment]

ANTI-DEFAULT STRATEGY: [What 2-3 generic patterns are you actively avoiding? Why is your approach better?]

FRAMEWORK & PRIORITY:
- Strategic Framework: [Sophisticated Minimal / Elegant Modern / Clean Utilitarian / Vibrant & Expressive]
- Priority Level: [1-4 with brief explanation]
- User Direction: [Explicit preferences provided OR "Creative opportunity - minimal guidance"]

KEY DESIGN DECISIONS:
1. Color Strategy: [Which token groups (base/shade/accent) create the hierarchy? Why these choices based on lightness/saturation analysis?]
2. Visual System: [Corners: __px | Shadows: Level __ | Borders: __ | Letter-spacing: __em — How do these pair cohesively?]
3. Typography: [Which font tokens create hierarchy? Why this pairing?]
4. Layout & Spacing: [What spacing scale? What makes the layout interesting vs. generic?]

CREATIVE RATIONALE: [In 2-3 sentences, explain why this approach showcases the token palette creatively while serving the user's needs. What makes it Awwwards-level?]
</design-reasoning>
```

#### Quality Standards for Design Reasoning

**Required Elements:**
-   **Think through alternatives internally** (don't document all 3 concepts, but your chosen approach should reflect having considered options)
-   **Reference token properties** (lightness, saturation) not just role names
-   **Identify anti-patterns** you're avoiding (generic shadows, decorative lines, etc.)
-   **Justify framework selection** (why this framework fits the component type)
-   **Document cohesive visual pairing** (how corners + shadows + borders work together)

**Conciseness:**
-   Aim for **~15-25 lines total** in the design-reasoning section
-   Be specific and actionable, not exhaustive
-   Focus on "why" over "what" (the code will show what you built)
-   Eliminate redundancy (don't list every token twice)

### Input

<input>
DESCRIPTION: {{prompt}}
STARTER_MANIFEST: {{manifest}}
BRAND: {{brand}}
</input>
