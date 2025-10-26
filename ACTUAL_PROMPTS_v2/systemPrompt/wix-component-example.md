# Best Practice Example

This example demonstrates:
- ✅ A design brief that explains sophisticated default choices
- ✅ A fully responsive React component with TypeScript
- ✅ Modern CSS without media queries using clamp()
- ✅ A complete manifest exposing all editable properties
- ✅ Perfect synchronization between all three files
- ✅ SSR-safe implementation
- ✅ Purposeful hover animations using statesDefaultValues
- ✅ A sophisticated aesthetic that avoids LLM defaults
- ✅ Proper handling of optional elements (button removal)

### Example Request
"Create a feature card showing an icon, title, description, and optional button. Modern design with hover effects."

### Example Output

<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 2/5 (Simple content display with optional button conditional)
Expressive Complexity: 3/5 (Purposeful hover transitions, icon animation)

USER DESIGN DIRECTION
Minimal guidance provided - user requested "modern design with hover effects"

DESIGN BRIEF
Core Concept: A clean, sophisticated feature card that elegantly presents information with a subtle lift interaction on hover.
Visual Profile: Sophisticated Minimal
Design Style: Contemporary Minimal with editorial influence
Color Palette: Cool Gray monochromatic system
  - Base 1 (#FAFBFC): Card background, light and spacious
  - Base 2 (#1F2937): Primary text, strong contrast for readability
  - Shade 1 (#E5E7EB): Subtle border, gentle definition
  - Accent 1 (#3B82F6): Interactive elements, draws attention to CTA
Typography: System UI font stack, weights 400-500 for refined feel, clear hierarchy from title (500) to description (400)
Spacing & Layout: Generous internal padding (clamp 1.5-2.5rem), comfortable gaps (1.5rem between elements)
Interaction: On hover, card lifts with transform translateY and shadow deepens; button scales slightly (1.02) with background color transition; icon rotates 5deg for playful detail
Key Animation: 250ms ease-out transforms for smoothness, 200ms color transitions for responsiveness
Design Rationale: Sophisticated default aesthetic prevents generic LLM patterns while remaining flexible and professional. Hover effects provide delight without distraction. Monochromatic palette with single accent color maintains focus on content.
</design-brief>

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
  description = 'Feature description that explains the benefit or capability in clear, concise language.',
  showButton = true,
  elementProps
}) => {
  const isButtonRemoved = wix.elementsRemovalState?.['actionButton'] === 'REMOVED'
  const shouldShowButton = showButton && !isButtonRemoved

  return (
    <div className={`feature-card ${className}`} id={id}>
      <div className="feature-card__icon">
        {elementProps?.icon?.iconType === 'image' && elementProps.icon.image ? (
          <img
            src={elementProps.icon.image.url}
            alt=""
            className="feature-card__icon-image"
          />
        ) : elementProps?.icon?.vectorArt ? (
          <div
            className="feature-card__icon-vector"
            dangerouslySetInnerHTML={{ __html: elementProps.icon.vectorArt.svgContent }}
          />
        ) : null}
      </div>
      
      <h3 className="feature-card__title">{title}</h3>
      
      <p className="feature-card__description">{description}</p>
      
      {shouldShowButton && elementProps?.actionButton && (
        <a
          href={elementProps.actionButton.buttonLink?.href || '#'}
          target={elementProps.actionButton.buttonLink?.target}
          rel={elementProps.actionButton.buttonLink?.rel}
          className="feature-card__button"
        >
          {elementProps.actionButton.buttonText || 'Learn More'}
        </a>
      )}
    </div>
  )
}

export default FeatureCard
</react>

<css>
* {
  box-sizing: border-box;
}

.feature-card {
  background-color: #FAFBFC;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 250ms ease-out, box-shadow 250ms ease-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.06);
}

.feature-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 250ms ease-out;
}

.feature-card:hover .feature-card__icon {
  transform: rotate(5deg);
}

.feature-card__icon-image,
.feature-card__icon-vector {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.feature-card__title {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 500;
  line-height: 1.3;
  color: #1F2937;
}

.feature-card__description {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: clamp(0.95rem, 2vw, 1rem);
  font-weight: 400;
  line-height: 1.6;
  color: #4B5563;
}

.feature-card__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #3B82F6;
  color: #FFFFFF;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 200ms ease-out, transform 200ms ease-out;
  align-self: flex-start;
}

.feature-card__button:hover {
  background-color: #2563EB;
  transform: scale(1.02);
}

.feature-card__button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
</css>

<manifest>
{
  "type": "FeatureCard",
  "description": "A sophisticated feature card component displaying an icon, title, description, and optional call-to-action button with elegant hover interactions",
  "editorElement": {
    "selector": ".feature-card",
    "displayName": "Feature Card",
    "cssProperties": {
      "backgroundColor": {
        "displayName": "Background Color",
        "defaultValue": "#FAFBFC"
      },
      "borderColor": {
        "displayName": "Border Color",
        "defaultValue": "#E5E7EB"
      },
      "borderRadius": {
        "displayName": "Corner Radius",
        "defaultValue": "8px"
      },
      "padding": {
        "displayName": "Card Padding",
        "defaultValue": "clamp(1.5rem, 4vw, 2.5rem)"
      },
      "gap": {
        "displayName": "Content Spacing",
        "defaultValue": "1.5rem"
      },
      "boxShadow": {
        "displayName": "Card Shadow",
        "defaultValue": "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)",
        "statesDefaultValues": {
          "hover": "0 4px 8px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.06)"
        }
      },
      "transform": {
        "displayName": "Card Transform",
        "defaultValue": "translateY(0)",
        "statesDefaultValues": {
          "hover": "translateY(-4px)"
        }
      }
    },
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Card Title",
        "defaultValue": "Feature Title",
        "text": {
          "maxLength": 100
        }
      },
      "description": {
        "dataType": "text",
        "displayName": "Card Description",
        "defaultValue": "Feature description that explains the benefit or capability in clear, concise language.",
        "text": {
          "maxLength": 300
        }
      },
      "showButton": {
        "dataType": "booleanValue",
        "displayName": "Show Button",
        "defaultValue": true
      }
    },
    "elements": {
      "icon": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".feature-card__icon",
          "displayName": "Icon",
          "cssProperties": {
            "width": {
              "displayName": "Icon Width",
              "defaultValue": "48px"
            },
            "height": {
              "displayName": "Icon Height",
              "defaultValue": "48px"
            },
            "transform": {
              "displayName": "Icon Transform",
              "defaultValue": "rotate(0deg)",
              "statesDefaultValues": {
                "hover": "rotate(5deg)"
              }
            }
          },
          "data": {
            "iconType": {
              "dataType": "textEnum",
              "displayName": "Icon Type",
              "defaultValue": "vector",
              "textEnum": {
                "options": [
                  {
                    "value": "image",
                    "displayName": "Image"
                  },
                  {
                    "value": "vector",
                    "displayName": "Vector Art"
                  }
                ]
              }
            },
            "image": {
              "dataType": "image",
              "displayName": "Icon Image",
              "image": {
                "category": "ICON"
              }
            },
            "vectorArt": {
              "dataType": "vectorArt",
              "displayName": "Icon Vector",
              "vectorArt": {
                "category": "ICON_ART"
              }
            }
          }
        }
      },
      "title": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".feature-card__title",
          "displayName": "Title",
          "cssProperties": {
            "fontSize": {
              "displayName": "Title Font Size",
              "defaultValue": "clamp(1.25rem, 3vw, 1.5rem)"
            },
            "fontWeight": {
              "displayName": "Title Font Weight",
              "defaultValue": "500"
            },
            "color": {
              "displayName": "Title Color",
              "defaultValue": "#1F2937"
            },
            "lineHeight": {
              "displayName": "Title Line Height",
              "defaultValue": "1.3"
            }
          }
        }
      },
      "description": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".feature-card__description",
          "displayName": "Description",
          "cssProperties": {
            "fontSize": {
              "displayName": "Description Font Size",
              "defaultValue": "clamp(0.95rem, 2vw, 1rem)"
            },
            "fontWeight": {
              "displayName": "Description Font Weight",
              "defaultValue": "400"
            },
            "color": {
              "displayName": "Description Color",
              "defaultValue": "#4B5563"
            },
            "lineHeight": {
              "displayName": "Description Line Height",
              "defaultValue": "1.6"
            }
          }
        }
      },
      "actionButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".feature-card__button",
          "displayName": "Action Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Button Background",
              "defaultValue": "#3B82F6",
              "statesDefaultValues": {
                "hover": "#2563EB"
              }
            },
            "color": {
              "displayName": "Button Text Color",
              "defaultValue": "#FFFFFF"
            },
            "padding": {
              "displayName": "Button Padding",
              "defaultValue": "0.75rem 1.5rem"
            },
            "borderRadius": {
              "displayName": "Button Corner Radius",
              "defaultValue": "6px"
            },
            "fontSize": {
              "displayName": "Button Font Size",
              "defaultValue": "1rem"
            },
            "fontWeight": {
              "displayName": "Button Font Weight",
              "defaultValue": "500"
            },
            "transform": {
              "displayName": "Button Transform",
              "defaultValue": "scale(1)",
              "statesDefaultValues": {
                "hover": "scale(1.02)"
              }
            }
          },
          "data": {
            "buttonText": {
              "dataType": "text",
              "displayName": "Button Text",
              "defaultValue": "Learn More",
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
    }
  }
}
</manifest>
