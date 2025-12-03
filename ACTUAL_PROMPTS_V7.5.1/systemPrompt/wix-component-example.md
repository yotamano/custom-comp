# Best Practice Example

Demonstrates: Sophisticated design brief, responsive React/TypeScript, modern CSS without media queries, complete manifest, perfect synchronization, SSR-safe, optional element handling.

**Request**: "Create a product card with an image, title, price, and a call-to-action button. It should have a modern look with nice hover effects."

**Output**:

<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 2/5 (Standard content display with conditional badge and button)
Expressive Complexity: 4/5 (Orchestrated hover animations: image zoom, card lift, button icon slide)

USER DESIGN DIRECTION
Minimal guidance - user requested "modern design with nice hover effects"

DESIGN BRIEF
Core Concept: Premium product card for AI/tech product with sophisticated hover animations creating dynamic, engaging UX. Demonstrates combining media, typography, and motion for premium, interactive feel.

Strategic Framework: Vibrant & Expressive
Visual Profile: Futuristic, Dynamic, Premium
Design Style: Contemporary AI/tech aesthetic

Color Palette (Hard-Coded Values):
- #FFFFFF (white) main card background - clean, modern
- #000000 (black) primary text - maximum contrast, readability
- #032262 (deep navy) CTA button - trust, authority
- #88C0FF (sky blue) button hover - interactive energy
- #D1FFAE (lime) promotional badge - standout

Typography (Hard-Coded Values):
- Title (h2): 700 24px/1.2em wix-madefor-display-v2
- Price: 600 20px/1.2em wix-madefor-display-v2
- Description: 400 16px/1.5em wix-madefor-display-v2
- Button: 500 16px/1.4em wix-madefor-display-v2

Spacing & Layout:
- Single-column with `gap` for vertical rhythm
- Responsive padding `clamp(1.5rem, 4vw, 2rem)`
- Works gracefully 280px+

COHESIVE VISUAL SYSTEM:
- Corner Radius: 12px card, 8px image/button - consistent, modern
- Shadows: Soft `0 2px 8px rgba(3, 34, 98, 0.08)` deepens on hover to `0 8px 24px rgba(3, 34, 98, 0.12)` for tactile lift
- Borders: None - relies on shadows/backgrounds for separation

Interaction: Card lifts `translateY(-4px)` with deepening shadow, image zooms `scale(1.05)`, button icon slides `translateX(4px)`. All use spring-like `cubic-bezier(0.34, 1.56, 0.64, 1)` at 300-400ms for smooth, satisfying feel.

Anti-Default Strategy: Orchestrated hover animations provide rich visual feedback. Vibrant, purposeful AI-themed palette escapes generic design.

Design Rationale: Demonstrates CSS mastery via image zoom in overflow-hidden container and synchronized hover animations. Shows how to create high-quality, interactive, premium-feeling components using pure CSS within all technical constraints.
</design-brief>

<react>
import React, { useState } from 'react';
import './style.css';
import { productImage } from './assets/defaultImages';

type Text = string;
type Link = {
  href: string;
  target?: string;
  rel?: string;
};

type Media = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

interface Wix {
  elementsRemovalState?: Record<string, 'REMOVED'>;
}

