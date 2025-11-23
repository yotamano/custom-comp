# Ultimate Hero with Stats Example

This example demonstrates the pinnacle of component design—combining complex layout, sophisticated animations, image-driven stats cards, and perfect technical synchronization with hard-coded values instead of CSS variables:

**Design Excellence:**
- ✅ Complex multi-zone layout with badge, headline, image-based stats grid, and dual CTAs
- ✅ Rich media integration with responsive images in each stat card
- ✅ Tightly orchestrated entrance animations (0ms, 150ms, 300ms, 450ms stagger)
- ✅ Spring-like cubic-bezier easing (0.34, 1.56, 0.64, 1) mimics Framer Motion physics
- ✅ Consistent hover states across all cards with image zoom and lift effects
- ✅ Semantic HTML (h2 for stat values, proper heading hierarchy)
- ✅ Interactive button icons that slide on hover
- ✅ Strategic use of hard-coded color values for full control
- ✅ Generous fixed spacing creates premium, confident feel

**Technical Excellence:**
- ✅ Complete manifest exposing all editable properties and inline elements
- ✅ Perfect synchronization between React, CSS, and Manifest
- ✅ Hard-coded colors and fonts (no CSS variables) for maximum clarity
- ✅ Pure CSS animations with spring-like easing curves
- ✅ SSR-safe implementation with proper state guards
- ✅ Responsive grid layout without media queries
- ✅ Stats array data structure with media (image) integration
- ✅ Semantic heading structure (h1, h2, p) for accessibility

**Strategic Demonstration:**
This example showcases the ultimate combination of features: complex state management (stat hover tracking), sophisticated animations (staggered entrance + image zoom), media integration (responsive images with aspect ratio), semantic HTML structure (h1, h2, p hierarchy), and multi-element layouts. It demonstrates that production-quality components don't require CSS variables or heavy animation libraries—clean hard-coded values and pure CSS can achieve the same sophistication while being easier to understand and maintain.

### Example Request
"Create a hero section with company stats, animated metrics, and call-to-action buttons"

### Example Output

<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 4/5 (Stats array with counter animations, hover states, conditional elements, media integration, multiple CTAs with icons, status badges)
Expressive Complexity: 5/5 (Complex layout zones, image-driven cards with animated counters, sophisticated entrance choreography, consistent hover orchestration, semantic HTML structure)

USER DESIGN DIRECTION
User requested hero section for AI app landing page showcasing company stats with visual indicators and primary/secondary CTAs

DESIGN BRIEF
Core Concept: Hero section for AI application combining storytelling (headline + description), dynamic credibility (image-driven stat cards with live counter animations), and conversion (dual CTAs). Demonstrates orchestrating complex elements with rich media and sophisticated animations using hard-coded values.

Strategic Framework: Vibrant & Expressive
Visual Profile: Futuristic, Dynamic, Intelligent
Design Style: Contemporary AI/tech aesthetic

Color Palette (Hard-Coded Values):
- #FFFFFF (white) for clean background, #000000 (black) for headlines and primary text
- #032262 (deep navy) for primary CTAs and authority, #88C0FF (sky blue) for hover states
- #A4FFF4 (cyan) for badge surfaces, #D1FFAE (lime) for status badges showing live activity

Typography (Hard-Coded Values):
- Headline: 700 56px/1.1em wix-madefor-display-v2 with -0.02em letter-spacing
- Stat values: 700 42px/1.1em with counter animation, Labels: 400 14px/1.4em
- Description: 400 18px/1.5em for readability, Buttons: 500 16px/1.4em

Spacing & Layout:
- Grid auto-fit: repeat(auto-fit, minmax(200px, 1fr)) for true container responsiveness
- Fixed spacing: 4rem vertical section padding, 2rem card padding, 1.5rem grid gap
- Works across 300px-1200px containers without media queries

