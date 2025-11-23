# Best Practice Example

This example demonstrates the full potential of the design system through a Premium Pricing Card that balances sophistication with creative expressiveness:

**Design Excellence:**
- ✅ Strategic use of multiple accent tokens for visual hierarchy
- ✅ Color zones create distinction without chaos
- ✅ Generous spacing showcases confidence over cramped layouts
- ✅ Bold typography choices demonstrate creative defaults
- ✅ Sophisticated interactions enhance, don't distract

**Technical Excellence:**
- ✅ A complete manifest exposing all editable properties
- ✅ Perfect synchronization between React, CSS, and Manifest
- ✅ Modern CSS without media queries using clamp()
- ✅ SSR-safe implementation with proper guards
- ✅ Proper handling of optional elements and states
- ✅ Token-only color system (no raw hex/rgb/hsl)

**Strategic Demonstration:**
This example shows how to make intentional design decisions when given minimal direction—using the full token palette creatively while maintaining elegance. It prevents generic LLM defaults by showcasing what "wow" looks like within the constraints of a token system.

### Example Request
"Create a pricing card with plan features and subscribe button"

### Example Output

<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 2/5 (Content display with conditional features list and CTA)
Expressive Complexity: 4/5 (Multiple color zones, bold typography, sophisticated hover states, visual hierarchy through accent usage)

USER DESIGN DIRECTION
Minimal guidance provided - user requested "pricing card with plan features and subscribe button"

DESIGN BRIEF
Core Concept: A premium pricing card that demonstrates creative confidence through bold typography, strategic accent color zones, and generous spacing—showcasing how to use the full token palette to create visual hierarchy without chaos.

Strategic Framework: Vibrant & Expressive with Sophisticated restraint
Visual Profile: Dynamic, Contemporary, Confident
Design Style: Contemporary Bento with editorial influence

Color Palette Analysis:
- Header Zone (var(--wst-accent-4-color)): Light accent tint (typically L>90%) creates a colorful distinction zone for plan identification
- Card Background (var(--wst-primary-background-color)): Clean white base ensures readability and lets accent zones stand out
- Price Emphasis (var(--wst-accent-1-color)): Primary brand accent draws eye to key conversion metric
- Feature Highlights (var(--wst-accent-3-color)): Alternate accent for checkmark icons creates visual rhythm without competing with CTA
- CTA Button (var(--wst-accent-1-color)): Primary accent for main action, with accent-3 hover for tactile feedback
- Text Hierarchy (heading-4-color, paragraph-2-color): High-contrast tokens ensure legibility across color zones

Typography:
- Plan name uses var(--wst-heading-4-font) in accent-4 header for clear identification
- Price uses var(--wst-heading-2-font) with accent-1 color for dramatic emphasis (large scale = confidence)
- Price period uses var(--wst-paragraph-3-font) with shade-3 for subtle de-emphasis
- Features use var(--wst-paragraph-2-font) for comfortable reading
- CTA uses var(--wst-button-primary-font) for brand consistency
- All composite tokens used—no font property overrides

Spacing & Layout:
- Container fills bounding box naturally (width: 100%)
- Generous fixed spacing demonstrates confidence: 2rem header padding, 2.5rem price section, 1.5rem features
- Tight feature list gaps (0.75rem) create cohesion, contrasted with generous section spacing
- Works gracefully across 280px-1200px containers and all viewports
- Visual rhythm through varied spacing: tight lists, generous emphasis areas

COHESIVE VISUAL SYSTEM (Pairs With):
- Corner Radius: Moderate rounded (12px card, 8px button, 6px header zone) creates contemporary warmth
- Shadows: Soft elevated depth (0 4px 16px rgba) suggests premium quality, intensifies on hover
- Borders: None—relies on accent-4 header and shadows for definition, cleaner than bordered approach
- Letter-spacing: 0em for body, 0.02em for large price (slight openness at display scale)

Interaction: Card lifts on hover with translateY(-8px) and shadow deepens; CTA button scales (1.05) with color shift to accent-3; checkmark icons have subtle scale pulse (1.1) on card hover for playful detail
Key Animation: 300ms ease-out for card lift, 200ms for button interactions, staggered 50ms delays on checkmarks create cascading effect

Anti-Default Strategy: Avoids generic white cards with thin borders by using accent-4 header zone for visual interest. Prevents timid typography by using heading-2 for price (confidence over caution). Escapes monotone design through strategic accent-3 highlights. Creates depth without heavy borders through shadow layering.

Design Rationale: This approach showcases creative use of the token system—accent-4 for colorful zones, accent-1 for emphasis and CTAs, accent-3 for complementary highlights. The Bento-style header zone breaks monotony while staying sophisticated. Bold heading-2 price and generous 2.5rem spacing demonstrate confidence. Multiple accent usage creates visual hierarchy and rhythm without chaos, teaching designers that "colorful" doesn't mean "cluttered" when tokens are used strategically.
</design-brief>

<react>
import React from 'react'
import './style.css'