interface ProductCardProps {
  className: string;
  id: string;
  wix?: Wix;
  elementProps: {
    badge?: {
      badgeText: Text;
    };
    image?: {
      image: Media;
    };
    title?: {
      titleText: Text;
    };
    price?: {
      priceText: Text;
    };
    tags?: {
      tags: Text[];
    };
    description?: {
      descriptionText: Text;
    };
    button?: {
      buttonText: Text;
      buttonLink: Link;
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  className,
  id,
  wix,
  elementProps,
}) => {
  const elementsRemovalState = wix?.elementsRemovalState || {};

  const badgeText = elementProps?.badge?.badgeText || 'New';
  const image = elementProps?.image?.image || { src: productImage, alt: 'AI Product Image' };
  const title = elementProps?.title?.titleText || 'AI-Powered Insights';
  const price = elementProps?.price?.priceText || '$99.00';
  const tags = elementProps?.tags?.tags || ['AI', 'Premium', 'New'];
  const description = elementProps?.description?.descriptionText || 'Unlock unparalleled insights with our cutting-edge AI analysis tool.';
  const button = elementProps?.button;
  const buttonText = button?.buttonText || 'Learn More';
  const buttonLink = button?.buttonLink;

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonLink?.href || buttonLink.href === '#') {
      e.preventDefault();
    }
  };

  return (
    <div className={`product-card ${className}`} id={id}>
      <div className="product-card__image-wrapper">
        {!elementsRemovalState['image'] && image?.src && (
          <img
            className="product-card__image"
            src={image.src}
            alt={image.alt || title}
            width={image.width}
            height={image.height}
            loading="lazy"
          />
        )}
        {!elementsRemovalState['badge'] && badgeText && (
          <div className="product-card__badge">{badgeText}</div>
        )}
      </div>
      <div className="product-card__content">
        {!elementsRemovalState['title'] && <h2 className="product-card__title">{title}</h2>}
        {!elementsRemovalState['price'] && <p className="product-card__price">{price}</p>}
        {!elementsRemovalState['tags'] && tags?.length > 0 && (
          <div className="product-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="product-card__tag">{tag}</span>
            ))}
          </div>
        )}
        {!elementsRemovalState['description'] && <p className="product-card__description">{description}</p>}
        {!elementsRemovalState['button'] && button && (
          <a
            href={buttonLink?.href || '#'}
            target={buttonLink?.target}
            rel={buttonLink?.rel}
            onClick={handleButtonClick}
            className="product-card__button"
          >
            <span>{buttonText}</span>
            <svg
              className="product-card__button-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 10h12m0 0l-4-4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
</react>

<productImage>
{
  "description": "A high-tech product photograph featuring futuristic AI technology with sleek metallic surfaces and glowing blue circuit patterns. The image showcases a modern device or interface with clean lines and a professional tech aesthetic, using a color palette of deep navy blues (#032262), bright sky blues (#88C0FF), and metallic silver accents against a subtle gradient background. The composition is dynamic yet professional, suitable for an AI/tech product showcase.",
  "width": 1062,
  "height": 926
}
</productImage>

<css>
* {
  box-sizing: border-box;
}

@keyframes contentAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(3, 34, 98, 0.08);
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(3, 34, 98, 0.12);
}

.product-card__image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  position: relative;
  opacity: 0;
  animation: contentAppear 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 100ms;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  background: #D1FFAE;
  color: #000000;
  font: normal normal 600 12px/1.3em wix-madefor-display-v2;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.5rem, 4vw, 2rem);
  flex-grow: 1;
  opacity: 0;
  animation: contentAppear 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 250ms;
}

.product-card__title {
  margin: 0;
  font: normal normal 700 24px/1.2em wix-madefor-display-v2;
  color: #000000;
}

.product-card__price {
  margin: 0;
  font: normal normal 600 20px/1.2em wix-madefor-display-v2;
  color: #000000;
}

.product-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.product-card__tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(3, 34, 98, 0.08);
  color: #032262;
  font: normal normal 500 12px/1.3em wix-madefor-display-v2;
  border-radius: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__description {
  margin: 0;
  font: normal normal 400 16px/1.5em wix-madefor-display-v2;
  color: #000000;
  opacity: 0.7;
  flex-grow: 1;
}

.product-card__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #032262;
  color: #FFFFFF;
  font: normal normal 500 16px/1.4em wix-madefor-display-v2;
  text-decoration: none;
  border: 1px solid #032262;
  border-radius: 15px;
  align-self: flex-start;
  margin-top: 1rem;
  transition: background-color 300ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.product-card__button:hover {
  background-color: #88C0FF;
  border-color: #88C0FF;
}

