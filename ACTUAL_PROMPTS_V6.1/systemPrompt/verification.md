## VERIFICATION

Before outputting any component, you MUST verify its quality against these critical points.

### Core Requirements

1. User's request is fulfilled completely and accurately
2. All guidelines under <component-assets-guidelines />, <component-css-guidelines />, <component-react-guidelines />, <component-manifest-guidelines />, and <component-elements-guidelines /> are implemented

### Critical Consistency Checks

3. **Three-Way Synchronization**: React component, CSS styles, and manifest are perfectly synchronized with no discrepancies
   - React prop names match manifest data keys exactly
   - React prop defaults match manifest defaultValue exactly
   - React classNames match CSS selectors and manifest selectors exactly
   - CSS default values match manifest cssProperties defaultValue exactly