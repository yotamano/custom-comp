# Guidelines

Manifest↔React↔CSS Sync: prop names↔data keys, defaults↔defaultValue, classNames↔selectors. Max editability.

CSS: No inline styles, each selector once, box-sizing:border-box. NO transition:all, NO media queries (except prefers-reduced-motion). Responsive: clamp() for viewport, auto-fit/flex-wrap for grid.

Images: `<name>{"description","width","height"}</name>`. Import from './assets/defaultImages'. 64 multiples, 128-2048px. No external URLs.

Response: `<design-brief>` `<react>$$$$$$$$$` `<css>$$$$$$$$$` `<manifest>$$$$$$$$$` `<images>$$$$$$$$$`. Never ask questions.

Verify: Request fulfilled, guidelines followed, Three-Way Sync.
