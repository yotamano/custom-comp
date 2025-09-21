# Plan for Merging Design and Technical Prompts

This document outlines the strategy for merging `custom_component_system_prompt.md` (the "Design Prompt") into `CURRENT_PROMPT.md` (the "Technical Prompt"). The goal is to create a single, cohesive system prompt that guides the AI through a creative design process while enforcing strict technical compliance with the Wix Component Model.

The core strategy is to prepend the creative process from the Design Prompt to the technical documentation, creating a clear workflow: **Think -> Plan -> Execute**.

---

## Guiding Principles for the Merge

To ensure a successful merge, the following principles will be strictly followed:

1.  **Prioritize Technical Integrity:** The technical documentation within `CURRENT_PROMPT.md` is the non-negotiable source of truth. All rules, schemas, and guidelines for the Wix Component Model (Manifest, CSS, React) will be preserved with absolute minimum changes. The only modification will be condensing the number of inline examples to save space.

2.  **Inject a Creative Framework, Not Just More Rules:** The primary additions from `custom_component_system_prompt.md` are not new rules, but a new *process*. We will integrate its creative methodology:
    *   **The "Design Brief":** A mandatory planning step before coding.
    *   **A Modern Design Vocabulary:** A curated menu of modern effects to inspire creativity.
    *   **Quality Filters:** Explicitly forbidding generic, low-effort design patterns.



---

## Analysis of `CURRENT_PROMPT.md` Sections

Here is a section-by-section breakdown of the proposed changes.

### 1. `## ROLE`

*   **Current:** Defines the AI as an expert in creating components for the Wix Component Model.
*   **Change:** **Merge.** I will fuse the role from the Design Prompt with the existing role.
*   **New Role:** The AI will be an "award-winning UI/UX designer and frontend developer" whose specific expertise is creating "beautiful, responsive, and functional React components that comply with the Wix Component Model." This establishes both creative and technical authority from the outset.

### 2. **NEW SECTION: `## CREATIVE & DESIGN PROCESS`**

*   **Current:** The current prompt dives directly into technical documentation.
*   **Change:** **Add a new top-level section here.** This is the most significant change. I will insert the core creative methodology from the Design Prompt before the technical details. This section will contain:
    *   **A. `### Creative Philosophy`**: A condensed version of the Design Prompt's principles on Color, Typography, Layout, Animation, and Modern Effects. This will provide creative inspiration without excessive length.
    *   **B. `### Component Analysis & Design Brief`**: This will be imported directly from the Design Prompt. It forces the AI to analyze the request and create a structured `Design Brief` as a comment block *before* writing any code. This is the central pillar of the new creative workflow.
    *   **C. `### Forbidden Design Patterns`**: This section will be imported from the Design Prompt to prevent common, uninspired design choices (e.g., generic box shadows, default focus outlines).

### 3. `## CORE DOCUMENTATION` (and all its sub-sections: `<component-manifest>`, `<editorElement>`, etc.)

*   **Current:** This is the heart of the Technical Prompt, containing exhaustive documentation on the Wix Component Model, including the manifest structure, data types, CSS properties, and layout rules.
*   **Change:** **Preserve and Condense.** The vast majority of this content is critical and will be preserved. To manage overall length, I will:
    *   Keep the descriptive tables and rules.
    *   Reduce the number of JSON examples for each sub-section, keeping only one or two clear examples to illustrate the concept. The large, complete example at the end will serve as the primary reference.

### 4. `<component-css-guidelines>`, `<component-react-guidelines>`, `<component-assets-guidelines>`

*   **Current:** These sections provide strict, actionable rules for the implementation files.
*   **Change:** **Preserve.** These sections are essential for technical compliance and will be kept as they are.

### 5. `<wix-component-example>`

*   **Current:** Provides a complete, best-practice example of a component with its React, CSS, and Manifest files.
*   **Change:** **Preserve and Enhance.** This example is extremely valuable. I will enhance it slightly by adding a sample `Design Brief` comment block at the top of the `<react>` section to demonstrate how the new creative process connects to the final output.

### 6. `<response-format>` and a NEW `## INSTRUCTIONS` section

*   **Current:** The response format is clearly defined. The instructions are implicitly spread throughout the document.
*   **Change:** **Rewrite and Consolidate.** I will create a new, final `## INSTRUCTIONS` section that formalizes the merged workflow. It will instruct the AI to:
    1.  **Analyze** the user request.
    2.  **Create the Design Brief** as a comment block based on the `Creative & Design Process` section.
    3.  **Implement** the `<react>`, `<css>`, and `<manifest>` files, ensuring they are technically correct according to the `CORE DOCUMENTATION` and fully aligned with the Design Brief.
*   The `<response-format>` section will be kept as-is, as it dictates the final output structure.

### 7. `<verification>`

*   **Current:** Instructs the AI to self-verify its output against the user request and technical guidelines.
*   **Change:** **Enhance.** I will add one more verification criterion: "The final implementation (React, CSS, Manifest) is consistent with the `Design Brief` created in the first step."

This plan ensures all critical technical details are preserved while integrating a robust design methodology, resulting in a more powerful and creative prompt that still adheres to all necessary constraints.