type Text = string
type BooleanValue = boolean
type Link = {
  href: string
  target?: string
  rel?: string
}

interface Feature {
  text: Text
}

interface Wix {
  elementsRemovalState?: Record<string, 'REMOVED'>
}

interface PricingCardProps {
  className: string
  id: string
  wix: Wix
  planName: Text
  price: Text
  pricePeriod: Text
  description: Text
  features: Feature[]
  elementProps: {
    ctaButton: {
      buttonText: Text
      buttonLink: Link
    }
  }
}

const PricingCard: React.FC<PricingCardProps> = ({
  className,
  id,
  wix,
  planName = 'Professional',
  price = '$49',
  pricePeriod = '/month',
  description = 'Perfect for growing teams',
  features = [
    { text: 'Unlimited projects' },
    { text: 'Advanced analytics' },
    { text: 'Priority support' },
    { text: 'Custom integrations' }
  ],
  elementProps
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const isCTARemoved = wix.elementsRemovalState?.['ctaButton'] === 'REMOVED'

  return (
    <div 
      className={`pricing-card ${className}`} 
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pricing-card__header">
        <h3 className="pricing-card__plan-name">{planName}</h3>
      </div>

      <div className="pricing-card__price-section">
        <div className="pricing-card__price-wrapper">
          <span className="pricing-card__price">{price}</span>
          <span className="pricing-card__period">{pricePeriod}</span>
        </div>
        <p className="pricing-card__description">{description}</p>
      </div>

      <ul className="pricing-card__features">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className="pricing-card__feature"
            style={{
              transitionDelay: isHovered ? `${index * 50}ms` : '0ms'
            }}
          >
            <svg 
              className="pricing-card__checkmark" 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                d="M16.6667 5L7.50004 14.1667L3.33337 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {!isCTARemoved && elementProps?.ctaButton && (
        <a
          href={elementProps.ctaButton.buttonLink?.href || '#'}
          target={elementProps.ctaButton.buttonLink?.target}
          rel={elementProps.ctaButton.buttonLink?.rel}
          className="pricing-card__cta"
        >
          {elementProps.ctaButton.buttonText || 'Get Started'}
        </a>
      )}
    </div>
  )
}

export default PricingCard
</react>

<css>
* {
  box-sizing: border-box;
}

.pricing-card {
  width: 100%;
  background: var(--wst-primary-background-color);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 16px 48px rgba(0, 0, 0, 0.08);
}

.pricing-card__header {
  background: var(--wst-accent-4-color);
  padding: 2rem;
  border-radius: 6px 6px 0 0;
}

.pricing-card__plan-name {
  margin: 0;
  font: var(--wst-heading-4-font);
  color: var(--wst-heading-4-color);
  text-align: center;
}

.pricing-card__price-section {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--wst-shade-2-color);
}

.pricing-card__price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.pricing-card__price {
  font: var(--wst-heading-2-font);
  color: var(--wst-accent-1-color);
  letter-spacing: 0.02em;
  line-height: 1;
}

.pricing-card__period {
  font: var(--wst-paragraph-3-font);
  color: var(--wst-shade-3-color);
}

.pricing-card__description {
  margin: 0;
  font: var(--wst-paragraph-2-font);
  color: var(--wst-paragraph-2-color);
  text-align: center;
}

.pricing-card__features {
  list-style: none;
  margin: 0;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pricing-card__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font: var(--wst-paragraph-2-font);
  color: var(--wst-paragraph-2-color);
  transition: transform 200ms ease-out;
}

.pricing-card:hover .pricing-card__feature {
  transform: scale(1.02);
}

.pricing-card__checkmark {
  flex-shrink: 0;
  color: var(--wst-accent-3-color);
  transition: transform 200ms ease-out;
}

.pricing-card:hover .pricing-card__checkmark {
  transform: scale(1.1);
}

