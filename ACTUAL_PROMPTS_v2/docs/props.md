## Props

In this document we describe what the `props` will look like for each [data type](data.md) that was configured for the component and wix specific props and integration patterns.

All the type definitions you should use reside in this package: [@wix/public-schemas](https://github.com/wix-private/thunderbolt/tree/master/packages/public-schemas).

## text

A simple text value

```typescript
// A simple text value
export type Text = string
```

## Example

```json
"Hello World"
```

## textEnum

The selected value by the user in the editor from the defined option

```typescript
// The selected value by the user in the editor from the defined option
export type TextEnum = string
```

## Example

```json
"primary"
```

## number

Any number

```typescript
// Any number
export type NumberType = number
```

## Example

```json
42
```

## booleanValue

`true` / `false` value

```typescript
// true / false value
export type BooleanValue = boolean
```

## Example

```json
true
```

## a11y

An object containing the selected A11Y fields chosen

```typescript
export type A11y = {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
  tabIndex?: number
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level
  ariaLevel?: number
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
  ariaExpanded?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
  ariaDisabled?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic
  ariaAtomic?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden
  ariaHidden?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy
  ariaBusy?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiline
  multiline?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete
  ariaAutocomplete?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed
  ariaPressed?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
  ariaHaspopup?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant
  ariaRelevant?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
  role?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
  ariaLive?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
  ariaCurrent?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
  ariaLabel?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-roledescription
  ariaRoledescription?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
  ariaDescribedby?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
  ariaLabelledby?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
  ariaErrormessage?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns
  ariaOwns?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
  ariaControls?: string
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  tag?: string
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiline
  ariaMultiline?: boolean
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
  ariaInvalid?: boolean
}
```

## Example

```json
{
  "ariaLabel": "Close dialog",
  "role": "button",
  "tabIndex": 0,
  "ariaExpanded": false
}
```

## link

A Wix Link object type

## Example

```json
{
  "href": "https://example.com",
  "target": "_blank",
  "rel": "noopener"
}
```

## image

A Wix Image object type

```typescript
type Point = {
  x: number
  y: number
}

type Crop = Point & {
  width: number
  height: number
}

export type Image = {
  // The image URI.
  uri: string
  // The image resolved URL.
  url: string
  // The image name.
  name?: string
  // The image height.
  height?: number
  // The image width.
  width?: number
  // Whether the image is animated.
  animated?: boolean
  // The image crop.
  crop?: Crop
  // The image quality.
  quality?: number
}
```

## Example

```json
{
  "uri": "wix:image://v1/abc123.jpg",
  "url": "https://static.wixstatic.com/media/abc123.jpg",
  "name": "hero-image.jpg",
  "width": 1920,
  "height": 1080,
  "quality": 90
}
```

## video

A Wix Video object type

```typescript
export type VideoSource = {
  // The video quality.
  quality: '1080p' | '720p' | '480p' | '360p'
  // The video width.
  width: number
  // The video height.
  height: number
  // The video types.
  types: Array<{
    // The video format.
    format: 'mp4' | 'mp4-luminance'
    // The video URI.
    uri: string
  }>
}

export type Video = {
  uri: string // original uri
  // The video sources.
  sources: Array<VideoSource>
  // The video adaptive sources.
  adaptiveSources: Array<{
    format: 'hls' | 'dash'
    uri: string
  }>
  // Whether the video has audio.
  hasAudio: boolean
  // The video frames per second.
  fps: number
  // The video poster image.
  poster: Image
}
```

## Example

```json
{
  "uri": "wix:video://v1/def456.mp4",
  "hasAudio": true,
  "fps": 30,
  "sources": [
    {
      "quality": "1080p",
      "width": 1920,
      "height": 1080,
      "types": [
        {
          "format": "mp4",
          "uri": "wix:video://v1/def456_1080p.mp4"
        }
      ]
    }
  ],
  "poster": {
    "uri": "wix:image://v1/poster123.jpg",
    "url": "https://static.wixstatic.com/media/poster123.jpg"
  }
}
```

## vectorArt

A Wix Sanitized Vector Art object

```typescript
export type VectorArt = {
  // The SVG URI.
  uri: string
  // The SVG viewbox.
  viewBox: string
  // The SVG content box.
  contentBox: string
  // The SVG colors.
  colors: Record<string, string>
  // The SVG content type.
  contentType: 'shape' | 'color' | 'tint' | 'ugc' | 'textpath'
  // The SVG content.
  svgContent: string
}
```

## Example

```json
{
  "uri": "wix:vector://v1/shape789.svg",
  "viewBox": "0 0 100 100",
  "contentBox": "10 10 80 80",
  "contentType": "shape",
  "colors": {
    "color-1": "var(--wst-accent-3-color)",
    "color-2": "var(--wst-accent-1-color)"
  },
  "svgContent": "<svg>...</svg>"
}
```

## audio

A Wix Audio object

```typescript
export type Audio = {
  // WixMedia ID.
  id: string
  // Audio URL.
  url: string
  // Audio filename.
  filename: string
  // Audio length in seconds.
  duration: number
  // Audio title
  title: string
}
```

## Example

```json
{
  "id": "audio_123",
  "url": "https://static.wixstatic.com/mp3/audio123.mp3",
  "filename": "background-music.mp3",
  "duration": 180,
  "title": "Background Music"
}
```

## localDate

Local date output [ISO-8601](// https://www.iso.org/iso-8601-date-and-time-format.html) extended local date format (YYYY-MM-DD)

```typescript
// Local date output ISO-8601 extended local date format (YYYY-MM-DD)
// https://www.iso.org/iso-8601-date-and-time-format.html
export type LocalDate = string
```

## Example

```json
"2024-03-15"
```

## localTime

Local time output [ISO-8601](// https://www.iso.org/iso-8601-date-and-time-format.html) extended local time format (hh:mm[:ss][.sss])

```typescript
// Local time output ISO-8601 extended local time format (hh:mm[:ss][.sss])
// https://www.iso.org/iso-8601-date-and-time-format.html
export type LocalTime = string
```

## Example

```json
"14:30:00.123"
```

## localDateTime

Local Date Time output [ISO-8601](// https://www.iso.org/iso-8601-date-and-time-format.html) extended local date-time format (YYYY-MM-DDThh:mm[:ss][.sss])

```typescript
// Local Date Time output ISO-8601 extended local date-time format (YYYY-MM-DDThh:mm[:ss][.sss])
// https://www.iso.org/iso-8601-date-and-time-format.html
export type LocalDateTime = string
```

## Example

```json
"2024-03-15T14:30:00.123"
```

## webUrl

a URL with scheme http or https

```typescript
// A URL with scheme http or https
export type WebUrl = string
```

## Example

```json
"https://www.example.com/page"
```

## email

standard email address according to [RFC 5321, section 4.1.2](https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.2)

```typescript
// Standard email address according to RFC 5321, section 4.1.2
export type Email = string
```

## Example

```json
"user@example.com"
```

## phone

a validation format designed to match phone numbers with a variety of common characters, including digits (0-9), spaces, parentheses, plus sign, hyphens, and periods

```typescript
// A validation format designed to match phone numbers with common characters
export type Phone = string
```

## Example

```json
"+1 (555) 123-4567"
```

## hostname

hostname according to IANA

```typescript
// Hostname according to IANA
export type Hostname = string
```

## Example

```json
"api.example.com"
```

## regex

A valid `regex` pattern supplied by the User

```typescript
// A valid regex pattern supplied by the User
export type Regex = string
```

## Example

```json
"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
```

## guid

A unique identifier

```typescript
// A unique identifier
export type Guid = string
```

## Example

```json
"550e8400-e29b-41d4-a716-446655440000"
```

## richText

a HTML text with css inline styling

```typescript
// HTML text with inline CSS styling
export type RichText = string
```

## Example

```json
"<p style=\"color: var(--wst-paragraph-2-color); font-size: 16px;\">This is <strong>bold</strong> and <em>italic</em> text with a <a href=\"#\">link</a>.</p>"
```

## container

A container place in the component that will be passed in as {children} or a function prop, depending on the case

```typescript
// A container place in the component that will be passed in as {children} or a function prop
export type Container = ReactNode | FC<any>
```

## Example

```jsx
<div className="container">{children}</div>
```

## arrayItems

An array type of data

```typescript
export type DataType =
  | Text
  | TextEnum
  | NumberType
  | BooleanValue
  | LocalDate
  | LocalTime
  | LocalDateTime
  | WebUrl
  | Email
  | Phone
  | Hostname
  | Regex
  | Guid
  | RichText
  | Container
  | ArrayItems
  | Direction
  | A11y
  | Image
  | Video
  | VectorArt
  | Audio
  | Link
// An array type of data
export type ArrayItems = Array<DataType | Record<string, DataType>>
```

## Example

```json
[
  "Item 1",
  "Item 2",
  {
    "name": "Custom Item",
    "value": 42,
    "active": true
  }
]
```

## direction

selected `direction` for the component according to [HTML `dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

```typescript
// Selected direction for the component according to the HTML dir attribute
export type Direction = 'rtl' | 'ltr' | 'auto'
```

## Example

```json
"ltr"
```

## className & id

Standard HTML attributes that are passed to your component and should be applied to the top-level element. The `className` prop contains CSS classes for styling, while `id` provides a unique identifier for the element.

```typescript
interface ComponentProps {
  className: string
  id: string
  // ... other props
}
```

## Example

```tsx
function MyComponent({ className, id, ...otherProps }: ComponentProps) {
  return (
    <div className={className} id={id}>
      {/* Component content */}
    </div>
  )
}
```

## wix

Wix is a special prop that holds a few things that the Wix ecosystem provides you.

## Removed Elements (`elementsRemovalState`)

The removed elements state contains the keys of this element's direct children that users have removed. Each element only receives removal state for its own children, as determined by the `removable` behavior defined in each child's [Behaviors](elements.md#behaviors) configuration.

> Any element that was marked as `REMOVED` should not be rendered at all.

```typescript
type REMOVED = 'REMOVED'
interface Wix {
  elementsRemovalState?: Record<string, REMOVED>
}
```

Used inside component props

```typescript
interface CompProps {
  wix: Wix;
  .... // More props
}
```

Example usage

```tsx
interface ParagraphProps {
	wix: Wix;
	text: Text;
	headerText?: Text;
}

function Paragraph(props: ParagraphProps) {
    const { wix, text, headerText} = props;
    const elementsRemovalState = wix?.elementsRemovalState || {};
    const removedElements = Object.keys(elementsRemovalState);

    return (
	<>
	 { !removedElements.includes('header') && <Header {headerText}>; }
	 { !removedElements.includes('icon') && <Icon>; }
	 <Paragraph {text}/>
	</>
    );
}
```

## Element Props `elementProps`

When your component defined [`elements`](elements.md) in the manifest that have [data](data.md) items, the props for these elements comes appear as first level part of the props in your component. For any additional internal elements, they will be again nested inside this namespace.
Note: `className` and `id` are top-level props only, and will not appear in nested `elementProps`

Type Definition

```typescript
interface elementProps {
  // The key here is the data key in the element, the value is according the DataType
  [string]: DataType
  // Additional props for more child elements, the key is the element name in the manifest
  elementProps?: Record<string, elementProps>
  // Wix-specific system props for this element
  wix?: Wix
}
```

Example of an Element using `elementProps`

```tsx
interface CardWrapperProps {
	className,
	id,
    // The string key is the element name in the manifest
	elementProps: Record<string, elementProps>;
	listTitle: Text;
}

interface CardItemProps {
    cardTitle: Text;
}

function CardWrapper(props: CardWrapperProps){
 const { listTitle, elementProps } = props;
 const cardItemProps = elementProps.cardItem; // in here there should be a `cardTitle` prop

 return (
	<div id={id} className=`${className} CardWrapper`>
	   <h3>{listTitle}</h3>
	   <CardItem className="CardItem" {...cardItemProps}/>
    </div>);
}
```

Example Manifest for this component

```json
{
  "type": "ItaisUI.CardWrapper",
  "description": "A simple Card",
  "resources": {
    ...
  },
  "editorElement": {
	"selector": ".CardWrapper",
	"displayName": "Card List",
	"data": {
	  "listTitle": {
		"dataType": "text",
		"displayName": "List Title",
		"defaultValue": "Featured Items"
   	  }
	},
    "elements": {
		"cardItem": {
			"elementType": "inlineElement",
			"inlineElement": {
				"selector": ".CardItem",
				"displayName": "Card Item",
				"data": {
				  "cardTitle": {
					"dataType": "text",
					"displayName": "Card Title",
					"defaultValue": "Card Title"
				  }
			   }
			}
		}
   	}
  }
}
```

---

## React Component Props Example

Here's an example of how to combine multiple data types in a React component props interface:

```typescript
interface ButtonComponentProps {
  // Wix className
  className: string
  // Wix id
  id: string
  // Text type for the button label
  label: Text
  // TextEnum type for button variants
  variant: TextEnum
  // A11y type for accessibility properties
  accessibility: A11y
}
```

## Example Usage

```tsx
import React from 'react';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  className,
  id,
  label,
  variant,
  accessibility
}) => {
  return (
    <button
      className={`${className} btn btn-${variant}`}
	  id={id}
      tabIndex={accessibility.tabIndex}
      role={accessibility.role}
      aria-label={accessibility.ariaLabel}
      aria-expanded={accessibility.ariaExpanded}
      aria-disabled={accessibility.ariaDisabled}
    >
      {label}
    </button>
  );
};

// Example props data
const exampleProps: ButtonComponentProps = {
  className: string;
  id: string;
  label: "Submit Form",
  variant: "primary",
  accessibility: {
    tabIndex: 0,
    role: "button",
    ariaLabel: "Submit the contact form",
    ariaExpanded: false,
    ariaDisabled: false
  }
};

// Usage
<ButtonComponent {...exampleProps} />
```
