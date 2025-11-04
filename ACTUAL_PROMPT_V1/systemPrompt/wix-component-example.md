# Best Practice Example: Feature Card Component

This example demonstrates how to create a complete Wix component following all best practices from the system prompt documentation.

## Example Request

**DESCRIPTION**: Create a feature card component that displays an icon, title, description, and an optional action button. The card should have a modern design with hover effects, be fully responsive, and allow customization of colors, spacing, and typography.

## Component Implementation

<react>
import React from 'react'
import './style.css'

type Text = string
type BooleanValue = boolean
type Image = {
uri: string
url: string
name?: string
width?: number
height?: number
}
type Link = {
href: string
target?: string
rel?: string
}
type VectorArt = {
uri: string
viewBox: string
svgContent: string
}

interface Wix {
elementsRemovalState?: Record<string, 'REMOVED'>
}

interface FeatureCardProps {
className: string
id: string
wix: Wix
title: Text
description: Text
showButton: BooleanValue
elementProps: {
icon: {
iconType: 'image' | 'vector'
image?: Image
vectorArt?: VectorArt
}
actionButton: {
buttonText: Text
buttonLink: Link
}
}
}

const FeatureCard: React.FC<FeatureCardProps> = ({
className,
id,
wix,
title = 'Feature Title',
description = 'Feature description goes here. This text explains the benefit or capability in detail.',
showButton = true,
elementProps,
}) => {
const isIconRemoved = wix?.elementsRemovalState?.icon === 'REMOVED'
const isButtonRemoved = wix?.elementsRemovalState?.actionButton === 'REMOVED'

    const iconProps = elementProps?.icon || {
    	iconType: 'vector' as const,
    	vectorArt: {
    		uri: '',
    		viewBox: '0 0 24 24',
    		svgContent:
    			'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7L12 12L22 7L12 2Z"/><path d="M2 17L12 22L22 17"/><path d="M2 12L12 17L22 12"/></svg>',
    	},
    }
    const buttonProps = elementProps?.actionButton || {
    	buttonText: 'Learn More',
    	buttonLink: { href: '#', target: '_self' },
    }

    const renderIcon = () => {
    	if (iconProps.iconType === 'image' && iconProps.image) {
    		return (
    			<img
    				className="feature-card__icon-image"
    				src={iconProps.image.url}
    				alt={iconProps.image.name || 'Feature icon'}
    				width={iconProps.image.width}
    				height={iconProps.image.height}
    			/>
    		)
    	}

    	if (iconProps.iconType === 'vector' && iconProps.vectorArt) {
    		return (
    			<div
    				className="feature-card__icon-vector"
    				dangerouslySetInnerHTML={{ __html: iconProps.vectorArt.svgContent }}
    			/>
    		)
    	}

	// Default fallback icon
	return (
		<div className="feature-card__icon-default">
			{/* SVG fill uses currentColor to inherit from parent's color token */}
			<svg viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2L2 7L12 12L22 7L12 2Z" />
				<path d="M2 17L12 22L22 17" />
				<path d="M2 12L12 17L22 12" />
			</svg>
		</div>
	)
    }

    return (
    	<article id={id} className={`${className} feature-card`}>
    		<div className="feature-card__content">
    			{!isIconRemoved && <div className="feature-card__icon">{renderIcon()}</div>}

    			<div className="feature-card__text">
    				<h3 className="feature-card__title">{title}</h3>
    				<p className="feature-card__description">{description}</p>
    			</div>

    			{showButton && !isButtonRemoved && (
    				<div className="feature-card__action">
    					<a
    						href={buttonProps.buttonLink.href}
    						target={buttonProps.buttonLink.target}
    						rel={buttonProps.buttonLink.rel}
    						className="feature-card__button"
    						role="button"
    					>
    						{buttonProps.buttonText}
    					</a>
    				</div>
    			)}
    		</div>
    	</article>
    )

}

export default FeatureCard
</react>
<css>
.feature-card {
box-sizing: border-box;
display: flex;
flex-direction: column;
background: linear-gradient(145deg, var(--wst-primary-background-color) 0%, var(--wst-secondary-background-color) 100%);
border: 1px solid var(--wst-system-line-1-color);
border-radius: clamp(0.75rem, 2vw, 1rem);
padding: clamp(1rem, 4vw, 1.5rem);
box-shadow: 0 1px 3px var(--wst-system-line-1-color);
height: 100%;
position: relative;
overflow: hidden;
}

.feature-card::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
height: 2px;
background: linear-gradient(90deg, var(--wst-accent-1-color), var(--wst-accent-4-color));
opacity: 0;
}

.feature-card\_\_content {
display: flex;
flex-direction: column;
align-items: flex-start;
gap: clamp(0.75rem, 3vw, 1rem);
height: 100%;
position: relative;
z-index: 1;
}