.pricing-card__cta {
  display: block;
  margin: 0 2rem 2rem;
  padding: 1rem 2rem;
  background: var(--wst-accent-1-color);
  color: var(--wst-base-1-color);
  font: var(--wst-button-primary-font);
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 200ms ease-out, transform 200ms ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pricing-card__cta:hover {
  background: var(--wst-accent-3-color);
  transform: scale(1.05);
}

.pricing-card__cta:focus {
  outline: 2px solid var(--wst-accent-1-color);
  outline-offset: 2px;
}

.pricing-card__cta:active {
  transform: scale(0.98);
}
</css>

<manifest>
{
  "type": "PricingCard",
  "description": "A premium pricing card component with colorful header zone, bold price display, feature list with checkmarks, and prominent CTA—showcasing creative use of the token system for visual hierarchy",
  "editorElement": {
    "selector": ".pricing-card",
    "displayName": "Pricing Card",
    "cssProperties": {
      "backgroundColor": {
        "displayName": "Card Background",
        "defaultValue": "var(--wst-primary-background-color)"
      },
      "borderRadius": {
        "displayName": "Card Corner Radius",
        "defaultValue": "12px"
      },
      "boxShadow": {
        "displayName": "Card Shadow",
        "defaultValue": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "statesDefaultValues": {
          "hover": "0 8px 24px rgba(0, 0, 0, 0.12), 0 16px 48px rgba(0, 0, 0, 0.08)"
        }
      },
      "transform": {
        "displayName": "Card Transform",
        "defaultValue": "translateY(0)",
        "statesDefaultValues": {
          "hover": "translateY(-8px)"
        }
      }
    },
    "data": {
      "planName": {
        "dataType": "text",
        "displayName": "Plan Name",
        "defaultValue": "Professional",
        "text": {
          "maxLength": 50
        }
      },
      "price": {
        "dataType": "text",
        "displayName": "Price",
        "defaultValue": "$49",
        "text": {
          "maxLength": 20
        }
      },
      "pricePeriod": {
        "dataType": "text",
        "displayName": "Price Period",
        "defaultValue": "/month",
        "text": {
          "maxLength": 20
        }
      },
      "description": {
        "dataType": "text",
        "displayName": "Plan Description",
        "defaultValue": "Perfect for growing teams",
        "text": {
          "maxLength": 100
        }
      },
      "features": {
        "dataType": "arrayItems",
        "displayName": "Features List",
        "arrayItems": {
          "data": {
            "items": {
              "text": {
                "dataType": "text",
                "displayName": "Feature Text"
              }
            }
          },
          "maxSize": 10
        }
      }
    },
    "elements": {
      "header": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__header",
          "displayName": "Header Zone",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Header Background",
              "defaultValue": "var(--wst-accent-4-color)"
            },
            "padding": {
              "displayName": "Header Padding",
              "defaultValue": "2rem"
            },
            "borderRadius": {
              "displayName": "Header Corner Radius",
              "defaultValue": "6px 6px 0 0"
            }
          }
        }
      },
      "planName": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__plan-name",
          "displayName": "Plan Name",
          "cssProperties": {
            "font": {
              "displayName": "Plan Name Font",
              "defaultValue": "var(--wst-heading-4-font)"
            },
            "color": {
              "displayName": "Plan Name Color",
              "defaultValue": "var(--wst-heading-4-color)"
            }
          }
        }
      },
      "priceSection": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__price-section",
          "displayName": "Price Section",
          "cssProperties": {
            "padding": {
              "displayName": "Section Padding",
              "defaultValue": "2.5rem 2rem"
            }
          }
        }
      },
      "price": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__price",
          "displayName": "Price",
          "cssProperties": {
            "font": {
              "displayName": "Price Font",
              "defaultValue": "var(--wst-heading-2-font)"
            },
            "color": {
              "displayName": "Price Color",
              "defaultValue": "var(--wst-accent-1-color)"
            },
            "letterSpacing": {
              "displayName": "Price Letter Spacing",
              "defaultValue": "0.02em"
            }
          }
        }
      },
      "period": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__period",
          "displayName": "Price Period",
          "cssProperties": {
            "font": {
              "displayName": "Period Font",
              "defaultValue": "var(--wst-paragraph-3-font)"
            },
            "color": {
              "displayName": "Period Color",
              "defaultValue": "var(--wst-shade-3-color)"
            }
          }
        }
      },
      "description": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__description",
          "displayName": "Description",
          "cssProperties": {
            "font": {
              "displayName": "Description Font",
              "defaultValue": "var(--wst-paragraph-2-font)"
            },
            "color": {
              "displayName": "Description Color",
              "defaultValue": "var(--wst-paragraph-2-color)"
            }
          }
        }
      },
      "checkmark": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__checkmark",
          "displayName": "Checkmark Icon",
          "cssProperties": {
            "color": {
              "displayName": "Checkmark Color",
              "defaultValue": "var(--wst-accent-3-color)"
            }
          }
        }
      },
      "ctaButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".pricing-card__cta",
          "displayName": "CTA Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Button Background",
              "defaultValue": "var(--wst-accent-1-color)",
              "statesDefaultValues": {
                "hover": "var(--wst-accent-3-color)"
              }
            },
            "color": {
              "displayName": "Button Text Color",
              "defaultValue": "var(--wst-base-1-color)"
            },
            "font": {
              "displayName": "Button Font",
              "defaultValue": "var(--wst-button-primary-font)"
            },
            "padding": {
              "displayName": "Button Padding",
              "defaultValue": "1rem 2rem"
            },
            "borderRadius": {
              "displayName": "Button Corner Radius",
              "defaultValue": "8px"
            },
            "boxShadow": {
              "displayName": "Button Shadow",
              "defaultValue": "0 2px 8px rgba(0, 0, 0, 0.1)"
            },
            "transform": {
              "displayName": "Button Transform",
              "defaultValue": "scale(1)",
              "statesDefaultValues": {
                "hover": "scale(1.05)"
              }
            }
          },
          "data": {
            "buttonText": {
              "dataType": "text",
              "displayName": "Button Text",
              "defaultValue": "Get Started",
              "text": {
                "maxLength": 30
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