.product-card__button-icon {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.product-card__button:hover .product-card__button-icon {
  transform: translateX(4px);
}

.product-card__button:focus-visible {
    outline: 2px solid #032262;
    outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</css>

<manifest>
{
  "type": "ProductCard",
  "description": "A premium product card demonstrating sophisticated hover animations, media integration, and a modern AI-themed design.",
  "editorElement": {
    "selector": ".product-card",
    "displayName": "Product Card",
    "cssProperties": {
      "backgroundColor": { "displayName": "Card Background", "defaultValue": "#FFFFFF" },
      "borderRadius": { "displayName": "Corner Radius", "defaultValue": "12px" },
      "boxShadow": { "displayName": "Shadow", "defaultValue": "0 2px 8px rgba(3, 34, 98, 0.08)" }
    },
    "elements": {
      "badge": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__badge",
          "displayName": "Badge",
          "cssProperties": {
            "backgroundColor": { "displayName": "Background", "defaultValue": "#D1FFAE" },
            "font": { "displayName": "Font", "defaultValue": "normal normal 600 12px/1.3em wix-madefor-display-v2" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "block"] } }
          },
          "data": {
            "badgeText": { "dataType": "text", "displayName": "Badge Text", "defaultValue": "New" }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      },
      "image": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__image",
          "displayName": "Product Image",
          "data": {
            "image": {
              "dataType": "image",
              "displayName": "Image",
              "defaultValue": "{\"src\":\"productImage\",\"alt\":\"AI Product Image\"}"
            }
          },
          "cssProperties": {
            "borderRadius": { "displayName": "Corner Radius", "defaultValue": "8px" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "block"] } }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      },
      "title": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__title",
          "displayName": "Title",
          "data": {
            "titleText": { "dataType": "text", "displayName": "Title Text", "defaultValue": "AI-Powered Insights" }
          },
          "cssProperties": {
            "font": { "displayName": "Font", "defaultValue": "normal normal 700 24px/1.2em wix-madefor-display-v2" },
            "color": { "displayName": "Color", "defaultValue": "#000000" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "block"] } }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      },
      "price": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__price",
          "displayName": "Price",
          "data": {
            "priceText": { "dataType": "text", "displayName": "Price Text", "defaultValue": "$99.00" }
          },
          "cssProperties": {
            "font": { "displayName": "Font", "defaultValue": "normal normal 600 20px/1.2em wix-madefor-display-v2" },
            "color": { "displayName": "Color", "defaultValue": "#000000" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "block"] } }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      },
      "tags": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__tags",
          "displayName": "Product Tags",
          "data": {
            "tags": {
              "dataType": "arrayItems",
              "displayName": "Tags",
              "arrayItems": {
                "dataItem": { "dataType": "text" },
                "maxSize": 5
              },
              "defaultValue": "[\"AI\",\"Premium\",\"New\"]"
            }
          },
          "cssProperties": {
            "gap": { "displayName": "Gap", "defaultValue": "0.5rem" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "flex"] } }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      },
      "description": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__description",
          "displayName": "Description",
          "data": {
            "descriptionText": { "dataType": "text", "displayName": "Description Text", "defaultValue": "Unlock unparalleled insights with our cutting-edge AI analysis tool." }
          },
          "cssProperties": {
            "font": { "displayName": "Font", "defaultValue": "normal normal 400 16px/1.5em wix-madefor-display-v2" },
            "color": { "displayName": "Color", "defaultValue": "#000000" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "block"] } }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      },
      "button": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__button",
          "displayName": "Button",
          "cssProperties": {
            "backgroundColor": { "displayName": "Background", "defaultValue": "#032262" },
            "color": { "displayName": "Text Color", "defaultValue": "#FFFFFF" },
            "display": { "statesDefaultValues": {}, "display": { "displayValues": ["none", "inline_flex"] } }
          },
          "data": {
            "buttonText": { "dataType": "text", "displayName": "Text", "defaultValue": "Learn More" },
            "buttonLink": { "dataType": "link", "displayName": "Link", "defaultValue": "{\"href\":\"#\"}" }
          },
          "behaviors": { "selectable": true, "removable": true }
        }
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    },
    "archetype": "container"
  }
}
</manifest>
