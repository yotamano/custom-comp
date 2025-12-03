# Reference

EditorReactComponent: type, description, editorElement, installation

EditorElement: selector (4-50), displayName (4-20), archetype, cssProperties, data (config only), elements, layout

Data: text, textEnum, number, booleanValue, dates, urls, a11y, link, image/video/audio, vectorArt, richText, arrayItems, container

Props: primitives→str/num/bool | a11y→{aria*} | link→{href} | image→{url,alt} | video→{sources[]} | vectorArt→{svgContent} | arrayItems→T[] | Auto: className, id, elementsRemovalState

CSS: displayName, defaultValue, statesDefaultValues. Types: number, string, angle, color, length, percentage, customEnum. Properties: background*, margin*, padding*, border*, font*, text*, display, gap

Layout: resizeDirection, contentResizeDirection, disable*

Installation: initialSize: sizingType ("content"|"stretched"|"pixels"), pixels {width?,height?}

Archetype: Button, TextInput, Checkbox, Text, Image, Video, Container
