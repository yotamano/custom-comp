# Product Card with Advanced Animation Example

This example demonstrates the pinnacle of component design—combining media integration, sophisticated hover animations, and perfect technical synchronization into a concise, reusable card.

**Design Excellence:**
- ✅ Rich media integration with responsive image zoom-on-hover effect.
- ✅ Spring-like `cubic-bezier(0.34, 1.56, 0.64, 1)` mimics Framer Motion physics for all interactions.
- ✅ Tightly orchestrated hover animations (card lift, image zoom, button icon slide).
- ✅ Clear typographic hierarchy (Title → Price → Description → Button).
- ✅ Strategic use of hard-coded AI-themed color values for full control.
- ✅ Interactive button with an animated icon that slides on hover.
- ✅ Optional badge element for promotions or status.

**Technical Excellence:**
- ✅ Complete manifest exposing all editable properties and conditional elements.
- ✅ Perfect synchronization between React, CSS, and Manifest.
- ✅ Hard-coded colors and fonts for maximum clarity.
- ✅ Pure CSS animations with spring-like easing curves.
- ✅ SSR-safe implementation with no browser APIs at module scope.
- ✅ Responsive typography and padding using `clamp()`.
- ✅ Semantic HTML structure (`h2` for title, `p` for description).

### Example Request
"Create a product card with an image, title, price, and a call-to-action button. It should have a modern look with nice hover effects."

### Example Output

<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 2/5 (Standard content display with conditional badge and button)
Expressive Complexity: 4/5 (Orchestrated hover animations: image zoom, card lift, button icon slide)

USER DESIGN DIRECTION
Minimal guidance provided - user requested "modern design with nice hover effects"

DESIGN BRIEF
Core Concept: A premium product card for an AI/tech product that uses sophisticated hover animations to create a dynamic and engaging user experience. The design demonstrates how to combine media, typography, and motion to make a simple component feel premium and interactive.

Strategic Framework: Vibrant & Expressive
Visual Profile: Futuristic, Dynamic, Premium
Design Style: Contemporary AI/tech aesthetic

Color Palette (Hard-Coded Values):
- #FFFFFF (white) for the main card background to feel clean and modern.
- #000000 (black) for primary text (title, price, description) for maximum contrast and readability.
- #032262 (deep navy) for the primary CTA button, conveying trust and authority.
- #88C0FF (sky blue) for button hover states, adding a touch of interactive energy.
- #D1FFAE (lime energy) for the promotional badge, making it stand out.

Typography (Hard-Coded Values):
- Title (h2): 700 24px/1.2em wix-madefor-display-v2
- Price: 600 20px/1.2em wix-madefor-display-v2
- Description: 400 16px/1.5em wix-madefor-display-v2
- Button: 500 16px/1.4em wix-madefor-display-v2

Spacing & Layout:
- A single-column layout within the card, using `gap` for consistent vertical rhythm.
- Responsive internal padding `clamp(1.5rem, 4vw, 2rem)` for fluid spacing.
- Designed to work gracefully in any container from 280px upwards.

COHESIVE VISUAL SYSTEM (Pairs With):
- Corner Radius: 12px for the card, 8px for the image and button, creating a consistent, modern feel.
- Shadows: A soft shadow `0 2px 8px rgba(3, 34, 98, 0.08)` that deepens on hover to `0 8px 24px rgba(3, 34, 98, 0.12)` for a tactile lift effect.
- Borders: None. The design relies on shadows and background colors for separation.

Interaction: On hover, the entire card lifts `translateY(-4px)` and its shadow deepens. Simultaneously, the product image inside zooms `scale(1.05)`, and the button's icon slides `translateX(4px)`. All animations use a spring-like `cubic-bezier(0.34, 1.56, 0.64, 1)` with a 300-400ms duration for a smooth, satisfying feel.

Anti-Default Strategy: Avoids static, boring cards by implementing an orchestrated hover animation that provides rich visual feedback. Escapes generic design by using a vibrant, purposeful AI-themed color palette.

Design Rationale: This example demonstrates CSS mastery through the image zoom effect within an overflow-hidden container and the synchronized hover animations. It teaches the LLM how to create a high-quality, interactive component that feels alive and premium, using only pure CSS and adhering to all technical constraints.
</design-brief>

