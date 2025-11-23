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

---

# Animated Hero Example

This example demonstrates sophisticated motion design within the Wix component system, showcasing how to create engaging animations using pure CSS while maintaining token compliance and technical excellence:

**Design Excellence:**
- ✅ Dynamic text animation creates visual interest without overwhelming
- ✅ Tightly overlapping entrance animations create fluid, snappy cascading reveal (200ms stagger)
- ✅ Strategic use of accent tokens for hierarchy and brand expression
- ✅ Generous clamp-based spacing adapts gracefully across viewports
- ✅ Dual CTA pattern with integrated icons provides clear action hierarchy
- ✅ Pure CSS animations replace heavy JS libraries while maintaining smooth easing

**Technical Excellence:**
- ✅ Complete manifest exposing all editable properties
- ✅ Perfect synchronization between React, CSS, and Manifest
- ✅ Modern responsive CSS using clamp() and flex-wrap (no media queries)
- ✅ SSR-safe implementation with proper state management
- ✅ Token-only color and typography system (composite font tokens used correctly)
- ✅ Smooth animation timing with proper easing functions

**Strategic Demonstration:**
This example shows how to convert complex animations (Framer Motion) into pure CSS while maintaining sophistication. It demonstrates that "dynamic" doesn't require JavaScript animation libraries—strategic CSS keyframes and transitions with proper timing can achieve the same polish. The component prevents generic hero defaults by incorporating motion as a core design element: tightly overlapping entrance animations (200ms stagger with 500ms duration) create a fluid cascading effect where elements animate simultaneously for snappy feel, cycling text maintains interest, and color-transitioning hovers provide tactile feedback.

### Example Request
"Create a hero section with animated text and call-to-action buttons"

### Example Output

<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 3/5 (Animated text cycling with state management, multiple CTAs, conditional rendering)
Expressive Complexity: 4/5 (Sophisticated text animation, bold typography hierarchy, dual CTA pattern, generous spacing)

USER DESIGN DIRECTION
User requested hero section with animated text cycling through adjectives, dual CTA buttons with icons, and centered layout

DESIGN BRIEF
Core Concept: A dynamic hero section with eye-catching animated text that cycles through descriptive words, creating movement and interest while maintaining readability. Features bold typography hierarchy and dual CTAs for primary and secondary actions.

Strategic Framework: Vibrant & Dynamic with Contemporary polish
Visual Profile: Energetic, Modern, Confident
Design Style: Contemporary with motion-first approach

Color Palette Analysis:
- Background (var(--wst-primary-background-color)): Clean base ensures maximum readability for large text
- Primary headline (var(--wst-accent-1-color)): Brand accent for "This is something" creates visual anchor
- Animated words (var(--wst-heading-1-color)): High-contrast dark text for animated portion ensures legibility during motion
- Body text (var(--wst-paragraph-2-color)): Standard paragraph token maintains hierarchy below headline
- Primary CTA (var(--wst-button-primary-background-color)): Standard primary button treatment
- Secondary CTA (var(--wst-button-secondary-background-color)): Outline style for secondary action

Typography:
- Main headline uses clamp(2.5rem, 5vw, 4rem) with var(--wst-heading-1-font) for dramatic scale
- Animated text uses var(--wst-heading-1-font) with font-weight from heading token
- Body text uses clamp(1rem, 1.5vw, 1.25rem) with var(--wst-paragraph-2-font) for comfortable reading
- Buttons use var(--wst-button-primary-font) and var(--wst-button-secondary-font) respectively
- All composite tokens used—no font property overrides

Spacing & Layout:
- Container fills bounding box naturally (width: 100%)
- Generous vertical padding: clamp(3rem, 8vw, 6rem) creates premium feel across viewports
- Content centered with flexbox column layout
- Gap system: 2rem between major sections, 1rem between related elements
- Works gracefully across 320px-1200px containers and all viewports
- Fixed spacing for consistency and predictability

