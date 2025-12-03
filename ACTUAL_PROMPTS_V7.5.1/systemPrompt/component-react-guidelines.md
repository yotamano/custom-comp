React Guidelines:

- Import `./style.css`, pure function, SSR-safe (no browser APIs at module scope, guard hooks)
- Sync with manifest (see <component-manifest-guidelines />), fallback to `defaultValue`
- Component MUST react to prop changes. If state is initialized from props, update it when props change using `useEffect` with prop dependencies. Never ignore prop updates.
- Conditionally render ALL elements per `wix.elementsRemovalState` (all removable)
- Links/media from manifest only, never hardcode URLs
- Map `a11y` to DOM attributes, declare types at top, include `wix` prop
- Default export, no TS errors/unused vars/TODOs
- **Links**: `link?.href || '#'`, prevent default if `!link?.href || link.href === '#'`
- **elementProps**: Recursive defaults per subProp: `productA?.productName || 'Default'`
- **Arrays**: Check length: `(items?.length > 0) ? items : defaults`, add safety: `if (!item?.property) return null`
