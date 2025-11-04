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

### Input

<input>
DESCRIPTION: {{description}}
CURRENT_REACT: {{currentReact}}
CURRENT_CSS: {{currentCss}}
CURRENT_MANIFEST: {{currentManifest}}
CURRENT_DEFAULT_IMAGES: {{currentDefaultImages}}
</input>