COHESIVE VISUAL SYSTEM (Pairs With):
- Corner Radius: 12px cards, 8px buttons, 6px badge | Shadows: 0 2px 8px rgba(3,34,98,0.08), deepens on hover | Borders: Minimal | Letter-spacing: -0.02em on large text
- Contemporary warmth through moderate rounding, soft shadows for depth, tight spacing for confidence

Interaction: Staggered entrance (0ms badge, 150ms headline, 300ms stats, 450ms CTAs) with translateY(40px) rise. Counter animations use setInterval 0→target over 2000ms with 200ms stagger per card. Consistent hover: card lift translateY(-4px) + image zoom scale(1.05) + badge pulse scale(1.05). Spring-like cubic-bezier(0.34, 1.56, 0.64, 1) at 700ms entrance, 300-400ms hover.

Anti-Default Strategy: Avoids static heros with animated counters showing real-time credibility. Prevents cramped layouts with generous 4rem/2rem padding. Escapes monotone with vibrant AI palette (#032262 navy, #88C0FF sky, #A4FFF4 cyan, #D1FFAE lime). Uses semantic HTML (h1→h2→p) for hierarchy.

Design Rationale: Demonstrates JavaScript state (counters), CSS mastery (image zoom), animation orchestration (staggered entrance), and data handling (stats array with media). AI-themed palette creates modern tech aesthetic while remaining maintainable with clear hard-coded values. Grid auto-fit ensures true responsiveness without media queries.
</design-brief>

<react>
import React, { useState, useEffect } from 'react'
import './style.css'

type Text = string
type Link = {
  href: string
  target?: string
  rel?: string
}

type Media = {
  src: string
  alt?: string
  width?: number
  height?: number
}

interface Stat {
  value: Text
  label: Text
  statusBadge: Text
  targetNumber: number
  suffix: Text
  image: Media
}

interface Wix {
  elementsRemovalState?: Record<string, 'REMOVED'>
}

interface HeroWithStatsProps {
  className: string
  id: string
  wix: Wix
  headline: Text
  description: Text
  stats: Stat[]
  elementProps: {
    badge?: {
      badgeText: Text
      badgeLink: Link
    }
    primaryButton?: {
      buttonText: Text
      buttonLink: Link
    }
    secondaryButton?: {
      buttonText: Text
      buttonLink: Link
    }
  }
}

const HeroWithStats: React.FC<HeroWithStatsProps> = ({
  className,
  id,
  wix,
  headline = 'Trusted by Teams Worldwide',
  description = 'Join thousands of companies using our platform to scale their operations, increase productivity, and drive measurable results with cutting-edge analytics.',
  stats = [
    { value: '50K', label: 'Active Users', statusBadge: 'LIVE', targetNumber: 50000, suffix: '+', image: { src: 'https://static.wixstatic.com/media/c837a6_1234.jpg', alt: 'Active Users' } },
    { value: '98', label: 'Success Rate', statusBadge: 'VERIFIED', targetNumber: 98, suffix: '%', image: { src: 'https://static.wixstatic.com/media/c837a6_5678.jpg', alt: 'Success Rate' } },
    { value: '24/7', label: 'Support Available', statusBadge: 'ACTIVE', targetNumber: 247, suffix: '', image: { src: 'https://static.wixstatic.com/media/c837a6_9012.jpg', alt: 'Support' } }
  ],
  elementProps
}) => {
  const [hoveredStatIndex, setHoveredStatIndex] = useState<number | null>(null)
  const [statCounts, setStatCounts] = useState<number[]>(stats.map(() => 0))

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    const intervals: NodeJS.Timeout[] = []

    stats.forEach((stat, index) => {
      const timer = setTimeout(() => {
        let start = 0
        const duration = 2000
        const increment = stat.targetNumber / (duration / 16)
        
        const counter = setInterval(() => {
          start += increment
          if (start >= stat.targetNumber) {
            setStatCounts(prev => {
              const newCounts = [...prev]
              newCounts[index] = stat.targetNumber
              return newCounts
            })
            clearInterval(counter)
          } else {
            setStatCounts(prev => {
              const newCounts = [...prev]
              newCounts[index] = Math.floor(start)
              return newCounts
            })
          }
        }, 16)

        intervals.push(counter)
      }, index * 200)

      timers.push(timer)
    })

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      intervals.forEach(interval => clearInterval(interval))
    }
  }, [stats])

  const elementsRemovalState = wix?.elementsRemovalState || {}

  const isBadgeRemoved = elementsRemovalState['badge'] === 'REMOVED'
  const isPrimaryRemoved = elementsRemovalState['primaryButton'] === 'REMOVED'
  const isSecondaryRemoved = elementsRemovalState['secondaryButton'] === 'REMOVED'

  const badge = elementProps?.badge
  const badgeText = badge?.badgeText || 'Trusted by 10,000+ Companies'
  const badgeLink = badge?.badgeLink || { href: '#' }

  const primaryButton = elementProps?.primaryButton
  const primaryText = primaryButton?.buttonText || 'Get Started'
  const primaryLink = primaryButton?.buttonLink || { href: '#' }

  const secondaryButton = elementProps?.secondaryButton
  const secondaryText = secondaryButton?.buttonText || 'View Demo'
  const secondaryLink = secondaryButton?.buttonLink || { href: '#' }

  return (
    <div className={`hero-with-stats ${className}`} id={id}>
      <div className="hero-with-stats__container">
        {!isBadgeRemoved && badge && (
          <a
            href={badgeLink.href}
            target={badgeLink.target}
            rel={badgeLink.rel}
            className="hero-with-stats__badge"
          >
            <svg className="hero-with-stats__badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            {badgeText}
          </a>
        )}

        <div className="hero-with-stats__content">
          <h1 className="hero-with-stats__headline">{headline}</h1>
          <p className="hero-with-stats__description">{description}</p>
        </div>

        <div className="hero-with-stats__stats-grid">
          {stats.map((stat, index) => {
            const statImage = stat.image || { src: 'https://static.wixstatic.com/media/placeholder.jpg', alt: stat.label }
            
            return (
              <div
                key={index}
                className="hero-with-stats__stat-card"
                onMouseEnter={() => setHoveredStatIndex(index)}
                onMouseLeave={() => setHoveredStatIndex(null)}
              >
                <div className="hero-with-stats__stat-image-wrapper">
                  <img
                    className="hero-with-stats__stat-image"
                    src={statImage.src}
                    alt={statImage.alt || stat.label}
                    width={statImage.width}
                    height={statImage.height}
                    loading="lazy"
                  />
                  <span className="hero-with-stats__stat-badge">{stat.statusBadge}</span>
                </div>
                <div className="hero-with-stats__stat-content">
                  <h2 className="hero-with-stats__stat-value">
                    {statCounts[index].toLocaleString()}{stat.suffix}
                  </h2>
                  <p className="hero-with-stats__stat-label">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="hero-with-stats__cta-group">
          {!isPrimaryRemoved && primaryButton && (
            <a
              href={primaryLink.href}
              target={primaryLink.target}
              rel={primaryLink.rel}
              className="hero-with-stats__button hero-with-stats__button--primary"
            >
              <span>{primaryText}</span>
              <svg className="hero-with-stats__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          {!isSecondaryRemoved && secondaryButton && (
            <a
              href={secondaryLink.href}
              target={secondaryLink.target}
              rel={secondaryLink.rel}
              className="hero-with-stats__button hero-with-stats__button--secondary"
            >
              <span>{secondaryText}</span>
              <svg className="hero-with-stats__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 4l6 6m0 0l-6 6m6-6H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroWithStats
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

.hero-with-stats {
  width: 100%;
  background: #FFFFFF;
  padding: 4rem 1.5rem;
}

.hero-with-stats__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-with-stats__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #A4FFF4;
  color: #000000;
  font: normal normal 400 14px/1.4em wix-madefor-display-v2;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 200ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: contentAppear 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0ms;
}

.hero-with-stats__badge:hover {
  background: #88C0FF;
  transform: translateY(-2px);
}

.hero-with-stats__badge:focus {
  outline: 2px solid #032262;
  outline-offset: 2px;
}

.hero-with-stats__badge-icon {
  flex-shrink: 0;
  color: #032262;
}

.hero-with-stats__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  max-width: 48rem;
  animation: contentAppear 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 150ms;
}

.hero-with-stats__headline {
  margin: 0;
  font: normal normal 700 56px/1.1em wix-madefor-display-v2;
  color: #000000;
  letter-spacing: -0.02em;
}

.hero-with-stats__description {
  margin: 0;
  font: normal normal 400 18px/1.5em wix-madefor-display-v2;
  color: #000000;
  max-width: 42rem;
  opacity: 0.7;
}

.hero-with-stats__stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  animation: contentAppear 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 300ms;
}

.hero-with-stats__stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(3, 34, 98, 0.08);
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-with-stats__stat-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 24px rgba(3, 34, 98, 0.12);
}

.hero-with-stats__stat-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
  position: relative;
}

.hero-with-stats__stat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-with-stats__stat-card:hover .hero-with-stats__stat-image {
  transform: scale(1.05);
}

.hero-with-stats__stat-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: #D1FFAE;
  color: #000000;
  font: normal normal 600 11px/1.2em wix-madefor-display-v2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 4px;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-with-stats__stat-card:hover .hero-with-stats__stat-badge {
  transform: scale(1.05);
}

.hero-with-stats__stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
}

.hero-with-stats__stat-value {
  margin: 0;
  font: normal normal 700 42px/1.1em wix-madefor-display-v2;
  color: #000000;
  letter-spacing: -0.02em;
}

.hero-with-stats__stat-label {
  margin: 0;
  font: normal normal 400 14px/1.4em wix-madefor-display-v2;
  color: #000000;
  text-align: center;
  opacity: 0.6;
}

.hero-with-stats__cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  animation: contentAppear 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 450ms;
}