COHESIVE VISUAL SYSTEM (Pairs With):
- Corner Radius: Moderate rounded (8px buttons) creates contemporary warmth
- Shadows: None—relies on solid backgrounds and borders for definition
- Borders: 1px solid token borders for outline button maintains clean aesthetic
- Animation: Smooth vertical slide with opacity fade (400ms ease-out) for text cycling

Interaction: All elements fade in with tightly staggered entrance animations (badge 0ms, content 200ms, CTAs 400ms) using 500ms duration for snappy, overlapping reveal; Animated text cycles every 2 seconds with smooth vertical slide-in/slide-out effect; Elegant button hover effects with smooth 200ms color transitions—primary button darkens to accent-3, secondary button inverts to filled accent-1 background with white text (outline-to-solid transformation); Icons integrated inline with subtle translateX on hover; Focus states use outline with token colors

Key Animation: Entrance animation uses translateY(40px) + opacity fade-in with 500ms ease-out timing; Tightly staggered 200ms delays create overlapping cascading reveal where elements animate simultaneously for fluid feel; Text cycling animation uses translateY(±150px) + opacity with 400ms ease-out; Entry slides from top (y: -150px) or bottom (y: 150px) depending on direction; Active state smoothly transitions to center position

Anti-Default Strategy: Avoids static hero sections by incorporating animated text that creates constant visual interest. Prevents cramped layouts through generous clamp-based vertical spacing. Escapes monotone CTA treatments by using contrasting primary/secondary button styles with integrated icons.

Design Rationale: This approach demonstrates motion design within token constraints—pure CSS keyframes and transitions replace heavy libraries while maintaining sophisticated easing. Tightly staggered entrance animations (0ms → 200ms → 400ms delays with 500ms duration) create overlapping reveals where multiple elements animate simultaneously for a fluid, snappy feel rather than a slow sequence. The cycling text animation creates dynamic energy that maintains user interest. Bold heading-1 scale and generous padding demonstrate confidence. Dual CTA pattern with icons and color-transitioning hovers provides clear primary/secondary action hierarchy with tactile feedback. Token-only color system ensures brand consistency while allowing creative expression through motion.
</design-brief>

<react>
import React, { useEffect, useState } from 'react'
import './style.css'

type Text = string
type Link = {
  href: string
  target?: string
  rel?: string
}

interface Wix {
  elementsRemovalState?: Record<string, 'REMOVED'>
}