.feature-card\_\_icon {
display: flex;
align-items: center;
justify-content: center;
width: clamp(2.5rem, 8vw, 3rem);
height: clamp(2.5rem, 8vw, 3rem);
background: linear-gradient(135deg, var(--wst-primary-background-color) 0%, var(--wst-secondary-background-color) 100%);
border: 1px solid var(--wst-system-line-1-color);
border-radius: clamp(0.5rem, 2vw, 0.75rem);
color: var(--wst-links-and-actions-color);
flex-shrink: 0;
transition: transform 0.3s ease, background-color 0.3s ease;
position: relative;
overflow: hidden;
}

.feature-card\_\_icon::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: radial-gradient(circle at 30% 30%, var(--wst-accent-1-color), transparent 50%);
opacity: 0;
transition: opacity 0.3s ease;
}

.feature-card\_\_icon-image {
width: 100%;
height: 100%;
object-fit: contain;
border-radius: clamp(0.25rem, 1vw, 0.5rem);
transition: transform 0.3s ease;
}

.feature-card\_\_icon-image:hover {
transform: scale(1.05);
}

.feature-card\_\_icon-vector {
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
transition: transform 0.3s ease;
}

.feature-card\_\_icon-vector:hover {
transform: scale(1.1);
}

.feature-card\_\_icon-vector svg {
width: 100%;
height: 100%;
max-width: clamp(1.5rem, 5vw, 2rem);
max-height: clamp(1.5rem, 5vw, 2rem);
}

.feature-card\_\_icon-default {
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
transition: transform 0.3s ease;
}

.feature-card\_\_icon-default:hover {
transform: scale(1.1);
}

.feature-card\_\_icon-default svg {
width: clamp(1.25rem, 4vw, 1.5rem);
height: clamp(1.25rem, 4vw, 1.5rem);
}

.feature-card\_\_text {
flex: 1;
display: flex;
flex-direction: column;
gap: clamp(0.5rem, 2vw, 0.75rem);
width: 100%;
}

.feature-card\_\_title {
font-size: clamp(1.125rem, 4vw, 1.25rem);
font-weight: 600;
line-height: 1.3;
color: var(--wst-heading-1-color);
margin: 0;
letter-spacing: -0.025em;
transition: color 0.3s ease;
}

.feature-card\_\_title:hover {
color: var(--wst-links-and-actions-color);
}

.feature-card\_\_description {
font-size: clamp(0.875rem, 3vw, 0.9375rem);
line-height: 1.6;
color: var(--wst-paragraph-2-color);
margin: 0;
letter-spacing: 0.01em;
}

.feature-card\_\_action {
margin-top: auto;
width: 100%;
padding-top: clamp(0.5rem, 2vw, 0.75rem);
}

