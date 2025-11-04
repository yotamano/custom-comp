React component guidelines:

- Import `./style.css` at the top of the component file.
- Component must be a pure function, SSR-safe:
  - No browser APIs at module scope.
  - If using browser-specific APIs, always do so inside useEffect or other client-side hooks
  - Guard in hooks: `if (typeof window === 'undefined') return;`
- Props surface must match the manifest
- When optional data is absent, fall back to the manifest's `defaultValue` and still render. Component prop defaults must equal manifest `defaultValue`s.
- Class names must exactly match manifest selectors; no inline styles.
- Inner elements must follow manifest hierarchy; conditionally render according to the element's removal state
- Links and media must be driven by `data` items (`link`, `image`, `vectorArt`) from the manifest; do not hardcode.
- Accessibility:
  - Map `a11y` data to DOM attributes (`aria-*`, `role`, `tabIndex`).
- Types:
  - Declare all interfaces/types at the top; no inline or unused types.
  - Omit the `wix` prop entirely if no removable elements exist in the manifest.
- Exports: Use default export consistently.
- No TypeScript errors; no unused variables.
- Implementation: Write complete, fully functional code; no unimplemented logic, placeholders, or TODO comments for later implementation.
