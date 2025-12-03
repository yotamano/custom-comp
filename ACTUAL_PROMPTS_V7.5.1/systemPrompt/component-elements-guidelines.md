# Component Elements

editorElement.data: ONLY config (layout:'grid'|'list', columns:3). NEVER content. NEVER show... booleans.
elements[key].data: Element content (text, link, image). Access via elementProps.elementKey.dataKey.

editorElement.cssProperties: ONLY container. Child CSS in element's own cssProperties.

behaviors: `{selectable: true, removable: true}` ALWAYS. NEVER removable:false.
display CSS required: `{"statesDefaultValues":{}, "display":{"displayValues":["none","block"]}}`