.feature-card**button {
display: inline-flex;
align-items: center;
justify-content: center;
padding: clamp(0.75rem, 3vw, 0.875rem) clamp(0.75rem, 3vw, 1.25rem);
background: linear-gradient(135deg, var(--wst-accent-1-color) 0%, var(--wst-accent-4-color) 100%);
color: var(--wst-base-1-color);
text-decoration: none;
border-radius: clamp(0.5rem, 2vw, 0.625rem);
font-weight: 500;
font-size: clamp(0.875rem, 3vw, 0.9375rem);
letter-spacing: 0.025em;
transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
border: none;
cursor: pointer;
min-height: clamp(2.5rem, 8vw, 2.75rem);
width: 100%;
box-sizing: border-box;
position: relative;
overflow: hidden;
}
</css>
<manifest>
{
"type": "ExampleUI.FeatureCard",
"description": "A modern feature card component with icon, title, description, and optional action button",
"editorElement": {
"selector": ".feature-card",
"displayName": "Feature Card",
"archetype": "container",
"data": {
"showButton": {
"dataType": "booleanValue",
"displayName": "Show Action Button",
"defaultValue": true
}
},
"cssProperties": {
"backgroundColor": {
"displayName": "Card Background",
"defaultValue": "var(--wst-base-1-color)"
},
"border": {
"displayName": "Card Border",
"defaultValue": "1px solid var(--wst-system-line-1-color)"
},
"borderRadius": {
"displayName": "Card Corner Radius",
"defaultValue": "12px"
},
"padding": {
"displayName": "Card Padding",
"defaultValue": "24px"
},
"boxShadow": {
"displayName": "Card Shadow",
"defaultValue": "0 1px 3px var(--wst-system-line-1-color)"
}
},
"elements": {
"icon": {
"elementType": "inlineElement",
"inlineElement": {
"selector": ".feature-card**icon",
"displayName": "Feature Icon",
"data": {
"iconType": {
"dataType": "textEnum",
"displayName": "Icon Type",
"defaultValue": "vector",
"textEnum": {
"options": [
{
"value": "vector",
"displayName": "Vector Icon"
},
{
"value": "image",
"displayName": "Image Icon"
}
]
}
},
"image": {
"dataType": "image",
"displayName": "Icon Image",
"image": {
"category": "IMAGE"
}
},
"vectorArt": {
"dataType": "vectorArt",
"displayName": "Vector Icon",
"vectorArt": {
"category": "SHAPE_ART"
}
}
},
"cssProperties": {
"width": {
"displayName": "Icon Size",
"defaultValue": "48px"
},
"height": {
"displayName": "Icon Height",
"defaultValue": "48px"
},
"backgroundColor": {
"displayName": "Icon Background",
"defaultValue": "var(--wst-secondary-background-color)"
},
"color": {
"displayName": "Icon Color",
"defaultValue": "var(--wst-links-and-actions-color)"
},
"borderRadius": {
"displayName": "Icon Border Radius",
"defaultValue": "8px"
}
},
"behaviors": {
"selectable": true,
"removable": true
}
}
},
"title": {
"elementType": "inlineElement",
"inlineElement": {
"selector": ".feature-card**title",
"displayName": "Feature Title",
"data": {
"title": {
"dataType": "text",
"displayName": "Feature Title",
"defaultValue": "Feature Title",
"text": {
"maxLength": 100,
"minLength": 1
}
}
},
"cssProperties": {
"fontSize": {
"displayName": "Title Font Size",
"defaultValue": "20px"
},
"fontWeight": {
"displayName": "Title Font Weight",
"defaultValue": "600"
},
"color": {
"displayName": "Title Color",
"defaultValue": "var(--wst-heading-1-color)"
},
"lineHeight": {
"displayName": "Title Line Height",
"defaultValue": "1.3"
}
},
"behaviors": {
"selectable": true,
"removable": false
}
}
},
"description": {
"elementType": "inlineElement",
"inlineElement": {
"selector": ".feature-card**description",
"displayName": "Feature Description",
"data": {
"description": {
"dataType": "text",
"displayName": "Feature Description",
"defaultValue": "Feature description goes here. This text explains the benefit or capability in detail.",
"text": {
"maxLength": 300,
"minLength": 1
}
}
},
"cssProperties": {
"fontSize": {
"displayName": "Description Font Size",
"defaultValue": "14px"
},
"color": {
"displayName": "Description Color",
"defaultValue": "var(--wst-paragraph-2-color)"
},
"lineHeight": {
"displayName": "Description Line Height",
"defaultValue": "1.6"
}
},
"behaviors": {
"selectable": true,
"removable": false
}
}
},
"actionButton": {
"elementType": "inlineElement",
"inlineElement": {
"selector": ".feature-card\_\_button",
"displayName": "Action Button",
"data": {
"buttonText": {
"dataType": "text",
"displayName": "Button Text",
"defaultValue": "Learn More",
"text": {
"maxLength": 50,
"minLength": 1
}
},
"buttonLink": {
"dataType": "link",
"displayName": "Button Link",
"link": {
"linkTypes": ["externalLink", "pageLink", "anchorLink"]
}
}
},
"cssProperties": {
"backgroundColor": {
"displayName": "Button Background",
"defaultValue": "var(--wst-accent-1-color)"
},
"color": {
"displayName": "Button Text Color",
"defaultValue": "var(--wst-base-1-color)"
},
"padding": {
"displayName": "Button Padding",
"defaultValue": "12px 24px"
},
"borderRadius": {
"displayName": "Button Border Radius",
"defaultValue": "8px"
},
"fontSize": {
"displayName": "Button Font Size",
"defaultValue": "14px"
},
"fontWeight": {
"displayName": "Button Font Weight",
"defaultValue": "500"
}
},
"behaviors": {
"selectable": true,
"removable": true
}
}
}
},
"layout": {
"resizeDirection": "horizontalAndVertical",
"contentResizeDirection": "vertical"
}
},
"installation": {
"initialSize": {
"width": {
"sizingType": "pixels",
"pixels": 320
},
"height": {
"sizingType": "content"
}
}
}
}
</manifest>

## Best Practices Demonstrated

### 1. **Complete Component Architecture**

- ✅ React component with proper TypeScript interfaces
- ✅ CSS with modern design principles and responsive behavior
- ✅ Comprehensive manifest covering all editable aspects

### 2. **Wix Component Model Compliance**

- ✅ Proper data types (text, booleanValue, image, vectorArt, link)
- ✅ CSS properties matching actual CSS implementation
- ✅ Element hierarchy with nested inline elements
- ✅ Removal state handling with `wix.elementsRemovalState`

### 3. **User Experience**

- ✅ Meaningful element structure (icon, title, description, button)
- ✅ Flexible content (optional button, different icon types)
- ✅ Sensible default values