<react>
import React, { useState } from 'react';
import './style.css';

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
  image: Media;
  title: Text;
  price: Text;
  description: Text;
  elementProps: {
    badge?: {
      badgeText: Text;
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
  image = { src: 'https://static.wixstatic.com/media/11062b_b9af6aff973140adadd9887cd5661f66~mv2.jpg/v1/fill/w_1062,h_926,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg', alt: 'AI Product Image' },
  title = 'AI-Powered Insights',
  price = '$99.00',
  description = 'Unlock unparalleled insights with our cutting-edge AI analysis tool.',
  elementProps,
}) => {
  const elementsRemovalState = wix?.elementsRemovalState || {};

  const isBadgeRemoved = elementsRemovalState['badge'] === 'REMOVED';
  const isButtonRemoved = elementsRemovalState['button'] === 'REMOVED';

  const badgeText = elementProps?.badge?.badgeText || 'New';
  const button = elementProps?.button;
  const buttonText = button?.buttonText || 'Learn More';
  const buttonLink = button?.buttonLink || { href: '#' };

  return (
    <div className={`product-card ${className}`} id={id}>
      <div className="product-card__image-wrapper">
        <img
          className="product-card__image"
          src={image.src}
          alt={image.alt || title}
          width={image.width}
          height={image.height}
          loading="lazy"
        />
        {!isBadgeRemoved && badgeText && (
          <div className="product-card__badge">{badgeText}</div>
        )}
      </div>
      <div className="product-card__content">
        <h2 className="product-card__title">{title}</h2>
        <p className="product-card__price">{price}</p>
        <p className="product-card__description">{description}</p>
        {!isButtonRemoved && button && (
          <a
            href={buttonLink.href}
            target={buttonLink.target}
            rel={buttonLink.rel}
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
  overflow: hidden; /* Added to contain child animations */
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
  opacity: 0; /* Hide before animation */
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
  opacity: 0; /* Hide before animation */
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
      "backgroundColor": {
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF"
      },
      "borderRadius": {
        "displayName": "Card Corner Radius",
        "defaultValue": "12px"
      },
      "boxShadow": {
        "displayName": "Card Shadow",
        "defaultValue": "0 2px 8px rgba(3, 34, 98, 0.08)",
        "statesDefaultValues": {
          "hover": "0 8px 24px rgba(3, 34, 98, 0.12)"
        }
      }
    },
    "data": {
       "image": {
        "dataType": "image",
        "displayName": "Product Image",
        "defaultValue": { "src": "https://static.wixstatic.com/media/11062b_b9af6aff973140adadd9887cd5661f66~mv2.jpg/v1/fill/w_1062,h_926,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg", "alt": "AI Product Image" }
      },
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "AI-Powered Insights"
      },
      "price": {
        "dataType": "text",
        "displayName": "Price",
        "defaultValue": "$99.00"
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Unlock unparalleled insights with our cutting-edge AI analysis tool."
      }
    },
    "elements": {
      "imageWrapper": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__image-wrapper",
          "displayName": "Image Container",
          "cssProperties": {
            "borderRadius": {
              "displayName": "Image Corner Radius",
              "defaultValue": "8px 8px 0 0"
            }
          }
        }
      },
      "badge": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__badge",
          "displayName": "Badge",
          "cssProperties": {
            "backgroundColor": { "displayName": "Background", "defaultValue": "#D1FFAE" },
            "color": { "displayName": "Text Color", "defaultValue": "#000000" },
            "font": { "displayName": "Font", "defaultValue": "normal normal 600 12px/1.3em wix-madefor-display-v2" },
            "borderRadius": { "displayName": "Corner Radius", "defaultValue": "4px" }
          },
          "data": {
            "badgeText": {
              "dataType": "text",
              "displayName": "Text",
              "defaultValue": "New"
            }
          },
          "behaviors": {
            "selectable": true,
            "removable": true
          }
        }
      },
      "content": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__content",
          "displayName": "Content Area",
          "cssProperties": {
            "padding": { "displayName": "Padding", "defaultValue": "clamp(1.5rem, 4vw, 2rem)" },
            "gap": { "displayName": "Content Gap", "defaultValue": "0.75rem" }
          }
        }
      },
      "title": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__title",
          "displayName": "Title",
          "cssProperties": {
            "font": { "displayName": "Font", "defaultValue": "normal normal 700 24px/1.2em wix-madefor-display-v2" },
            "color": { "displayName": "Color", "defaultValue": "#000000" }
          }
        }
      },
      "price": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__price",
          "displayName": "Price",
          "cssProperties": {
            "font": { "displayName": "Font", "defaultValue": "normal normal 600 20px/1.2em wix-madefor-display-v2" },
            "color": { "displayName": "Color", "defaultValue": "#000000" }
          }
        }
      },
      "description": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__description",
          "displayName": "Description",
          "cssProperties": {
            "font": { "displayName": "Font", "defaultValue": "normal normal 400 16px/1.5em wix-madefor-display-v2" },
            "color": { "displayName": "Color", "defaultValue": "#000000" }
          }
        }
      },
      "button": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".product-card__button",
          "displayName": "Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Background", "defaultValue": "#032262",
              "statesDefaultValues": { "hover": "#88C0FF" }
            },
            "color": { "displayName": "Text Color", "defaultValue": "#FFFFFF" },
            "font": { "displayName": "Font", "defaultValue": "normal normal 500 16px/1.4em wix-madefor-display-v2" },
            "borderRadius": { "displayName": "Corner Radius", "defaultValue": "15px" },
            "padding": { "displayName": "Padding", "defaultValue": "0.75rem 1.5rem" },
            "border": {
              "displayName": "Border", "defaultValue": "1px solid #032262",
              "statesDefaultValues": { "hover": "1px solid #88C0FF" }
            }
          },
          "data": {
            "buttonText": {
              "dataType": "text",
              "displayName": "Text",
              "defaultValue": "Learn More"
            },
            "buttonLink": {
              "dataType": "link",
              "displayName": "Link"
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
    },
    "archetype": "container"
  }
}
</manifest>