interface AnimatedHeroProps {
  className: string
  id: string
  wix: Wix
  headlinePrefix: Text
  animatedWords: Text[]
  description: Text
  elementProps: {
    badgeButton?: {
      badgeText: Text
      badgeLink: Link
    }
    primaryButton?: {
      primaryText: Text
      primaryLink: Link
    }
    secondaryButton?: {
      secondaryText: Text
      secondaryLink: Link
    }
  }
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  className,
  id,
  wix,
  headlinePrefix = 'This is something',
  animatedWords = ['amazing', 'new', 'wonderful', 'beautiful', 'smart'],
  description = 'Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.',
  elementProps
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationDirection('up')
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex === animatedWords.length - 1) {
          return 0
        }
        return prevIndex + 1
      })
    }, 2000)

    return () => clearInterval(intervalId)
  }, [animatedWords.length])

  const isBadgeRemoved = wix.elementsRemovalState?.['badgeButton'] === 'REMOVED'
  const isPrimaryRemoved = wix.elementsRemovalState?.['primaryButton'] === 'REMOVED'
  const isSecondaryRemoved = wix.elementsRemovalState?.['secondaryButton'] === 'REMOVED'

  const badgeText = elementProps?.badgeButton?.badgeText || 'Read our launch article'
  const badgeLink = elementProps?.badgeButton?.badgeLink || { href: '#' }
  
  const primaryText = elementProps?.primaryButton?.primaryText || 'Sign up here'
  const primaryLink = elementProps?.primaryButton?.primaryLink || { href: '#' }
  
  const secondaryText = elementProps?.secondaryButton?.secondaryText || 'Jump on a call'
  const secondaryLink = elementProps?.secondaryButton?.secondaryLink || { href: '#' }

  return (
    <div className={`animated-hero ${className}`} id={id}>
      <div className="animated-hero__container">
        {!isBadgeRemoved && elementProps?.badgeButton && (
          <a
            href={badgeLink.href}
            target={badgeLink.target}
            rel={badgeLink.rel}
            className="animated-hero__badge"
          >
            <span>{badgeText}</span>
            <svg
              className="animated-hero__badge-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        )}

        <div className="animated-hero__content">
          <h1 className="animated-hero__headline">
            <span className="animated-hero__headline-prefix">{headlinePrefix}</span>
            <span className="animated-hero__animated-wrapper">
              {animatedWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`animated-hero__animated-word ${
                    index === currentWordIndex ? 'animated-hero__animated-word--active' : ''
                  } ${
                    index < currentWordIndex
                      ? 'animated-hero__animated-word--before'
                      : index > currentWordIndex
                      ? 'animated-hero__animated-word--after'
                      : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="animated-hero__description">{description}</p>
        </div>

        <div className="animated-hero__cta-group">
          {!isSecondaryRemoved && elementProps?.secondaryButton && (
            <a
              href={secondaryLink.href}
              target={secondaryLink.target}
              rel={secondaryLink.rel}
              className="animated-hero__button animated-hero__button--secondary"
            >
              <span>{secondaryText}</span>
              <svg
                className="animated-hero__button-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          )}

          {!isPrimaryRemoved && elementProps?.primaryButton && (
            <a
              href={primaryLink.href}
              target={primaryLink.target}
              rel={primaryLink.rel}
              className="animated-hero__button animated-hero__button--primary"
            >
              <span>{primaryText}</span>
              <svg
                className="animated-hero__button-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnimatedHero
</react>

<css>
* {
  box-sizing: border-box;
}

@keyframes contentAppear {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-hero {
  width: 100%;
  background: var(--wst-primary-background-color);
  padding: clamp(3rem, 8vw, 6rem) 1.5rem;
}

.animated-hero__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.animated-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: var(--wst-secondary-background-color);
  color: var(--wst-paragraph-2-color);
  font: var(--wst-paragraph-3-font);
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 200ms ease-out, transform 200ms ease-out;
  animation: contentAppear 500ms ease-out forwards;
  animation-delay: 0ms;
}

.animated-hero__badge:hover {
  background: var(--wst-shade-2-color);
  transform: translateX(4px);
}

.animated-hero__badge:focus {
  outline: 2px solid var(--wst-accent-1-color);
  outline-offset: 2px;
}

.animated-hero__badge-icon {
  flex-shrink: 0;
  transition: transform 200ms ease-out;
}

.animated-hero__badge:hover .animated-hero__badge-icon {
  transform: translateX(4px);
}

.animated-hero__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  max-width: 48rem;
  animation: contentAppear 500ms ease-out forwards;
  animation-delay: 200ms;
}

.animated-hero__headline {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font: var(--wst-heading-1-font);
  color: var(--wst-heading-1-color);
  line-height: 1.1;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.animated-hero__headline-prefix {
  color: var(--wst-accent-1-color);
}

.animated-hero__animated-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.2em;
  overflow: hidden;
  min-height: clamp(3rem, 6vw, 5rem);
}

.animated-hero__animated-word {
  position: absolute;
  opacity: 0;
  transform: translateY(150px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}

.animated-hero__animated-word--active {
  opacity: 1;
  transform: translateY(0);
}

.animated-hero__animated-word--before {
  opacity: 0;
  transform: translateY(-150px);
}

.animated-hero__animated-word--after {
  opacity: 0;
  transform: translateY(150px);
}

.animated-hero__description {
  margin: 0;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font: var(--wst-paragraph-2-font);
  color: var(--wst-paragraph-2-color);
  line-height: 1.6;
  max-width: 42rem;
}

.animated-hero__cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  animation: contentAppear 500ms ease-out forwards;
  animation-delay: 400ms;
}

.animated-hero__button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  font: var(--wst-button-primary-font);
  transition: background-color 200ms ease-out, border-color 200ms ease-out, color 200ms ease-out;
  white-space: nowrap;
}

.animated-hero__button--primary {
  background: var(--wst-button-primary-background-color);
  color: var(--wst-button-primary-color);
  border: 1px solid transparent;
}

.animated-hero__button--primary:hover {
  background: var(--wst-accent-3-color);
}

.animated-hero__button--primary:focus {
  outline: 2px solid var(--wst-accent-1-color);
  outline-offset: 2px;
}

.animated-hero__button--primary:active {
  background: var(--wst-accent-4-color);
}

.animated-hero__button--secondary {
  background: transparent;
  color: var(--wst-button-secondary-color);
  border: 1px solid var(--wst-button-secondary-border-top-color);
  font: var(--wst-button-secondary-font);
}

.animated-hero__button--secondary:hover {
  background: var(--wst-accent-1-color);
  color: var(--wst-base-1-color);
  border-color: var(--wst-accent-1-color);
}

.animated-hero__button--secondary:focus {
  outline: 2px solid var(--wst-accent-1-color);
  outline-offset: 2px;
}

.animated-hero__button--secondary:active {
  background: var(--wst-accent-3-color);
  color: var(--wst-base-1-color);
}

.animated-hero__button-icon {
  flex-shrink: 0;
  transition: transform 200ms ease-out;
}

.animated-hero__button:hover .animated-hero__button-icon {
  transform: translateX(2px);
}
</css>

<manifest>
{
  "type": "AnimatedHero",
  "description": "A dynamic hero section with animated text cycling through descriptive words, dual CTA buttons with icons, and centered layout—demonstrates motion design with pure CSS animations within token constraints",
  "editorElement": {
    "selector": ".animated-hero",
    "displayName": "Animated Hero",
    "cssProperties": {
      "backgroundColor": {
        "displayName": "Background Color",
        "defaultValue": "var(--wst-primary-background-color)"
      },
      "padding": {
        "displayName": "Section Padding",
        "defaultValue": "clamp(3rem, 8vw, 6rem) 1.5rem"
      }
    },
    "data": {
      "headlinePrefix": {
        "dataType": "text",
        "displayName": "Headline Prefix",
        "defaultValue": "This is something",
        "text": {
          "maxLength": 100
        }
      },
      "animatedWords": {
        "dataType": "arrayItems",
        "displayName": "Animated Words",
        "arrayItems": {
          "dataItem": {
            "dataType": "text",
            "displayName": "Word"
          },
          "maxSize": 10
        }
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.",
        "text": {
          "maxLength": 500
        }
      }
    },
    "elements": {
      "container": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__container",
          "displayName": "Content Container",
          "cssProperties": {
            "gap": {
              "displayName": "Section Gap",
              "defaultValue": "2rem"
            }
          }
        }
      },
      "badgeButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__badge",
          "displayName": "Badge Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Badge Background",
              "defaultValue": "var(--wst-secondary-background-color)",
              "statesDefaultValues": {
                "hover": "var(--wst-shade-2-color)"
              }
            },
            "color": {
              "displayName": "Badge Text Color",
              "defaultValue": "var(--wst-paragraph-2-color)"
            },
            "font": {
              "displayName": "Badge Font",
              "defaultValue": "var(--wst-paragraph-3-font)"
            },
            "padding": {
              "displayName": "Badge Padding",
              "defaultValue": "0.5rem 1rem"
            },
            "borderRadius": {
              "displayName": "Badge Corner Radius",
              "defaultValue": "8px"
            }
          },
          "data": {
            "badgeText": {
              "dataType": "text",
              "displayName": "Badge Text",
              "defaultValue": "Read our launch article",
              "text": {
                "maxLength": 50
              }
            },
            "badgeLink": {
              "dataType": "link",
              "displayName": "Badge Link",
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
      },
      "headline": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__headline",
          "displayName": "Headline",
          "cssProperties": {
            "fontSize": {
              "displayName": "Headline Size",
              "defaultValue": "clamp(2.5rem, 5vw, 4rem)"
            },
            "font": {
              "displayName": "Headline Font",
              "defaultValue": "var(--wst-heading-1-font)"
            },
            "color": {
              "displayName": "Headline Color",
              "defaultValue": "var(--wst-heading-1-color)"
            },
            "letterSpacing": {
              "displayName": "Letter Spacing",
              "defaultValue": "-0.02em"
            }
          }
        }
      },
      "headlinePrefix": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__headline-prefix",
          "displayName": "Headline Prefix",
          "cssProperties": {
            "color": {
              "displayName": "Prefix Color",
              "defaultValue": "var(--wst-accent-1-color)"
            }
          }
        }
      },
      "description": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__description",
          "displayName": "Description",
          "cssProperties": {
            "fontSize": {
              "displayName": "Description Size",
              "defaultValue": "clamp(1rem, 1.5vw, 1.25rem)"
            },
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
      "primaryButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__button--primary",
          "displayName": "Primary Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Primary Background",
              "defaultValue": "var(--wst-button-primary-background-color)",
              "statesDefaultValues": {
                "hover": "var(--wst-accent-3-color)",
                "active": "var(--wst-accent-4-color)"
              }
            },
            "color": {
              "displayName": "Primary Text Color",
              "defaultValue": "var(--wst-button-primary-color)"
            },
            "font": {
              "displayName": "Primary Font",
              "defaultValue": "var(--wst-button-primary-font)"
            },
            "padding": {
              "displayName": "Primary Padding",
              "defaultValue": "0.75rem 2rem"
            },
            "borderRadius": {
              "displayName": "Primary Corner Radius",
              "defaultValue": "8px"
            }
          },
          "data": {
            "primaryText": {
              "dataType": "text",
              "displayName": "Primary Button Text",
              "defaultValue": "Sign up here",
              "text": {
                "maxLength": 30
              }
            },
            "primaryLink": {
              "dataType": "link",
              "displayName": "Primary Button Link",
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
      },
      "secondaryButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".animated-hero__button--secondary",
          "displayName": "Secondary Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Secondary Background",
              "defaultValue": "transparent",
              "statesDefaultValues": {
                "hover": "var(--wst-accent-1-color)",
                "active": "var(--wst-accent-3-color)"
              }
            },
            "color": {
              "displayName": "Secondary Text Color",
              "defaultValue": "var(--wst-button-secondary-color)",
              "statesDefaultValues": {
                "hover": "var(--wst-base-1-color)",
                "active": "var(--wst-base-1-color)"
              }
            },
            "font": {
              "displayName": "Secondary Font",
              "defaultValue": "var(--wst-button-secondary-font)"
            },
            "border": {
              "displayName": "Secondary Border",
              "defaultValue": "1px solid var(--wst-button-secondary-border-top-color)",
              "statesDefaultValues": {
                "hover": "1px solid var(--wst-accent-1-color)"
              }
            },
            "padding": {
              "displayName": "Secondary Padding",
              "defaultValue": "0.75rem 2rem"
            },
            "borderRadius": {
              "displayName": "Secondary Corner Radius",
              "defaultValue": "8px"
            }
          },
          "data": {
            "secondaryText": {
              "dataType": "text",
              "displayName": "Secondary Button Text",
              "defaultValue": "Jump on a call",
              "text": {
                "maxLength": 30
              }
            },
            "secondaryLink": {
              "dataType": "link",
              "displayName": "Secondary Button Link",
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
