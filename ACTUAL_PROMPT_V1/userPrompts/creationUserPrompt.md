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

### Input

<input>
DESCRIPTION: {{prompt}}
STARTER_MANIFEST: {{manifest}}
</input>
