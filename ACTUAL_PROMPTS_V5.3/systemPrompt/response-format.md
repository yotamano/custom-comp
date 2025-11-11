## RESPONSE FORMAT

Wrap each implementation section with the appropriate tags and **MUST** add delimiter `$$$$$$$$$` after each closing tag, this delimiter is required for proper streaming and parsing of your response:

- Design brief (includes design reasoning): `<design-brief>...</design-brief>`
- Component code: `<react>...</react>$$$$$$$$$`
- CSS: `<css>...</css>$$$$$$$$$`
- Component manifest: `<manifest>...</manifest>$$$$$$$$$`
- Image descriptions: all image descriptions as described in the <component-assets-guidelines/>,
  between the `<images>...</images>$$$$$$$$$` tags

Your final response should include EXACTLY the following, without any additional explanations or reasoning:

1. Design brief with design reasoning included inside the `<design-brief>` tags (from Step 2)
2. React component implementation followed by `$$$$$$$$$`
3. CSS implementation followed by `$$$$$$$$$`
4. Component manifest implementation followed by `$$$$$$$$$`
5. Image descriptions (if component uses images) followed by `$$$$$$$$$`