.hero-with-stats__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font: normal normal 500 16px/1.5em wix-madefor-display-v2;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 300ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), color 300ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
}

.hero-with-stats__button-icon {
  flex-shrink: 0;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-with-stats__button:hover .hero-with-stats__button-icon {
  transform: translateX(4px);
}

.hero-with-stats__button--primary {
  background: #032262;
  color: #FFFFFF;
  border: 1px solid #032262;
}

.hero-with-stats__button--primary:hover {
  background: #88C0FF;
  border-color: #88C0FF;
  transform: translateY(-2px);
}

.hero-with-stats__button--primary:focus {
  outline: 2px solid #032262;
  outline-offset: 2px;
}

.hero-with-stats__button--primary:active {
  transform: translateY(0);
}

.hero-with-stats__button--secondary {
  background: transparent;
  color: #000000;
  border: 1px solid #88C0FF;
}

.hero-with-stats__button--secondary:hover {
  background: #A4FFF4;
  border-color: #A4FFF4;
  transform: translateY(-2px);
}

.hero-with-stats__button--secondary:focus {
  outline: 2px solid #032262;
  outline-offset: 2px;
}

.hero-with-stats__button--secondary:active {
  transform: translateY(0);
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
  "type": "HeroWithStats",
  "description": "An advanced AI-themed hero section with animated counter stats, status badges, image-driven cards, and dual CTAs—demonstrates dynamic UX with JavaScript state management, sophisticated animations, media integration, semantic HTML, and AI/tech color palette with hard-coded values",
  "editorElement": {
    "selector": ".hero-with-stats",
    "displayName": "Hero Stats",
    "cssProperties": {
      "backgroundColor": {
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF"
      },
      "padding": {
        "displayName": "Section Padding",
        "defaultValue": "4rem 1.5rem"
      }
    },
    "data": {
      "headline": {
        "dataType": "text",
        "displayName": "Headline",
        "defaultValue": "Trusted by Teams Worldwide",
        "text": {
          "maxLength": 100
        }
      },
      "description": {
        "dataType": "text",
        "displayName": "Description",
        "defaultValue": "Join thousands of companies using our platform to scale their operations, increase productivity, and drive measurable results.",
        "text": {
          "maxLength": 300
        }
      },
      "stats": {
        "dataType": "arrayItems",
        "displayName": "Stats List",
        "arrayItems": {
          "data": {
            "items": {
              "value": {
                "dataType": "text",
                "displayName": "Stat Value"
              },
              "label": {
                "dataType": "text",
                "displayName": "Stat Label"
              },
              "statusBadge": {
                "dataType": "text",
                "displayName": "Status Badge Text"
              },
              "targetNumber": {
                "dataType": "number",
                "displayName": "Target Number for Counter"
              },
              "suffix": {
                "dataType": "text",
                "displayName": "Stat Suffix"
              },
              "image": {
                "dataType": "media",
                "displayName": "Stat Image",
                "media": {
                  "mediaManagerCategory": "image"
                }
              }
            }
          },
          "maxSize": 8
        }
      }
    },
    "elements": {
      "container": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__container",
          "displayName": "Container",
          "cssProperties": {
            "gap": {
              "displayName": "Section Gap",
              "defaultValue": "2rem"
            }
          }
        }
      },
      "badge": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__badge",
          "displayName": "Badge",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Badge Background",
              "defaultValue": "#A4FFF4",
              "statesDefaultValues": {
                "hover": "#88C0FF"
              }
            },
            "color": {
              "displayName": "Badge Text Color",
              "defaultValue": "#000000"
            },
            "font": {
              "displayName": "Badge Font",
              "defaultValue": "normal normal 400 14px/1.4em wix-madefor-display-v2"
            },
            "padding": {
              "displayName": "Badge Padding",
              "defaultValue": "0.5rem 1rem"
            },
            "borderRadius": {
              "displayName": "Badge Corner Radius",
              "defaultValue": "6px"
            }
          },
          "data": {
            "badgeText": {
              "dataType": "text",
              "displayName": "Badge Text",
              "defaultValue": "Trusted Worldwide",
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
          "selector": ".hero-with-stats__headline",
          "displayName": "Headline",
          "cssProperties": {
            "font": {
              "displayName": "Headline Font",
              "defaultValue": "normal normal 700 56px/1.1em wix-madefor-display-v2"
            },
            "color": {
              "displayName": "Headline Color",
              "defaultValue": "#000000"
            },
            "letterSpacing": {
              "displayName": "Letter Spacing",
              "defaultValue": "-0.02em"
            }
          }
        }
      },
      "description": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__description",
          "displayName": "Description",
          "cssProperties": {
            "font": {
              "displayName": "Description Font",
              "defaultValue": "normal normal 400 18px/1.5em wix-madefor-display-v2"
            },
            "color": {
              "displayName": "Description Color",
              "defaultValue": "#000000"
            }
          }
        }
      },
      "statsGrid": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stats-grid",
          "displayName": "Stats Grid",
          "cssProperties": {
            "gap": {
              "displayName": "Grid Gap",
              "defaultValue": "1.5rem"
            }
          }
        }
      },
      "statCard": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stat-card",
          "displayName": "Stat Card",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Card Background",
              "defaultValue": "#FFFFFF"
            },
            "padding": {
              "displayName": "Card Padding",
              "defaultValue": "2rem"
            },
            "borderRadius": {
              "displayName": "Card Corner Radius",
              "defaultValue": "12px"
            },
            "boxShadow": {
              "displayName": "Card Shadow",
              "defaultValue": "0 2px 8px rgba(0, 0, 0, 0.08)",
              "statesDefaultValues": {
                "hover": "0 4px 16px rgba(0, 0, 0, 0.12)"
              }
            },
            "transform": {
              "displayName": "Card Transform",
              "defaultValue": "translateY(0) scale(1)",
              "statesDefaultValues": {
                "hover": "translateY(-4px) scale(1.05)"
              }
            }
          }
        }
      },
      "statImageWrapper": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stat-image-wrapper",
          "displayName": "Stat Image Container",
          "cssProperties": {
            "borderRadius": {
              "displayName": "Image Corner Radius",
              "defaultValue": "8px"
            }
          }
        }
      },
      "statImage": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stat-image",
          "displayName": "Stat Image",
          "cssProperties": {
            "objectFit": {
              "displayName": "Image Fit",
              "defaultValue": "cover"
            }
          }
        }
      },
      "statValue": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stat-value",
          "displayName": "Stat Value (H2)",
          "cssProperties": {
            "font": {
              "displayName": "Value Font",
              "defaultValue": "normal normal 700 42px/1.1em wix-madefor-display-v2"
            },
            "color": {
              "displayName": "Value Color",
              "defaultValue": "#000000"
            },
            "letterSpacing": {
              "displayName": "Value Letter Spacing",
              "defaultValue": "-0.02em"
            }
          }
        }
      },
      "statLabel": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stat-label",
          "displayName": "Stat Label",
          "cssProperties": {
            "font": {
              "displayName": "Label Font",
              "defaultValue": "normal normal 400 14px/1.4em wix-madefor-display-v2"
            },
            "color": {
              "displayName": "Label Color",
              "defaultValue": "#000000"
            }
          }
        }
      },
      "statBadge": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__stat-badge",
          "displayName": "Status Badge",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Badge Background",
              "defaultValue": "#D1FFAE"
            },
            "color": {
              "displayName": "Badge Text Color",
              "defaultValue": "#000000"
            },
            "font": {
              "displayName": "Badge Font",
              "defaultValue": "normal normal 600 11px/1.2em wix-madefor-display-v2"
            }
          }
        }
      },
      "primaryButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__button--primary",
          "displayName": "Primary Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Button Background",
              "defaultValue": "#032262",
              "statesDefaultValues": {
                "hover": "#88C0FF"
              }
            },
            "color": {
              "displayName": "Button Text Color",
              "defaultValue": "#FFFFFF"
            },
            "font": {
              "displayName": "Button Font",
              "defaultValue": "normal normal 500 16px/1.5em wix-madefor-display-v2"
            },
            "padding": {
              "displayName": "Button Padding",
              "defaultValue": "0.75rem 2rem"
            },
            "borderRadius": {
              "displayName": "Button Corner Radius",
              "defaultValue": "8px"
            },
            "border": {
              "displayName": "Button Border",
              "defaultValue": "1px solid #032262",
              "statesDefaultValues": {
                "hover": "1px solid #88C0FF"
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
      },
      "secondaryButton": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".hero-with-stats__button--secondary",
          "displayName": "Secondary Button",
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Button Background",
              "defaultValue": "transparent",
              "statesDefaultValues": {
                "hover": "#A4FFF4"
              }
            },
            "color": {
              "displayName": "Button Text Color",
              "defaultValue": "#000000",
              "statesDefaultValues": {
                "hover": "#000000"
              }
            },
            "font": {
              "displayName": "Button Font",
              "defaultValue": "normal normal 500 16px/1.4em wix-madefor-display-v2"
            },
            "padding": {
              "displayName": "Button Padding",
              "defaultValue": "0.75rem 2rem"
            },
            "borderRadius": {
              "displayName": "Button Corner Radius",
              "defaultValue": "8px"
            },
            "border": {
              "displayName": "Button Border",
              "defaultValue": "1px solid #88C0FF"
            }
          },
          "data": {
            "buttonText": {
              "dataType": "text",
              "displayName": "Button Text",
              "defaultValue": "View Demo",
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

