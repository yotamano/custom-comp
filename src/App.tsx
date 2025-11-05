import React, { useState, lazy, Suspense, useEffect, CSSProperties, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { transform } from '@babel/standalone';
import type { TransformOptions } from '@babel/core';

import ResizableSlider, { ContainerState } from './ResizableSlider';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error("Uncaught error in component:", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: '1rem', background: '#fffbe6', border: '1px solid #fde047', color: '#713f12', borderRadius: '8px', height: '100%', overflow: 'auto' }}>
            <h2 style={{marginTop: 0}}>Component Error</h2>
            <p>The component encountered a runtime error during rendering. This often indicates the generated React code is not robust enough to handle missing or empty props (e.g., an empty array of items), which is a violation of the prompt guidelines.</p>
            <details>
              <summary style={{cursor: 'pointer', fontWeight: '500'}}>View Error Details</summary>
              <pre style={{ whiteSpace: 'pre-wrap', background: '#fefce8', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', maxHeight: '200px', overflowY: 'auto', border: '1px solid #fef9c3', marginTop: '10px' }}>
                <strong>{this.state.error?.toString()}</strong>
                {this.state.error?.stack}
              </pre>
            </details>
          </div>
        );
      }
  
      return this.props.children;
    }
}

const Component1 = lazy(() => import('../1'));
const Component2 = lazy(() => import('../2'));

interface CompiledResult {
  component: React.ComponentType | null;
  error: string | null;
}

const initialCode = `
import React from 'react';

const CustomComponent = () => {
  return (
    <div style={{ padding: '1rem', background: '#eee', border: '1px solid #ccc' }}>
      <h2>Hello from the editor!</h2>
      <p>You can edit this code live.</p>
    </div>
  );
};

export default CustomComponent;
`.trim();

const initialGeneratedOutput = `
<design-brief>
COMPONENT ANALYSIS
Functional Complexity: 3/5 (Interactive gallery with image management, navigation controls, and dynamic content rendering)
Expressive Complexity: 4/5 (Advanced 3D transforms, perspective effects, smooth animations, and immersive visual experience)

DESIGN BRIEF
Core Concept: An immersive 3D carousel gallery that displays images in a rotating cylinder formation with perspective depth. Users can navigate through images using intuitive controls while experiencing smooth, cinematic transitions.

Visual Style: Modern, sleek, and futuristic with a dark theme to emphasize the 3D effect and make images pop.

Color Palette:
- Background: Deep gradient from #0f0f23 to #1a1a2e (Dark cosmic background)
- Accent: #00d4ff (Bright cyan for interactive elements)
- Secondary: #ff6b6b (Coral for secondary buttons)
- Text: #ffffff (Pure white for maximum contrast)
- Controls Background: rgba(0, 0, 0, 0.7) with glassmorphism effect

Typography: Clean, modern sans-serif (system fonts) with medium weight for buttons and minimal text elements.

3D Interaction Design:
- Primary effect: CSS 3D transforms using \`transform-style: preserve-3d\` to create a cylindrical rotation
- Images are positioned in a circle using trigonometric calculations for natural 3D positioning
- Perspective: 1000px for realistic depth perception
- Rotation animations: Smooth cubic-bezier easing for professional motion
- Hover states: Subtle scale and glow effects on interactive elements

Key Animations:
- Cylinder rotation: Smooth rotY transforms with momentum-based easing
- Image transitions: Cross-fade and scale effects during navigation
- Control buttons: Hover lift with shadow enhancement
- Loading states: Subtle pulse animations

Interactive Features:
- Navigation arrows with hover feedback
- Automatic rotation toggle
- Smooth momentum-based scrolling
- Touch-friendly controls for mobile
</design-brief>

<react>
import React, { useState, useEffect, useRef } from 'react'

type Image = {
	uri: string
	url: string
	name?: string
	width?: number
	height?: number
}

type BooleanValue = boolean

interface Wix {
	elementsRemovalState?: Record<string, 'REMOVED'>
}

interface Gallery3DProps {
	className: string
	id: string
	wix: Wix
	autoRotate: BooleanValue
	elementProps: {
		galleryImages: {
			images: Image[]
		}
		galleryControls: {
			showControls: BooleanValue
		}
	}
}

const Gallery3D: React.FC<Gallery3DProps> = ({
	className,
	id,
	wix,
	autoRotate = false,
	elementProps,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const isImagesRemoved = wix?.elementsRemovalState?.galleryImages === 'REMOVED'
	const isControlsRemoved = wix?.elementsRemovalState?.galleryControls === 'REMOVED'

	// Default images if none provided
	const defaultImages = [
		{
			uri: 'wix:image://v1/gallery1.jpg',
			url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
			name: 'Mountain Lake',
			width: 800,
			height: 600,
		},
		{
			uri: 'wix:image://v1/gallery2.jpg',
			url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
			name: 'Forest Path',
			width: 800,
			height: 600,
		},
		{
			uri: 'wix:image://v1/gallery3.jpg',
			url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
			name: 'Desert Landscape',
			width: 800,
			height: 600,
		},
		{
			uri: 'wix:image://v1/gallery4.jpg',
			url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
			name: 'Ocean Waves',
			width: 800,
			height: 600,
		},
	]

	const images = elementProps?.galleryImages?.images || defaultImages
	const showControls = elementProps?.galleryControls?.showControls ?? true

	// Auto rotation effect
	useEffect(() => {
		if (isAutoRotating && images.length > 1) {
			intervalRef.current = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % images.length)
			}, 4000)
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isAutoRotating, images.length])

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length)
	}

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	const toggleAutoRotate = () => {
		setIsAutoRotating(!isAutoRotating)
	}

	if (isImagesRemoved || images.length === 0) {
		return (
			<div id={id} className={\`\${className} gallery-3d\`}>
				<div className="gallery-3d__placeholder">
					<div className="gallery-3d__placeholder-icon">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
						</svg>
					</div>
					<p className="gallery-3d__placeholder-text">Add images to create your 3D gallery</p>
				</div>
			</div>
		)
	}

	const rotationAngle = (360 / images.length) * currentIndex
	const radius = 300

	return (
		<div id={id} className={\`\${className} gallery-3d\`}>
			<div className="gallery-3d__stage">
				<div 
					className="gallery-3d__carousel"
					style={{
						transform: \`rotateY(\${-rotationAngle}deg)\`,
					}}
				>
					{images.map((image, index) => {
						const angle = (360 / images.length) * index
						const isActive = index === currentIndex
						
						return (
							<div
								key={index}
								className={\`gallery-3d__slide \${isActive ? 'gallery-3d__slide--active' : ''}\`}
								style={{
									transform: \`rotateY(\${angle}deg) translateZ(\${radius}px)\`,
								}}
							>
								<img
									src={image.url}
									alt={image.name || \`Gallery image \${index + 1}\`}
									className="gallery-3d__image"
									loading="lazy"
									width={image.width}
									height={image.height}
								/>
								{isActive && (
									<div className="gallery-3d__slide-overlay">
										<div className="gallery-3d__slide-title">
											{image.name || \`Image \${index + 1}\`}
										</div>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>

			{showControls && !isControlsRemoved && (
				<div className="gallery-3d__controls">
					<button
						className="gallery-3d__nav-btn gallery-3d__nav-btn--prev"
						onClick={goToPrevious}
						aria-label="Previous image"
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
						</svg>
					</button>

					<div className="gallery-3d__indicators">
						{images.map((_, index) => (
							<button
								key={index}
								className={\`gallery-3d__indicator \${
									index === currentIndex ? 'gallery-3d__indicator--active' : ''
								}\`}
								onClick={() => goToSlide(index)}
								aria-label={\`Go to image \${index + 1}\`}
							/>
						))}
					</div>

					<button
						className={\`gallery-3d__auto-btn \${
							isAutoRotating ? 'gallery-3d__auto-btn--active' : ''
						}\`}
						onClick={toggleAutoRotate}
						aria-label={isAutoRotating ? 'Stop auto rotation' : 'Start auto rotation'}
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							{isAutoRotating ? (
								<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
							) : (
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
							)}
						</svg>
					</button>

					<button
						className="gallery-3d__nav-btn gallery-3d__nav-btn--next"
						onClick={goToNext}
						aria-label="Next image"
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
						</svg>
					</button>
				</div>
			)}
		</div>
	)
}

export default Gallery3D
</react>

<css>
.gallery-3d {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: clamp(400px, 60vh, 600px);
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  border-radius: clamp(1rem, 3vw, 1.5rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gallery-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.gallery-3d__stage {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.gallery-3d__carousel {
  position: relative;
  width: 200px;
  height: 280px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0.02, 0.1, 1);
}

.gallery-3d__slide {
  position: absolute;
  width: 200px;
  height: 280px;
  border-radius: clamp(0.5rem, 2vw, 0.75rem);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  backface-visibility: hidden;
  background: #000;
}

.gallery-3d__slide--active {
  box-shadow: 0 25px 50px rgba(0, 212, 255, 0.3);
}

.gallery-3d__slide:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 30px 60px rgba(0, 212, 255, 0.4);
}

.gallery-3d__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.gallery-3d__slide:hover .gallery-3d__image {
  transform: scale(1.1);
}

.gallery-3d__slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: clamp(1rem, 3vw, 1.5rem);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-3d__slide--active .gallery-3d__slide-overlay {
  transform: translateY(0);
}

.gallery-3d__slide-title {
  color: #ffffff;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  font-weight: 500;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.gallery-3d__controls {
  position: absolute;
  bottom: clamp(1rem, 4vw, 2rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.5rem);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(2rem, 5vw, 3rem);
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
  z-index: 10;
}

.gallery-3d__nav-btn {
  width: clamp(2.5rem, 6vw, 3rem);
  height: clamp(2.5rem, 6vw, 3rem);
  border: none;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.4));
  color: #00d4ff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 212, 255, 0.3);
}

.gallery-3d__nav-btn:hover {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(0, 212, 255, 0.6));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
}

.gallery-3d__nav-btn svg {
  width: clamp(1.25rem, 3vw, 1.5rem);
  height: clamp(1.25rem, 3vw, 1.5rem);
}

.gallery-3d__indicators {
  display: flex;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  align-items: center;
}

.gallery-3d__indicator {
  width: clamp(0.75rem, 2vw, 1rem);
  height: clamp(0.75rem, 2vw, 1rem);
  border: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.gallery-3d__indicator:hover {
  background: rgba(0, 212, 255, 0.6);
  transform: scale(1.2);
}

.gallery-3d__indicator--active {
  background: #00d4ff;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.8);
}

.gallery-3d__auto-btn {
  width: clamp(2.5rem, 6vw, 3rem);
  height: clamp(2.5rem, 6vw, 3rem);
  border: none;
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.gallery-3d__auto-btn:hover {
  background: rgba(255, 107, 107, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.gallery-3d__auto-btn--active {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.4), rgba(255, 107, 107, 0.6));
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
}

.gallery-3d__auto-btn svg {
  width: clamp(1.25rem, 3vw, 1.5rem);
  height: clamp(1.25rem, 3vw, 1.5rem);
}

.gallery-3d__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  gap: clamp(1rem, 3vw, 1.5rem);
}

.gallery-3d__placeholder-icon {
  width: clamp(3rem, 8vw, 4rem);
  height: clamp(3rem, 8vw, 4rem);
  color: rgba(255, 255, 255, 0.4);
}

.gallery-3d__placeholder-icon svg {
  width: 100%;
  height: 100%;
}

.gallery-3d__placeholder-text {
  font-size: clamp(1rem, 3vw, 1.25rem);
  margin: 0;
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-3d__carousel {
    width: clamp(150px, 40vw, 180px);
    height: clamp(200px, 50vw, 240px);
  }
  
  .gallery-3d__slide {
    width: clamp(150px, 40vw, 180px);
    height: clamp(200px, 50vw, 240px);
  }
  
  .gallery-3d__controls {
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(0.5rem, 2vw, 1rem);
    padding: clamp(0.5rem, 2vw, 1rem);
  }
  
  .gallery-3d__indicators {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .gallery-3d {
    height: clamp(300px, 50vh, 400px);
  }
  
  .gallery-3d__controls {
    position: relative;
    bottom: auto;
    transform: none;
    margin-top: auto;
    background: rgba(0, 0, 0, 0.5);
  }
}
</css>

<manifest>
{
  "type": "ExampleUI.Gallery3D",
  "description": "An immersive 3D carousel gallery with perspective transforms and smooth animations",
  "editorElement": {
    "selector": ".gallery-3d",
    "displayName": "3D Gallery",
    "archetype": "gallery",
    "data": {
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": false
      },
      "navItems": {
        "displayName": "Navigation Items",
        "dataType": "arrayItems",
        "arrayItems": {
          "dataItem": {
            "dataType": "text",
            "displayName": "Navigation Text"
          }
        },
        "defaultValue": "[]"
      }
    },
    "cssProperties": {
      "background": {
        "displayName": "Gallery Background",
        "defaultValue": "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
      },
      "borderRadius": {
        "displayName": "Gallery Border Radius",
        "defaultValue": "24px"
      },
      "height": {
        "displayName": "Gallery Height",
        "defaultValue": "500px"
      }
    },
    "elements": {
      "galleryImages": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".gallery-3d__carousel",
          "displayName": "Gallery Images",
          "data": {
            "images": {
              "dataType": "arrayItems",
              "displayName": "Image Collection",
              "arrayItems": {
                "dataItem": {
                  "dataType": "image",
                  "displayName": "Gallery Image",
                  "image": {
                    "category": "IMAGE"
                  }
                },
                "maxSize": 20
              }
            }
          },
          "behaviors": {
            "selectable": true,
            "removable": true
          }
        }
      },
      "galleryControls": {
        "elementType": "inlineElement",
        "inlineElement": {
          "selector": ".gallery-3d__controls",
          "displayName": "Gallery Controls",
          "data": {
            "showControls": {
              "dataType": "booleanValue",
              "displayName": "Show Navigation Controls",
              "defaultValue": true
            }
          },
          "cssProperties": {
            "backgroundColor": {
              "displayName": "Controls Background",
              "defaultValue": "rgba(0, 0, 0, 0.7)"
            },
            "borderRadius": {
              "displayName": "Controls Border Radius",  
              "defaultValue": "48px"
            },
            "padding": {
              "displayName": "Controls Padding",
              "defaultValue": "16px 24px"
            }
          },
          "elements": {
            "navButtons": {
              "elementType": "inlineElement",
              "inlineElement": {
                "selector": ".gallery-3d__nav-btn",
                "displayName": "Navigation Buttons",
                "cssProperties": {
                  "backgroundColor": {
                    "displayName": "Button Background",
                    "defaultValue": "rgba(0, 212, 255, 0.3)"
                  },
                  "color": {
                    "displayName": "Button Icon Color",
                    "defaultValue": "#00d4ff"
                  },
                  "width": {
                    "displayName": "Button Size",
                    "defaultValue": "48px"
                  },
                  "height": {
                    "displayName": "Button Height",
                    "defaultValue": "48px"
                  }
                },
                "behaviors": {
                  "selectable": true,
                  "removable": false
                }
              }
            },
            "indicators": {
              "elementType": "inlineElement",
              "inlineElement": {
                "selector": ".gallery-3d__indicators",
                "displayName": "Page Indicators",
                "cssProperties": {
                  "gap": {
                    "displayName": "Indicators Spacing",
                    "defaultValue": "12px"
                  }
                },
                "behaviors": {
                  "selectable": true,
                  "removable": true
                }
              }
            },
            "autoRotateButton": {
              "elementType": "inlineElement",
              "inlineElement": {
                "selector": ".gallery-3d__auto-btn",
                "displayName": "Auto Rotate Button",
                "cssProperties": {
                  "backgroundColor": {
                    "displayName": "Auto Button Background",
                    "defaultValue": "rgba(255, 107, 107, 0.2)"
                  },
                  "color": {
                    "displayName": "Auto Button Icon Color",
                    "defaultValue": "#ff6b6b"
                  }
                },
                "behaviors": {
                  "selectable": true,
                  "removable": true
                }
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
      "contentResizeDirection": "none"
    }
  },
  "installation": {
    "initialSize": {
      "width": {
        "sizingType": "stretched"
      },
      "height": {
        "sizingType": "pixels",
        "pixels": 500
      }
    }
  }
}
</manifest>
`.trim();

const compileCode = (code: string): CompiledResult => {
  try {
    const transformOptions: TransformOptions = {
      presets: ['react', 'env', 'typescript'],
      filename: 'component.tsx',
    };
    const transformedCode = transform(code, transformOptions).code;

    if (!transformedCode) {
      return { component: null, error: 'Transformation returned empty code.' };
    }
    
    const exports: { default?: React.ComponentType } = {};
    const require = (name: string) => {
      if (name === 'react') return React;
      if (name.includes('defaultImages')) {
        console.warn(`Mocking missing module '${name}' with an empty array.`);
        return [];
      }
      console.warn(`Mocking missing module '${name}' with an empty object.`);
      return {};
    };
    
    // eslint-disable-next-line no-new-func
    new Function('exports', 'require', transformedCode)(exports, require);
    
    if (exports.default) {
      return { component: exports.default, error: null };
    }
    return { component: null, error: 'No default export found.' };
  } catch (error: unknown) {
    console.error("Error compiling code:", error);
    if (error instanceof Error) {
      return { component: null, error: error.message };
    }
    return { component: null, error: 'An unknown error occurred during compilation.' };
  }
};

interface ParsedOutput {
  designBrief: string;
  reactCode: string;
  css: string;
  manifest: string;
  component: React.ComponentType | null;
  error: string | null;
}

interface CSVResult {
  index: number;
  prompt: string;
  category: string;
  generatedOutput: string;
  manifest: string;
}

const parseCSV = (text: string): CSVResult[] => {
  const records: string[][] = [];
  const currentRecord: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  // Parse CSV character by character, properly handling quoted multiline fields
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote inside quoted field
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      currentRecord.push(currentField);
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      // Record separator (only if not inside quotes)
      currentRecord.push(currentField);
      currentField = '';
      if (currentRecord.length > 0) {
        records.push([...currentRecord]);
        currentRecord.length = 0;
      }
    } else if (char === '\r' && nextChar === '\n' && !inQuotes) {
      // Windows line ending
      currentRecord.push(currentField);
      currentField = '';
      if (currentRecord.length > 0) {
        records.push([...currentRecord]);
        currentRecord.length = 0;
      }
      i++; // Skip \n
    } else {
      // Regular character
      currentField += char;
    }
  }
  
  // Add last field and record if any
  if (currentField || currentRecord.length > 0) {
    currentRecord.push(currentField);
    if (currentRecord.length > 0) {
      records.push(currentRecord);
    }
  }
  
  if (records.length < 2) return [];
  
  // Parse header
  const headers = records[0];
  const indexIdx = headers.findIndex(h => h.trim() === 'index');
  const promptIdx = headers.findIndex(h => h.trim() === 'prompt');
  const categoryIdx = headers.findIndex(h => h.trim() === 'category');
  const generatedOutputIdx = headers.findIndex(h => h.trim() === 'Generated Output');
  const manifestIdx = headers.findIndex(h => h.trim() === 'manifest');
  
  // Parse data rows
  const results: CSVResult[] = [];
  for (let i = 1; i < records.length; i++) {
    const record = records[i];
    if (record.length > Math.max(indexIdx, promptIdx, categoryIdx, generatedOutputIdx, manifestIdx)) {
      results.push({
        index: parseInt(record[indexIdx] || '0'),
        prompt: record[promptIdx] || '',
        category: record[categoryIdx] || '',
        generatedOutput: record[generatedOutputIdx] || '',
        manifest: record[manifestIdx] || '',
      });
    }
  }
  
  return results;
};

const getValueByPath = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined), obj);
};

// Pool of diverse, realistic placeholder images
const PLACEHOLDER_IMAGES = [
  {
    uri: 'wix:image://v1/placeholder1.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    name: 'Mountain Lake Landscape',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder2.jpg',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    name: 'Forest Trail Path',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder3.jpg',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    name: 'Desert Sand Dunes',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder4.jpg',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
    name: 'Ocean Waves Beach',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder5.jpg',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    name: 'Mountain Peak Snow',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder6.jpg',
    url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&h=600&fit=crop',
    name: 'Autumn Forest Colors',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder7.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    name: 'Portrait Photography',
    width: 800,
    height: 600,
  },
  {
    uri: 'wix:image://v1/placeholder8.jpg',
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop',
    name: 'City Architecture Night',
    width: 800,
    height: 600,
  },
];

let imageCounter = 0;

const getNextPlaceholderImage = () => {
  const image = PLACEHOLDER_IMAGES[imageCounter % PLACEHOLDER_IMAGES.length];
  imageCounter++;
  return { ...image };
};

const createDefaultItemFromSchema = (schema: any, itemIndex: number = 0): any => {
    if (!schema) return null;

    switch(schema.dataType) {
        case 'image': 
            return getNextPlaceholderImage();
        case 'objectValue':
            const obj: any = {};
            if (schema.properties) {
                for (const key in schema.properties) {
                    obj[key] = createDefaultItemFromSchema(schema.properties[key], itemIndex);
                }
            }
            return obj;
        case 'booleanValue': return false;
        case 'number': return itemIndex + 1;
        case 'text': case 'stringValue': return itemIndex > 0 ? `Item ${itemIndex + 1}` : 'Sample Text';
        default: return null;
    }
};

const createDefaultValue = (schema: any): any => {
    if (schema.dataType === 'arrayItems') {
        let defaultValue = [];
        if (schema.defaultValue) {
            if (typeof schema.defaultValue === 'string') {
                try {
                    const parsed = JSON.parse(schema.defaultValue);
                    if (Array.isArray(parsed)) {
                        defaultValue = parsed;
                    }
                } catch (e) { /* invalid json, default to empty array */ }
            } else if (Array.isArray(schema.defaultValue)) {
                defaultValue = schema.defaultValue;
            }
        }

        if (defaultValue.length === 0) {
            // Handle simple dataItem structure
            if (schema.arrayItems?.dataItem) {
                const defaultItem = createDefaultItemFromSchema(schema.arrayItems.dataItem, 0);
                if (defaultItem) {
                    // Create multiple items for galleries (3-5 items)
                    const hasImageData = JSON.stringify(schema.arrayItems.dataItem).includes('image');
                    const itemCount = hasImageData ? 5 : 3;
                    
                    return Array.from({ length: itemCount }, (_, i) => 
                        createDefaultItemFromSchema(schema.arrayItems.dataItem, i)
                    );
                }
            }
            // Handle complex data.items structure (nested objects)
            else if (schema.arrayItems?.data?.items) {
                const items = schema.arrayItems.data.items;
                const hasImageData = JSON.stringify(items).includes('image');
                const itemCount = hasImageData ? 5 : 3;
                
                return Array.from({ length: itemCount }, (_, i) => {
                    const item: any = {};
                    Object.entries(items).forEach(([key, itemSchema]: [string, any]) => {
                        item[key] = createDefaultItemFromSchema(itemSchema, i);
                    });
                    return item;
                });
            }
        }
        return defaultValue;
    }

    if (schema.defaultValue !== undefined) {
        if (schema.dataType === 'objectValue' && typeof schema.defaultValue === 'string') {
            try {
                return JSON.parse(schema.defaultValue);
            } catch(e) {
                // Not a valid JSON string, fall through to return as string
            }
        }
        return schema.defaultValue;
    }

    switch(schema.dataType) {
        case 'objectValue':
            const obj: any = {};
            if (schema.properties) {
                Object.keys(schema.properties).forEach(key => {
                    obj[key] = createDefaultValue(schema.properties[key]);
                });
            }
            return obj;
        case 'booleanValue': return false;
        case 'number': return 0;
        case 'text':
        case 'stringValue': return '';
        case 'image': return getNextPlaceholderImage();
        default: return null;
    }
};

const buildInitialState = (node: any): any => {
    let state: any = {};
    if (node.data) {
        Object.entries(node.data).forEach(([key, value]: [string, any]) => {
            state[key] = createDefaultValue(value);
        });
    }
    if (node.elements) {
        state.elementProps = {};
        Object.entries(node.elements).forEach(([key, value]: [string, any]) => {
            state.elementProps[key] = buildInitialState(value.inlineElement);
        });
    }
    return state;
};

const buildInitialCssState = (node: any): any => {
    let cssState: any = {};
    if (node.cssProperties) {
        cssState.properties = {};
        Object.entries(node.cssProperties).forEach(([key, value]: [string, any]) => {
            cssState.properties[key] = value.defaultValue;
        });
    }
    if (node.elements) {
        cssState.elements = {};
        Object.entries(node.elements).forEach(([key, value]: [string, any]) => {
            cssState.elements[key] = buildInitialCssState(value.inlineElement);
        });
    }
    return cssState;
}

const buildSelectorMap = (node: any, path: string[], map: { [key: string]: string[] }) => {
    if (node.selector) {
        map[node.selector] = path;
    }
    if (node.elements) {
        Object.entries(node.elements).forEach(([key, value]: [string, any]) => {
            buildSelectorMap(value.inlineElement, [...path, 'elements', key], map);
        });
    }
};

const getNodeByPath = (rootNode: any, path: string[]) => {
  let currentNode = rootNode;
  for (const key of path) {
    if (currentNode && typeof currentNode === 'object' && key in currentNode) {
      currentNode = currentNode[key];
    } else {
      return null; // Path is invalid
    }
  }
  return currentNode;
};

// const isNumeric = (val: any): val is number | string => !isNaN(parseFloat(val)) && isFinite(val);

const parseUnitValue = (value: string | number): { value: number, unit: string } => {
    if (typeof value === 'number') return { value, unit: '' };
    if (typeof value !== 'string') return { value: 0, unit: 'px' };
    const match = value.match(/^(-?\d+\.?\d*)\s*(px|%|em|rem|vw|vh|s|deg)?$/i);
    if (match) return { value: parseFloat(match[1]), unit: match[2] || '' };
    return { value: parseFloat(value) || 0, unit: '' };
};

const sizeUnits = ['px', '%', 'em', 'rem'];
const isSizeProperty = (propName: string) => {
    const lowerPropName = propName.toLowerCase();
    const sizeKeywords = ['width', 'height', 'padding', 'margin', 'radius', 'font-size', 'gap', 'top', 'left', 'right', 'bottom'];
    return sizeKeywords.some(keyword => lowerPropName.includes(keyword));
};

// const UnitInput: React.FC<{
//     value: string;
//     onChange: (newValue: string) => void;
// }> = ({ value, onChange }) => {
//     const { value: numValue, unit: currentUnit } = parseUnitValue(value);
//
//     const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         onChange(`${e.target.value}${currentUnit}`);
//     };
//
//     const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         onChange(`${numValue}${e.target.value}`);
//     };
//
//     return (
//         <div style={{ display: 'flex', alignItems: 'center', width: '120px' }}>
//             <input
//                 type="number"
//                 value={numValue}
//                 onChange={handleValueChange}
//                 style={{ 
//                     padding: '4px 8px', 
//                     borderRadius: '4px 0 0 4px', 
//                     border: '1px solid rgba(0, 0, 0, 0.08)', 
//                     width: '70%', 
//                     fontSize: '11px', 
//                     borderRight: 'none',
//                     background: '#ffffff',
//                     color: '#09090b',
//                     transition: 'border-color 0.15s ease',
//                 }}
//                 onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
//                 onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
//             />
//             <select 
//                 value={currentUnit} 
//                 onChange={handleUnitChange} 
//                 style={{ 
//                     padding: '4px 2px', 
//                     borderRadius: '0 4px 4px 0', 
//                     border: '1px solid rgba(0, 0, 0, 0.08)', 
//                     width: '30%', 
//                     fontSize: '11px', 
//                     background: '#fafafa',
//                     color: '#09090b',
//                     cursor: 'pointer',
//                     transition: 'border-color 0.15s ease',
//                 }}
//                 onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
//                 onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
//             >
//                 {sizeUnits.map(u => <option key={u} value={u}>{u}</option>)}
//             </select>
//         </div>
//     );
// };

const SizeInputWithSlider: React.FC<{
    value: string;
    onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
    const { value: numValue, unit: currentUnit } = parseUnitValue(value);
    
    // Determine min/max based on property type (you can customize these)
    const min = 0;
    const max = currentUnit === 'px' ? 500 : currentUnit === '%' ? 100 : currentUnit === 'rem' ? 10 : 100;
    
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumValue = parseFloat(e.target.value);
        onChange(`${newNumValue}${currentUnit}`);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(`${e.target.value}${currentUnit}`);
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(`${numValue}${e.target.value}`);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
            <input
                type="range"
                min={min}
                max={max}
                step={currentUnit === 'px' ? 1 : currentUnit === 'rem' ? 0.1 : 1}
                value={numValue}
                onChange={handleSliderChange}
                style={{ 
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    background: '#f4f4f5',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '50px',
                    maxWidth: '70px',
                }}
            />
            <div style={{ display: 'flex', alignItems: 'center', width: '100px', flexShrink: 0 }}>
                <input
                    type="number"
                    value={numValue}
                    onChange={handleValueChange}
                    style={{ 
                        padding: '4px 6px', 
                        borderRadius: '4px 0 0 4px', 
                        border: '1px solid rgba(0, 0, 0, 0.08)', 
                        width: '65%', 
                        fontSize: '10px', 
                        borderRight: 'none',
                        background: '#ffffff',
                        color: '#09090b',
                        transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                />
                <select 
                    value={currentUnit} 
                    onChange={handleUnitChange} 
                    style={{ 
                        padding: '4px 2px', 
                        borderRadius: '0 4px 4px 0', 
                        border: '1px solid rgba(0, 0, 0, 0.08)', 
                        width: '35%', 
                        fontSize: '10px', 
                        background: '#fafafa',
                        color: '#09090b',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                >
                    {sizeUnits.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </div>
        </div>
    );
};

const SliderInput: React.FC<{
    value: number | string;
    onChange: (newValue: number | string) => void;
    min?: number;
    max?: number;
    step?: number;
}> = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.type === 'range' ? parseFloat(e.target.value) : e.target.value);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '110px' }}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={numValue}
                onChange={handleChange}
                style={{ 
                    flex: 1, 
                    marginRight: '8px',
                    height: '4px',
                    borderRadius: '2px',
                    background: '#f4f4f5',
                    outline: 'none',
                    cursor: 'pointer',
                }}
            />
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={numValue}
                onChange={handleChange}
                style={{ 
                    width: '50px', 
                    padding: '4px', 
                    borderRadius: '4px', 
                    border: '1px solid rgba(0, 0, 0, 0.08)', 
                    fontSize: '11px',
                    background: '#ffffff',
                    color: '#09090b',
                    transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
            />
        </div>
    );
};

const ManifestNode: React.FC<{
  node: any;
  nodeKey: string;
  path: string;
  propPath: string[];
  cssPath: string[];
  props: any;
  onPropChange: (path: string[], value: any) => void;
  cssProps: any;
  onCssChange: (path: string[], prop: string, value: any) => void;
  collapsedNodes: { [key: string]: boolean };
  onToggleNode: (path: string) => void;
}> = ({ 
  node, nodeKey, path, propPath, cssPath, props, onPropChange, cssProps, onCssChange, collapsedNodes, onToggleNode 
}) => {
  if (!node) return null;

  const isCollapsed = collapsedNodes[path];
  const displayName = node.displayName || nodeKey;

  const hasContent = node.data || node.cssProperties || node.elements;

  return (
    <div style={{ marginLeft: path.split('.').length > 1 ? '8px' : '0', borderLeft: path.split('.').length > 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none', paddingLeft: path.split('.').length > 1 ? '12px' : '0', marginTop: '8px' }}>
      <div 
        onClick={() => hasContent && onToggleNode(path)} 
        style={{ cursor: hasContent ? 'pointer' : 'default', display: 'flex', alignItems: 'center', padding: '4px 0' }}
        onMouseEnter={(e) => { if (hasContent) e.currentTarget.style.backgroundColor = '#fafafa'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        {hasContent && <span style={{ marginRight: '6px', width: '10px', fontSize: '10px', color: '#71717a' }}>{isCollapsed ? '▸' : '▾'}</span>}
        <p style={{ margin: '0', fontWeight: '500', color: '#09090b', fontSize: '12px', letterSpacing: '-0.01em' }}>{displayName}</p>
      </div>
      
      {!isCollapsed && hasContent && (
        <div style={{ paddingTop: '8px' }}>
          {node.data && (
            <div style={{ paddingLeft: '8px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Data</h4>
              {Object.entries(node.data).map(([propName, propValue]: [string, any]) => {
                const currentPath = [...propPath, propName];
                const currentValue = getValueByPath(props, currentPath.slice(1));

                return (
                  <div key={propName} style={{ marginBottom: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ color: '#71717a', marginRight: '10px', fontSize: '11px' }}>{propValue.displayName || propName}: </label>
                    {propValue.dataType === 'booleanValue' ? (
                      <Toggle
                        checked={!!currentValue}
                        onChange={(checked) => onPropChange(currentPath.slice(1), checked)}
                      />
                    ) : propValue.dataType === 'arrayItems' ? (
                      <ArrayEditor
                        value={Array.isArray(currentValue) ? currentValue : []}
                        onChange={(newValue) => onPropChange(currentPath.slice(1), newValue)}
                        schema={propValue}
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue || ''}
                        onChange={(e) => onPropChange(currentPath.slice(1), e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.08)', width: '120px', fontSize: '11px', background: '#ffffff', transition: 'border-color 0.15s ease' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {node.cssProperties && (
            <div style={{ paddingLeft: '8px', marginTop: '12px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>CSS Properties</h4>
              {Object.entries(node.cssProperties).map(([propName, propValue]: [string, any]) => {
                const currentCssNode = cssPath.slice(1).reduce((acc, curr) => acc && acc[curr] ? acc[curr] : null, cssProps);
                const currentValue = currentCssNode?.properties?.[propName] ?? propValue.defaultValue;
                
                return (
                  <div key={propName} style={{ marginBottom: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ color: '#71717a', fontSize: '11px', flex: 1, minWidth: 0 }}>{propValue.displayName || propName}: </label>
                    <div style={{ width: '180px', flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
                      {(isColorProperty(propName, currentValue) || isCSSVariable(currentValue || '')) && propName.toLowerCase().includes('color') ? (
                        <VariablePicker
                          value={currentValue || ''}
                          onChange={(newValue) => onCssChange(cssPath.slice(1), propName, newValue)}
                          type="color"
                          propName={propName}
                        />
                      ) : (propName.toLowerCase().includes('font') || propName.toLowerCase().includes('family') || propName.toLowerCase().includes('typography') || isCSSVariable(currentValue || '')) && !propName.toLowerCase().includes('color') ? (
                        <VariablePicker
                          value={currentValue || ''}
                          onChange={(newValue) => onCssChange(cssPath.slice(1), propName, newValue)}
                          type="text"
                          propName={propName}
                        />
                      ) : isSizeProperty(propName) ? (
                          <SizeInputWithSlider value={currentValue} onChange={newValue => onCssChange(cssPath.slice(1), propName, newValue)} />
                      ) : isNumericProperty(propName, currentValue) ? (
                          <SliderInput 
                            value={currentValue} 
                            onChange={newValue => onCssChange(cssPath.slice(1), propName, newValue)} 
                            min={propName.toLowerCase().includes('opacity') ? 0 : 0}
                            max={propName.toLowerCase().includes('opacity') ? 1 : 100}
                            step={propName.toLowerCase().includes('opacity') ? 0.01 : 1}
                          />
                      ) : getCSSPropertyOptions(propName) ? (
                        <CSSPropertyDropdown
                          value={currentValue || ''}
                          onChange={(newValue) => onCssChange(cssPath.slice(1), propName, newValue)}
                          propName={propName}
                          options={getCSSPropertyOptions(propName) || []}
                        />
                      ) : (
                        <input
                          type="text"
                          value={currentValue ?? ''}
                          onChange={(e) => onCssChange(cssPath.slice(1), propName, e.target.value)}
                          style={{ padding: '4px 6px', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.08)', width: '110px', fontSize: '10px', background: '#ffffff', transition: 'border-color 0.15s ease' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {node.elements && (
            <div style={{ paddingLeft: '0px', marginTop: '12px' }}>
              <h4 style={{ margin: '0 0 8px 8px', fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Elements</h4>
              {Object.entries(node.elements).map(([elementName, elementValue]: [string, any]) => {
                const nextPropPath = [...propPath, 'elementProps', elementName];
                const nextCssPath = [...cssPath, 'elements', elementName];
                const nextPath = `${path}.${elementName}`;
                return (
                  <ManifestNode
                    key={elementName}
                    node={elementValue.inlineElement}
                    nodeKey={elementName}
                    path={nextPath}
                    propPath={nextPropPath}
                    cssPath={nextCssPath}
                    props={props}
                    onPropChange={onPropChange}
                    cssProps={cssProps}
                    onCssChange={onCssChange}
                    collapsedNodes={collapsedNodes}
                    onToggleNode={onToggleNode}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Toggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        position: 'relative',
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        background: checked ? '#09090b' : '#d4d4d8',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        padding: 0,
        outline: 'none',
      }}
      onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = '#e4e4e7'; }}
      onMouseLeave={(e) => { if (!checked) e.currentTarget.style.background = '#d4d4d8'; }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#ffffff',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      />
    </button>
  );
};

const VariablePicker: React.FC<{
  value: string;
  onChange: (value: string) => void;
  type: 'color' | 'text';
  propName: string;
}> = ({ value, onChange, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [mode, setMode] = useState<'variable' | 'custom'>('variable');
  const variableName = extractVariableName(value);
  const isVariable = isCSSVariable(value);
  const computedValue = variableName ? getComputedCSSValue(variableName) : '';
  
  const variables = type === 'color' ? getColorVariables() : getTextVariables();
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && popoverRef.current && containerRef.current) {
      const popover = popoverRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const popoverWidth = 280;
      const viewportWidth = window.innerWidth;
      
      // Check if popover would overflow to the right
      if (rect.left + popoverWidth > viewportWidth - 16) {
        // Position to the left instead
        popover.style.left = 'auto';
        popover.style.right = '0';
      } else {
        popover.style.left = '0';
        popover.style.right = 'auto';
      }
    }
  }, [isOpen]);

  const handleDetach = () => {
    if (isVariable && computedValue) {
      onChange(computedValue);
    }
    setIsOpen(false);
  };

  const handleSelectVariable = (varName: string) => {
    onChange(`var(${varName})`);
    setIsOpen(false);
    setMode('variable');
  };

  const handleSetCustom = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setIsOpen(false);
      setCustomValue('');
    }
  };


  return (
    <div ref={containerRef} style={{ position: 'relative', width: '120px' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          background: '#ffffff',
          cursor: 'pointer',
          fontSize: '11px',
          transition: 'border-color 0.15s ease',
          width: '100%',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
      >
        {type === 'color' && (
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              background: isVariable && computedValue ? computedValue : (value || '#ffffff'),
              border: '1px solid rgba(0, 0, 0, 0.1)',
              flexShrink: 0,
            }}
          />
        )}
        {type === 'text' && isVariable && (
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              background: '#fafafa',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '7px',
              color: '#71717a',
              font: variableName ? `var(${variableName})` : 'inherit',
            }}
          >
            Aa
          </div>
        )}
        {isVariable && (
          <span style={{ fontSize: '9px', color: '#2563eb', flexShrink: 0 }}>🔗</span>
        )}
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '10px', minWidth: 0 }}>
          {isVariable ? (variableName && variableName.length > 12 ? variableName.substring(0, 10) + '...' : variableName || '') : (value || 'Custom')}
        </span>
        <span style={{ fontSize: '8px', color: '#71717a', flexShrink: 0 }}>▾</span>
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            width: '280px',
            maxHeight: '300px',
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {isVariable && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', background: '#fafafa' }}>
              <div style={{ fontSize: '10px', color: '#71717a', marginBottom: '4px' }}>Connected to:</div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#09090b', marginBottom: '4px' }}>{variableName}</div>
              {computedValue && (
                <div style={{ fontSize: '10px', color: '#71717a', marginBottom: '8px' }}>
                  Value: {computedValue}
                </div>
              )}
              <button
                onClick={handleDetach}
                style={{
                  padding: '4px 8px',
                  fontSize: '10px',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Detach Variable
              </button>
            </div>
          )}
          
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
            <button
              onClick={() => setMode('variable')}
              style={{
                flex: 1,
                padding: '6px',
                fontSize: '10px',
                background: mode === 'variable' ? '#fafafa' : 'transparent',
                border: 'none',
                borderBottom: mode === 'variable' ? '2px solid #09090b' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: mode === 'variable' ? '600' : '400',
              }}
            >
              Variables
            </button>
            <button
              onClick={() => setMode('custom')}
              style={{
                flex: 1,
                padding: '6px',
                fontSize: '10px',
                background: mode === 'custom' ? '#fafafa' : 'transparent',
                border: 'none',
                borderBottom: mode === 'custom' ? '2px solid #09090b' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: mode === 'custom' ? '600' : '400',
              }}
            >
              Custom
            </button>
          </div>
          
          {mode === 'variable' ? (
            <div style={{ overflowY: 'auto', maxHeight: '200px', padding: '4px' }}>
              {variables.map((varName) => (
                <div
                  key={varName}
                  onClick={() => handleSelectVariable(varName)}
                  style={{
                    padding: '6px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {type === 'color' && (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        background: `var(${varName})`,
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {type === 'text' && (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        background: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        color: '#71717a',
                        font: `var(${varName})`,
                      }}
                    >
                      Aa
                    </div>
                  )}
                  <span style={{ flex: 1 }}>{varName}</span>
                  {varName === variableName && (
                    <span style={{ fontSize: '10px', color: '#09090b' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '8px' }}>
              <input
                type={type === 'color' ? 'color' : 'text'}
                value={customValue || (isVariable ? computedValue : value)}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder={type === 'color' ? '#000000' : 'Enter value'}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  fontSize: '11px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              />
              <button
                onClick={handleSetCustom}
                style={{
                  width: '100%',
                  padding: '6px',
                  fontSize: '11px',
                  background: '#09090b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Set Custom Value
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CSSPropertyDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
  propName: string;
  options: string[];
}> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && popoverRef.current && containerRef.current) {
      const popover = popoverRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const popoverWidth = 200;
      const viewportWidth = window.innerWidth;
      
      // Check if popover would overflow to the right
      if (rect.left + popoverWidth > viewportWidth - 16) {
        // Position to the left instead
        popover.style.left = 'auto';
        popover.style.right = '0';
      } else {
        popover.style.left = '0';
        popover.style.right = 'auto';
      }
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '120px' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '4px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          background: '#ffffff',
          cursor: 'pointer',
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'border-color 0.15s ease',
          width: '100%',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || 'Select...'}
        </span>
        <span style={{ fontSize: '8px', color: '#71717a', marginLeft: '6px', flexShrink: 0 }}>▾</span>
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            width: '200px',
            maxHeight: '250px',
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ overflowY: 'auto', maxHeight: '250px', padding: '4px' }}>
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                style={{
                  padding: '6px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  background: value === option ? '#fafafa' : 'transparent',
                  color: value === option ? '#09090b' : '#71717a',
                }}
                onMouseEnter={(e) => { if (value !== option) e.currentTarget.style.background = '#fafafa'; }}
                onMouseLeave={(e) => { if (value !== option) e.currentTarget.style.background = 'transparent'; }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ArrayEditor: React.FC<{
  value: any[];
  onChange: (value: any[]) => void;
  schema: any;
}> = ({ value, onChange, schema }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setEditingIndex(null);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && popoverRef.current && containerRef.current) {
      const popover = popoverRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const popoverWidth = 320;
      const viewportWidth = window.innerWidth;
      
      // Check if popover would overflow to the right
      if (rect.left + popoverWidth > viewportWidth - 16) {
        // Position to the left instead
        popover.style.left = 'auto';
        popover.style.right = '0';
      } else {
        popover.style.left = '0';
        popover.style.right = 'auto';
      }
    }
  }, [isOpen]);

  const handleAdd = () => {
    const newItem = schema.arrayItems?.dataItem?.dataType === 'text' ? '' : {};
    onChange([...value, newItem]);
    setEditingIndex(value.length);
    setEditValue('');
  };

  const handleEdit = (index: number, item: any) => {
    setEditingIndex(index);
    setEditValue(typeof item === 'string' ? item : JSON.stringify(item, null, 2));
  };

  const handleSave = (index: number) => {
    const newArray = [...value];
    try {
      if (schema.arrayItems?.dataItem?.dataType === 'text') {
        newArray[index] = editValue;
      } else {
        newArray[index] = JSON.parse(editValue);
      }
      onChange(newArray);
    } catch (e) {
      // Invalid JSON, keep as string
      newArray[index] = editValue;
      onChange(newArray);
    }
    setEditingIndex(null);
    setEditValue('');
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '120px' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          background: '#ffffff',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>{value.length} item{value.length !== 1 ? 's' : ''}</span>
        <span style={{ fontSize: '8px', color: '#71717a' }}>▾</span>
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            width: '320px',
            maxHeight: '300px',
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '8px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', background: '#fafafa' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#09090b', marginBottom: '8px' }}>Array Items</div>
            <button
              onClick={handleAdd}
              style={{
                width: '100%',
                padding: '6px',
                fontSize: '11px',
                background: '#09090b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              + Add Item
            </button>
          </div>
          
          <div style={{ overflowY: 'auto', maxHeight: '200px', padding: '4px' }}>
            {value.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '6px',
                  marginBottom: '4px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  background: editingIndex === index ? '#fafafa' : '#ffffff',
                }}
              >
                {editingIndex === index ? (
                  <div>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '4px',
                        fontSize: '10px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        minHeight: '60px',
                        marginBottom: '4px',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => handleSave(index)}
                        style={{
                          flex: 1,
                          padding: '4px',
                          fontSize: '10px',
                          background: '#09090b',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingIndex(null); setEditValue(''); }}
                        style={{
                          flex: 1,
                          padding: '4px',
                          fontSize: '10px',
                          background: '#ffffff',
                          color: '#71717a',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      onClick={() => handleEdit(index, item)}
                      style={{
                        flex: 1,
                        fontSize: '10px',
                        color: '#71717a',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      {typeof item === 'string' ? item : JSON.stringify(item)}
                    </div>
                    <button
                      onClick={() => handleRemove(index)}
                      style={{
                        padding: '2px 6px',
                        fontSize: '10px',
                        background: 'transparent',
                        color: '#ef4444',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const isColorProperty = (propName: string, value: any) => {
  if (typeof value !== 'string') return false;
  return propName.toLowerCase().includes('color') || value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl');
};

const isCSSVariable = (value: string): boolean => {
  if (typeof value !== 'string') return false;
  return value.trim().startsWith('var(') && value.includes('--wst-');
};

const extractVariableName = (value: string): string | null => {
  if (!isCSSVariable(value)) return null;
  const match = value.match(/var\((--wst-[^)]+)\)/);
  return match ? match[1] : null;
};

const getComputedCSSValue = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const getAllCSSVariables = (): string[] => {
  const vars: string[] = [];
  const styles = getComputedStyle(document.documentElement);
  for (let i = 0; i < styles.length; i++) {
    const prop = styles[i];
    if (prop.startsWith('--wst-')) {
      vars.push(prop);
    }
  }
  return vars.sort();
};

const getColorVariables = (): string[] => {
  return getAllCSSVariables().filter(v => v.includes('color') || v.includes('Color'));
};

const getTextVariables = (): string[] => {
  // Only return composite font tokens (shorthand), not granular ones
  return getAllCSSVariables().filter(v => 
    v.includes('font') && (
      v.includes('heading-') && v.endsWith('-font') ||
      v.includes('paragraph-') && v.endsWith('-font') ||
      v.includes('button-') && v.endsWith('-font')
    )
  );
};

const isNumericProperty = (propName: string, value: any): boolean => {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num) && !isSizeProperty(propName);
};

const getCSSPropertyOptions = (propName: string): string[] | null => {
  const lowerProp = propName.toLowerCase();
  const options: { [key: string]: string[] } = {
    display: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none', 'table', 'table-cell', 'table-row'],
    position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    textAlign: ['left', 'right', 'center', 'justify'],
    fontWeight: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    textDecoration: ['none', 'underline', 'overline', 'line-through'],
    textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
    whiteSpace: ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line'],
    overflow: ['visible', 'hidden', 'scroll', 'auto'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto'],
    cursor: ['default', 'pointer', 'text', 'move', 'grab', 'grabbing', 'not-allowed', 'wait', 'help'],
    visibility: ['visible', 'hidden', 'collapse'],
    opacity: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
  };
  return options[lowerProp] || null;
};

// const rgbToHex = (rgb: string) => {
//     if (typeof rgb !== 'string') {
//         return '#ffffff';
//     }
//     if (rgb.startsWith('#')) return rgb;
//
//     const el = document.createElement('div');
//     el.style.color = rgb;
//     document.body.appendChild(el);
//     const computedColor = window.getComputedStyle(el).color;
//     document.body.removeChild(el);
//     
//     const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(computedColor);
//     if (result) {
//         return "#" +
//             ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
//             ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
//             ("0" + parseInt(result[3], 10).toString(16)).slice(-2);
//     }
//     
//     return rgb; // fallback
// };

const TokenReference = () => {
  const tokenGroups = [
    {
      title: 'Typography - Composite Heading Tokens (Use These!)',
      tokens: ['--wst-heading-1-font', '--wst-heading-2-font', '--wst-heading-3-font', '--wst-heading-4-font', '--wst-heading-5-font', '--wst-heading-6-font'],
      type: 'font'
    },
    {
      title: 'Typography - Composite Paragraph Tokens (Use These!)',
      tokens: ['--wst-paragraph-1-font', '--wst-paragraph-2-font', '--wst-paragraph-3-font'],
      type: 'font'
    },
    {
      title: 'Typography - Composite Button Tokens',
      tokens: ['--wst-button-primary-font', '--wst-button-secondary-font', '--wst-button-tertiary-font'],
      type: 'font'
    },
    {
      title: 'Typography - Font Families (Atomic)',
      tokens: ['--wst-font-family-default', '--wst-font-family-display', '--wst-font-family-heading', '--wst-font-family-body'],
      type: 'font-family'
    },
    {
      title: 'Typography - Font Sizes (Atomic)',
      tokens: ['--wst-font-size-heading-1', '--wst-font-size-heading-2', '--wst-font-size-heading-3', '--wst-font-size-heading-4', '--wst-font-size-heading-5', '--wst-font-size-heading-6', '--wst-font-size-paragraph-1', '--wst-font-size-paragraph-2', '--wst-font-size-paragraph-3'],
      type: 'font-size'
    },
    {
      title: 'Typography - Font Weights (Atomic)',
      tokens: ['--wst-font-weight-light', '--wst-font-weight-regular', '--wst-font-weight-medium', '--wst-font-weight-semibold', '--wst-font-weight-bold', '--wst-font-weight-extrabold'],
      type: 'font-weight'
    },
    {
      title: 'Typography - Line Heights (Atomic)',
      tokens: ['--wst-line-height-tight', '--wst-line-height-normal', '--wst-line-height-relaxed'],
      type: 'line-height'
    },
    {
      title: 'Base Colors',
      tokens: ['--wst-base-1-color', '--wst-base-2-color']
    },
    {
      title: 'Shade Colors',
      tokens: ['--wst-shade-1-color', '--wst-shade-2-color', '--wst-shade-3-color']
    },
    {
      title: 'Accent Colors',
      tokens: ['--wst-accent-1-color', '--wst-accent-2-color', '--wst-accent-3-color', '--wst-accent-4-color']
    },
    {
      title: 'System Colors',
      tokens: ['--wst-system-success-color', '--wst-system-error-color', '--wst-system-alert-color', '--wst-system-disabled-color', '--wst-system-default-dark-color', '--wst-system-default-light-color']
    },
    {
      title: 'Background Aliases',
      tokens: ['--wst-primary-background-color', '--wst-secondary-background-color']
    },
    {
      title: 'Typography Colors',
      tokens: ['--wst-heading-1-color', '--wst-heading-2-color', '--wst-heading-3-color', '--wst-heading-4-color', '--wst-heading-5-color', '--wst-heading-6-color', '--wst-paragraph-1-color', '--wst-paragraph-2-color', '--wst-paragraph-3-color']
    },
    {
      title: 'Links & Actions',
      tokens: ['--wst-links-and-actions-color']
    },
    {
      title: 'Graphics',
      tokens: ['--wst-graphics-1-color', '--wst-graphics-2-color']
    },
    {
      title: 'Button Primary',
      tokens: ['--wst-button-primary-background-color', '--wst-button-primary-color', '--wst-button-primary-border-top-color', '--wst-button-primary-border-right-color', '--wst-button-primary-border-bottom-color', '--wst-button-primary-border-left-color', '--wst-button-primary-text-highlight']
    },
    {
      title: 'Button Secondary',
      tokens: ['--wst-button-secondary-background-color', '--wst-button-secondary-color', '--wst-button-secondary-border-top-color', '--wst-button-secondary-border-right-color', '--wst-button-secondary-border-bottom-color', '--wst-button-secondary-border-left-color', '--wst-button-secondary-text-highlight']
    },
    {
      title: 'Button Tertiary',
      tokens: ['--wst-button-tertiary-background-color', '--wst-button-tertiary-color', '--wst-button-tertiary-border-top-color', '--wst-button-tertiary-border-right-color', '--wst-button-tertiary-border-bottom-color', '--wst-button-tertiary-border-left-color', '--wst-button-tertiary-text-highlight']
    },
    {
      title: 'Box Primary',
      tokens: ['--wst-box-primary-background-color', '--wst-box-primary-border-top-color', '--wst-box-primary-border-right-color', '--wst-box-primary-border-bottom-color', '--wst-box-primary-border-left-color']
    },
    {
      title: 'Box Secondary',
      tokens: ['--wst-box-secondary-background-color', '--wst-box-secondary-border-top-color', '--wst-box-secondary-border-right-color', '--wst-box-secondary-border-bottom-color', '--wst-box-secondary-border-left-color']
    },
    {
      title: 'System Lines',
      tokens: ['--wst-system-line-1-color', '--wst-system-line-2-color']
    }
  ];

  const getComputedValue = (token: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Design Token Reference</h1>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
        All available design tokens for your components. Use <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>var(--token-name)</code> in your CSS.
      </p>
      
      {tokenGroups.map((group, idx) => (
        <div key={idx} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>{group.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {group.tokens.map((token) => {
              const value = getComputedValue(token);
              const isTransparent = value === 'transparent' || value === 'rgba(255, 255, 255, 0)';
              const isTypography = group.type && ['font', 'font-family', 'font-size', 'font-weight', 'line-height'].includes(group.type);
              
              return (
                <div 
                  key={token}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                >
                  {isTypography ? (
                    <div 
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '6px',
                        background: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: group.type === 'font-size' ? `var(${token})` : '18px',
                        font: group.type === 'font' ? `var(${token})` : 'inherit',
                        fontFamily: group.type === 'font-family' ? `var(${token})` : 'inherit',
                        fontWeight: group.type === 'font-weight' ? `var(${token})` : 400,
                        lineHeight: group.type === 'line-height' ? `var(${token})` : 'normal',
                        color: '#374151'
                      }}
                    >
                      Aa
                    </div>
                  ) : (
                    <div 
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '6px',
                        background: isTransparent ? `repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50% / 8px 8px` : `var(${token})`,
                        border: '1px solid #d1d5db',
                        flexShrink: 0
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '500', color: '#111827', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {token}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>
                      {value || 'not set'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('generated');
  const [code, setCode] = useState(initialCode);
  const [compiledResult, setCompiledResult] = useState<CompiledResult>(() => compileCode(initialCode));
  const [generatedOutput, setGeneratedOutput] = useState(initialGeneratedOutput);
  const [isMetadataPanelOpen, setIsMetadataPanelOpen] = useState(true);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(true);
  const [detailsCollapsedSections, setDetailsCollapsedSections] = useState<{ [key: string]: boolean }>({});
  const [manifestJson, setManifestJson] = useState<any>(null);
  const [componentProps, setComponentProps] = useState<any>({});
  const [componentCssProps, setComponentCssProps] = useState<any>({});
  const [selectorMap, setSelectorMap] = useState<{ [key: string]: string[] }>({});
  const [selectedSelector, setSelectedSelector] = useState<string | null>(null);
  const [selectedElementPath, setSelectedElementPath] = useState<string[] | null>(null);
  const [isSelectionModeEnabled, setIsSelectionModeEnabled] = useState(false);
  const [collapsedNodes, setCollapsedNodes] = useState<{ [key: string]: boolean }>({});
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const componentContainerRef = useRef<HTMLDivElement>(null);
  const componentPreviewAreaRef = useRef<HTMLDivElement>(null);

  const [parsedOutput, setParsedOutput] = useState<ParsedOutput>({
    designBrief: '',
    reactCode: '',
    css: '',
    manifest: '',
    component: null,
    error: null,
  });

  const [containerState, setContainerState] = useState<ContainerState>({
    x: 50,
    y: 50,
    width: 500,
    height: 400
  });

  const [csvResults, setCsvResults] = useState<CSVResult[]>([]);
  const [currentCSVIndex, setCurrentCSVIndex] = useState(0);
  const [isCSVMode, setIsCSVMode] = useState(false);

  useEffect(() => {
    const centerComponent = () => {
      if (componentPreviewAreaRef.current) {
        const previewWidth = componentPreviewAreaRef.current.offsetWidth;
        setContainerState(prevState => ({
          ...prevState,
          x: (previewWidth - prevState.width) / 2,
          y: 20,
        }));
      }
    };
    const timeoutId = setTimeout(centerComponent, 50);

    return () => clearTimeout(timeoutId);
  }, [selectedComponent, isCSVMode, currentCSVIndex, parsedOutput.component]);

  const parseAndCompileGeneratedOutput = (output: string) => {
    const designBriefMatch = output.match(/<design-brief>([\s\S]*?)<\/design-brief>/);
    const reactCodeMatch = output.match(/<react>([\s\S]*?)<\/react>/);
    const cssMatch = output.match(/<css>([\s\S]*?)<\/css>/);
    const manifestMatch = output.match(/<manifest>([\s\S]*?)<\/manifest>/);

    const designBrief = designBriefMatch ? designBriefMatch[1].trim() : 'Not found.';
    const reactCode = reactCodeMatch ? reactCodeMatch[1].trim() : '';
    const css = cssMatch ? cssMatch[1].trim() : '';
    const manifest = manifestMatch ? manifestMatch[1].trim() : 'Not found.';

    // Check if essential tags are missing
    if (!reactCodeMatch) {
      setParsedOutput({
        designBrief: designBrief || 'No design brief found',
        reactCode: '',
        css: css || '',
        manifest: manifest || '',
        component: null,
        error: isCSVMode 
          ? '⚠️ Generation incomplete - Missing <react> tag. This row may have failed during generation. Use navigation to skip to the next result.'
          : 'Error: <react> tag not found in output. Please ensure your pasted output contains <react>...</react> tags.',
      });
      setManifestJson(null);
      return;
    }

    // Remove the style import, as we inject CSS directly
    const sanitizedReactCode = reactCode.replace(new RegExp("import\\s+['\"]\\./style\\.css['\"];?\\s*\\n?"), '');

    const { component, error } = compileCode(sanitizedReactCode);
    
    setParsedOutput({
      designBrief,
      reactCode,
      css,
      manifest,
      component,
      error,
    });

    try {
      if (manifestMatch) {
        setManifestJson(JSON.parse(manifestMatch[1].trim()));
      } else {
        setManifestJson(null);
      }
    } catch (e) {
      console.error("Failed to parse manifest JSON:", e);
      setManifestJson(null);
    }
  };

  useEffect(() => {
    if (manifestJson && manifestJson.editorElement) {
        // Reset image counter for each new component
        imageCounter = 0;
        
        const initialState = buildInitialState(manifestJson.editorElement);
        setComponentProps(initialState);
        const initialCssState = buildInitialCssState(manifestJson.editorElement);
        setComponentCssProps(initialCssState);
        const newSelectorMap: { [key: string]: string[] } = {};
        buildSelectorMap(manifestJson.editorElement, [], newSelectorMap);
        setSelectorMap(newSelectorMap);
        setSelectedSelector(manifestJson.editorElement.selector);
        setSelectedElementPath([]);

        const buildPathsToCollapse = (node: any, path: string, allPaths: { [key: string]: boolean }) => {
            if (!node) return;
            if (node.elements) {
                Object.entries(node.elements).forEach(([key, value]: [string, any]) => {
                    const newPath = `${path}.${key}`;
                    allPaths[newPath] = true; // Collapse this child element
                    buildPathsToCollapse(value.inlineElement, newPath, allPaths);
                });
            }
        };

        const initialCollapsedState: { [key: string]: boolean } = {};
        buildPathsToCollapse(manifestJson.editorElement, 'root', initialCollapsedState);
        setCollapsedNodes(initialCollapsedState);

        if (manifestJson.installation?.initialSize) {
          const { width: widthInfo, height: heightInfo } = manifestJson.installation.initialSize;
          
          setContainerState(prevState => {
              let newWidth = prevState.width;
              let newHeight = prevState.height;

              if (widthInfo) {
                  if (widthInfo.sizingType === 'pixels' && widthInfo.pixels) {
                      newWidth = widthInfo.pixels;
                  } else if (widthInfo.sizingType === 'stretched') {
                      newWidth = 600; // A reasonable default for 'stretched' in the playground
                  }
              }

              if (heightInfo) {
                  if (heightInfo.sizingType === 'pixels' && heightInfo.pixels) {
                      newHeight = heightInfo.pixels;
                  } else if (heightInfo.sizingType === 'content') {
                      newHeight = 'auto'; // Use 'auto' for content-based sizing
                  }
              }

              return { ...prevState, width: newWidth, height: newHeight };
          });
      }
    }
  }, [manifestJson]);

  const handlePropChange = (path: string[], value: any) => {
    setComponentProps((prevProps: any) => {
        const newProps = JSON.parse(JSON.stringify(prevProps)); // Simple deep clone
        let current = newProps;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]] = current[path[i]] || {};
        }
        current[path[path.length - 1]] = value;
        return newProps;
    });
  };

  const handleCssPropChange = (path: string[], propName: string, value: any) => {
    setComponentCssProps((prevProps: any) => {
        const newProps = JSON.parse(JSON.stringify(prevProps)); // Simple deep clone
        let current = newProps;
        for (let i = 0; i < path.length; i++) {
             if (i % 2 === 0) { // 'elements'
                current = current[path[i]] = current[path[i]] || {};
            } else { // 'galleryControls'
                current = current[path[i]] = current[path[i]] || {};
            }
        }
        if (!current.properties) {
            current.properties = {};
        }
        current.properties[propName] = value;
        return newProps;
    });
  };

  const handleComponentClick = (e: React.MouseEvent) => {
    if (!isSelectionModeEnabled) return;

    e.preventDefault();
    e.stopPropagation();

    const overlay = e.currentTarget as HTMLElement;
    
    // Temporarily hide overlay to find element underneath
    overlay.style.display = 'none';
    const elementUnderneath = document.elementFromPoint(e.clientX, e.clientY);
    overlay.style.display = 'block';

    if (!elementUnderneath || !componentContainerRef.current || !componentContainerRef.current.contains(elementUnderneath)) {
        if (manifestJson && manifestJson.editorElement) {
            setSelectedSelector(manifestJson.editorElement.selector);
            setSelectedElementPath([]);
        }
        return;
    }
    
    let target = elementUnderneath as HTMLElement;

    while(target && target !== componentContainerRef.current) {
        for (const selector in selectorMap) {
            if (target.matches(selector)) {
                setSelectedSelector(selector);
                setSelectedElementPath(selectorMap[selector]);
                return;
            }
        }
        target = target.parentElement as HTMLElement;
    }

    if (manifestJson && manifestJson.editorElement) {
      setSelectedSelector(manifestJson.editorElement.selector);
      setSelectedElementPath([]);
    }
  };


  useEffect(() => {
    if (!componentContainerRef.current || !manifestJson || Object.keys(componentCssProps).length === 0) return;

    const applyStyles = (node: any, cssStateNode: any) => {
        if (!node || !cssStateNode) return;

        if (node.selector && cssStateNode.properties) {
            try {
              const element = componentContainerRef.current?.querySelector(node.selector);
              if (element) {
                  Object.entries(cssStateNode.properties).forEach(([prop, value]) => {
                      const cssProp = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
                      (element as HTMLElement).style.setProperty(cssProp, value as string, 'important');
                  });
              }
            } catch (e) {
              // ignore invalid selector
            }
        }

        if (node.elements && cssStateNode.elements) {
            Object.entries(node.elements).forEach(([key, value]: [string, any]) => {
                applyStyles(value.inlineElement, cssStateNode.elements[key]);
            });
        }
    };

    applyStyles(manifestJson.editorElement, componentCssProps);

  }, [componentCssProps, manifestJson, parsedOutput.component]);

  useEffect(() => {
    if (isCSVMode && csvResults.length > 0) {
      const currentResult = csvResults[currentCSVIndex];
      parseAndCompileGeneratedOutput(currentResult.generatedOutput);
    } else {
      parseAndCompileGeneratedOutput(generatedOutput);
    }
  }, [generatedOutput, isCSVMode, csvResults, currentCSVIndex]);

  useEffect(() => {
    if (!isCSVMode || csvResults.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPreviousResult();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNextResult();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCSVMode, csvResults.length, currentCSVIndex]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const results = parseCSV(text);
      if (results.length > 0) {
        setCsvResults(results);
        setCurrentCSVIndex(0);
        setIsCSVMode(true);
        setSelectedComponent('generated');
      } else {
        alert('No valid results found in CSV file.');
      }
    };
    reader.readAsText(file);
  };

  const goToPreviousResult = () => {
    if (currentCSVIndex > 0) {
      setCurrentCSVIndex(currentCSVIndex - 1);
    }
  };

  const goToNextResult = () => {
    if (currentCSVIndex < csvResults.length - 1) {
      setCurrentCSVIndex(currentCSVIndex + 1);
    }
  };

  const goToNextValidResult = () => {
    for (let i = currentCSVIndex + 1; i < csvResults.length; i++) {
      const result = csvResults[i];
      if (result.generatedOutput.includes('<react>')) {
        setCurrentCSVIndex(i);
        return;
      }
    }
    // If no valid result found, stay at current position
    alert('No more valid results found after this position.');
  };

  const goToPreviousValidResult = () => {
    for (let i = currentCSVIndex - 1; i >= 0; i--) {
      const result = csvResults[i];
      if (result.generatedOutput.includes('<react>')) {
        setCurrentCSVIndex(i);
        return;
      }
    }
    // If no valid result found, stay at current position
    alert('No valid results found before this position.');
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setCompiledResult(compileCode(newCode));
  };

  const handleToggleNode = (path: string) => {
    setCollapsedNodes(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case '1':
        return <ErrorBoundary key={1}><Component1 /></ErrorBoundary>;
      case '2':
        return <ErrorBoundary key={2}><Component2 /></ErrorBoundary>;
      case 'tokens':
        return <TokenReference />;
      case 'generated': {
        const RenderedComponent = parsedOutput.component;
        if (parsedOutput.error) {
          return <div style={{ color: 'red', padding: '1rem' }}><strong>Error:</strong> {parsedOutput.error}</div>;
        }
        return RenderedComponent ? (
          <ErrorBoundary key={isCSVMode ? csvResults[currentCSVIndex].index : generatedOutput}>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
              <div ref={componentContainerRef} className="component-container">
                {selectedSelector && isSelectionModeEnabled && (
                  <style>
                    {`
                      .component-container ${selectedSelector} {
                        outline: 2px solid #2563eb !important;
                        outline-offset: 2px;
                      }
                    `}
                  </style>
                )}
                <style>{parsedOutput.css}</style>
                <RenderedComponent 
                  {...{
                    className: "generated-component",
                    id: "generated-component-1",
                    wix: {},
                    ...componentProps,
                  } as any}
                />
              </div>
              {isSelectionModeEnabled && (
                <div 
                  onClick={handleComponentClick} 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9999,
                    cursor: 'crosshair',
                    background: 'rgba(0, 100, 255, 0.05)',
                  }}
                />
              )}
            </div>
          </ErrorBoundary>
        ) : <div>Compiling...</div>;
      }
      case 'live':
        if (compiledResult.error) {
          return <div style={{ color: 'red', padding: '1rem' }}><strong>Error:</strong> {compiledResult.error}</div>;
        }
        const LiveComponent = compiledResult.component;
        return (
          <ErrorBoundary key={code}>
            {LiveComponent ? <LiveComponent /> : <div>Compiling...</div>}
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        input[type="range"]::-webkit-slider-track {
          background: #f4f4f5;
          height: 4px;
          border-radius: 2px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          margin-top: -4px;
        }
        input[type="range"]::-moz-range-track {
          background: #f4f4f5;
          height: 4px;
          border-radius: 2px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
        }
        input[type="range"]::-moz-range-progress {
          background: #2563eb;
          height: 4px;
          border-radius: 2px;
        }
      `}</style>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', background: '#fafafa' }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px', 
        height: '48px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)', 
        background: '#ffffff',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.02)',
      }}>
        <h2 style={{
          margin: 0,
          marginRight: '32px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#09090b',
          letterSpacing: '-0.01em',
        }}>Components</h2>
        
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          <button 
            style={navButtonStyle(selectedComponent === '1')}
            onClick={() => setSelectedComponent('1')}
          >
            <span style={{ marginRight: '6px' }}>📊</span>
            Before/After Slider
          </button>
          
          <button 
            style={navButtonStyle(selectedComponent === '2')}
            onClick={() => setSelectedComponent('2')}
          >
            <span style={{ marginRight: '6px' }}>🎨</span>
            Component 2
          </button>
          
          <button 
            style={navButtonStyle(selectedComponent === 'live')}
            onClick={() => setSelectedComponent('live')}
          >
            <span style={{ marginRight: '6px' }}>⚡</span>
            Live Editor
          </button>

          <button 
            style={navButtonStyle(selectedComponent === 'generated')}
            onClick={() => setSelectedComponent('generated')}
          >
            <span style={{ marginRight: '6px' }}>📄</span>
            Generated Output
          </button>
          
          <button 
            style={navButtonStyle(selectedComponent === 'tokens')}
            onClick={() => setSelectedComponent('tokens')}
          >
            <span style={{ marginRight: '6px' }}>🎨</span>
            Design Tokens
          </button>
        </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedComponent === 'generated' && (
            <>
              <div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  style={{ display: 'none' }}
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#09090b',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.15s ease',
                    border: 'none',
                    height: '32px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#18181b'; target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; }}
                  onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#09090b'; target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'; }}
                >
                  <span style={{ marginRight: '6px' }}>📁</span>
                  Upload CSV
                </label>
                {isCSVMode && csvResults.length > 0 && (
                  <button
                    onClick={() => {
                      setIsCSVMode(false);
                      setCsvResults([]);
                      setCurrentCSVIndex(0);
                    }}
                    style={{
                      marginLeft: '8px',
                      padding: '6px 12px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#71717a',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      height: '32px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#fafafa'; target.style.color = '#27272a'; }}
                    onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#ffffff'; target.style.color = '#71717a'; }}
                  >
                    ✕ Clear ({csvResults.length})
                  </button>
                )}
              </div>

              {isCSVMode && csvResults.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                   <button
                    onClick={goToPreviousResult}
                    disabled={currentCSVIndex === 0}
                    style={paginationButtonStyle(currentCSVIndex === 0)}
                  >
                    ←
                  </button>
                  <select
                    value={currentCSVIndex}
                    onChange={(e) => setCurrentCSVIndex(parseInt(e.target.value))}
                    style={{
                      padding: '6px 10px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      background: '#ffffff',
                      cursor: 'pointer',
                      minWidth: '200px',
                      height: '32px',
                      color: '#09090b',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                  >
                    {csvResults.map((result, idx) => {
                      const isValid = result.generatedOutput.includes('<react>');
                      return (
                        <option key={idx} value={idx}>
                          {isValid ? '✓' : '✗'} #{result.index} - {result.prompt.substring(0, 25)}{result.prompt.length > 25 ? '...' : ''}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    onClick={goToNextResult}
                    disabled={currentCSVIndex === csvResults.length - 1}
                    style={paginationButtonStyle(currentCSVIndex === csvResults.length - 1)}
                  >
                    →
                  </button>
                   <button
                    onClick={goToPreviousValidResult}
                    style={paginationButtonStyle(false, true)}
                  >
                    ⏮
                  </button>
                  <button
                    onClick={goToNextValidResult}
                    style={paginationButtonStyle(false, true)}
                  >
                    ⏭
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ 
          width: (selectedComponent === 'generated' && isCSVMode) || selectedComponent === 'tokens' ? '0px' : '320px',
          padding: (selectedComponent === 'generated' && isCSVMode) || selectedComponent === 'tokens' ? '0' : '20px',
          borderRight: (selectedComponent === 'generated' && isCSVMode) || selectedComponent === 'tokens' ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
          overflowY: 'auto', 
          background: '#ffffff',
          transition: 'all 0.3s ease-in-out',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {selectedComponent === 'live' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#09090b',
                marginBottom: '12px',
                flexShrink: 0,
                letterSpacing: '-0.01em'
              }}>Code Editor</h3>
              <div style={{ 
                border: '1px solid rgba(0, 0, 0, 0.08)', 
                borderRadius: '6px', 
                overflow: 'hidden', 
                background: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                flex: 1,
                minHeight: 0
              }}>
                <Editor
                  value={code}
                  onValueChange={handleCodeChange}
                  highlight={(c) => Prism.highlight(c, Prism.languages.jsx, 'jsx')}
                  padding={12}
                  style={{
                    fontFamily: '"Fira Code", "SF Mono", Monaco, monospace',
                    fontSize: 13,
                    lineHeight: 1.5,
                    height: '100%',
                    overflow: 'auto'
                  }}
                />
              </div>
            </div>
          )}

          {selectedComponent === 'generated' && (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', height: '100%'}}>
              {!isCSVMode && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexShrink: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#09090b', letterSpacing: '-0.01em' }}>
                      Paste Generated Output
                    </h3>
                    <button
                      onClick={() => setGeneratedOutput('')}
                      style={{
                        padding: '5px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '5px',
                        background: '#ffffff',
                        color: '#71717a',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '500',
                        transition: 'all 0.15s ease',
                        height: '24px',
                      }}
                      onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#fafafa'; target.style.color = '#27272a'; }}
                      onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#ffffff'; target.style.color = '#71717a'; }}
                    >
                      Clear
                    </button>
                  </div>
                  <textarea
                    value={generatedOutput}
                    onChange={(e) => setGeneratedOutput(e.target.value)}
                    style={{
                      width: '100%',
                        fontFamily: '"Fira Code", "SF Mono", Monaco, monospace',
                        fontSize: 12,
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '6px',
                        padding: '12px',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        flex: 1,
                        background: '#ffffff',
                        color: '#09090b',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <div ref={componentPreviewAreaRef} style={{ 
          flex: 1, 
          padding: '20px', 
          position: 'relative', 
          background: '#fafafa',
          minHeight: 0,
          display: 'flex',
          gap: '20px'
        }}>
          {selectedComponent === 'tokens' ? (
            <div style={{ flex: 1, overflow: 'auto', background: '#ffffff', borderRadius: '12px' }}>
              <TokenReference />
            </div>
          ) : selectedComponent === 'generated' ? (
            <div style={{
              display: 'flex',
              width: '100%',
              position: 'relative'
            }}>
              {/* Floating Details Panel */}
              {isMetadataPanelOpen && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '360px',
                  height: 'calc(100% - 32px)',
                  maxHeight: 'calc(100% - 32px)',
                  background: '#ffffff',
                  padding: '0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
                  zIndex: 100,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '14px 16px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    background: '#fafafa',
                    flexShrink: 0,
                  }}>
                    <h2 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#09090b', letterSpacing: '-0.01em' }}>Details</h2>
                    <button
                      onClick={() => setIsMetadataPanelOpen(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#71717a',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                      }}
                      onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#f4f4f5'; target.style.color = '#27272a'; }}
                      onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = 'transparent'; target.style.color = '#71717a'; }}
                    >
                      &times;
                    </button>
                  </div>
                  <div style={{ 
                    padding: '16px', 
                    overflowY: 'auto', 
                    overflowX: 'hidden',
                    flex: 1,
                    minHeight: 0,
                  }}>
                  {isCSVMode && csvResults.length > 0 && (
                    <>
                      <div style={{
                        background: '#fafafa',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '16px',
                        border: '1px solid rgba(0, 0, 0, 0.06)'
                      }}>
                        <div 
                          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between' }}
                        >
                          <div 
                            onClick={() => setDetailsCollapsedSections(prev => ({ ...prev, prompt: !prev.prompt }))}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flex: 1 }}
                          >
                            <span style={{ marginRight: '6px', fontSize: '10px', color: '#71717a', width: '10px' }}>
                              {detailsCollapsedSections.prompt ? '▸' : '▾'}
                            </span>
                            <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prompt</h3>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(csvResults[currentCSVIndex].prompt, 'prompt');
                            }}
                            style={{
                              padding: '6px',
                              fontSize: '10px',
                              background: copiedSection === 'prompt' ? '#16a34a' : 'transparent',
                              color: copiedSection === 'prompt' ? '#ffffff' : '#71717a',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                            }}
                            title={copiedSection === 'prompt' ? 'Copied!' : 'Copy'}
                            onMouseEnter={(e) => { if (copiedSection !== 'prompt') e.currentTarget.style.background = '#f4f4f5'; }}
                            onMouseLeave={(e) => { if (copiedSection !== 'prompt') e.currentTarget.style.background = 'transparent'; }}
                          >
                            {copiedSection === 'prompt' ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                              </svg>
                            )}
                          </button>
                        </div>
                        {!detailsCollapsedSections.prompt && (
                          <>
                            <p style={{ margin: '0 0 0 16px', fontSize: '12px', lineHeight: '1.5', color: '#27272a' }}>
                              {csvResults[currentCSVIndex].prompt}
                            </p>
                            {csvResults[currentCSVIndex].category && (
                              <>
                                <h3 style={{ marginTop: '12px', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</h3>
                                <span style={{
                                  display: 'inline-block',
                                  background: '#f4f4f5',
                                  color: '#09090b',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '500'
                                }}>
                                  {csvResults[currentCSVIndex].category}
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.06)'}} />
                    </>
                  )}
                  <div style={{ marginBottom: '16px' }}>
                    <div 
                      style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between' }}
                    >
                      <div 
                        onClick={() => setDetailsCollapsedSections(prev => ({ ...prev, brief: !prev.brief }))}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flex: 1 }}
                      >
                        <span style={{ marginRight: '6px', fontSize: '10px', color: '#71717a', width: '10px' }}>
                          {detailsCollapsedSections.brief ? '▸' : '▾'}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Design Brief</h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(parsedOutput.designBrief, 'brief');
                        }}
                        style={{
                          padding: '6px',
                          fontSize: '10px',
                          background: copiedSection === 'brief' ? '#16a34a' : 'transparent',
                          color: copiedSection === 'brief' ? '#ffffff' : '#71717a',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                        }}
                        title={copiedSection === 'brief' ? 'Copied!' : 'Copy'}
                        onMouseEnter={(e) => { if (copiedSection !== 'brief') e.currentTarget.style.background = '#f4f4f5'; }}
                        onMouseLeave={(e) => { if (copiedSection !== 'brief') e.currentTarget.style.background = 'transparent'; }}
                      >
                        {copiedSection === 'brief' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    {!detailsCollapsedSections.brief && (
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '11px', background: '#fafafa', padding: '12px', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.06)', color: '#27272a', lineHeight: '1.5', margin: '0 0 0 16px' }}>{parsedOutput.designBrief}</pre>
                    )}
                  </div>
                  <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.06)'}} />
                  <div style={{ marginBottom: '16px' }}>
                    <div 
                      style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between' }}
                    >
                      <div 
                        onClick={() => setDetailsCollapsedSections(prev => ({ ...prev, react: !prev.react }))}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flex: 1 }}
                      >
                        <span style={{ marginRight: '6px', fontSize: '10px', color: '#71717a', width: '10px' }}>
                          {detailsCollapsedSections.react ? '▸' : '▾'}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>React</h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(parsedOutput.reactCode, 'react');
                        }}
                        style={{
                          padding: '6px',
                          fontSize: '10px',
                          background: copiedSection === 'react' ? '#16a34a' : 'transparent',
                          color: copiedSection === 'react' ? '#ffffff' : '#71717a',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                        }}
                        title={copiedSection === 'react' ? 'Copied!' : 'Copy'}
                        onMouseEnter={(e) => { if (copiedSection !== 'react') e.currentTarget.style.background = '#f4f4f5'; }}
                        onMouseLeave={(e) => { if (copiedSection !== 'react') e.currentTarget.style.background = 'transparent'; }}
                      >
                        {copiedSection === 'react' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    {!detailsCollapsedSections.react && (
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: '"Fira Code", "SF Mono", Monaco, monospace', fontSize: '11px', background: '#fafafa', padding: '12px', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.06)', lineHeight: '1.5', margin: '0 0 0 16px', overflowX: 'auto' }}>
                        <code 
                          dangerouslySetInnerHTML={{ 
                            __html: Prism.highlight(parsedOutput.reactCode, Prism.languages.jsx, 'jsx') 
                          }}
                        />
                      </pre>
                    )}
                  </div>
                  <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.06)'}} />
                  <div>
                    <div 
                      style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between' }}
                    >
                      <div 
                        onClick={() => setDetailsCollapsedSections(prev => ({ ...prev, manifest: !prev.manifest }))}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flex: 1 }}
                      >
                        <span style={{ marginRight: '6px', fontSize: '10px', color: '#71717a', width: '10px' }}>
                          {detailsCollapsedSections.manifest ? '▸' : '▾'}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manifest</h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(parsedOutput.manifest, 'manifest');
                        }}
                        style={{
                          padding: '6px',
                          fontSize: '10px',
                          background: copiedSection === 'manifest' ? '#16a34a' : 'transparent',
                          color: copiedSection === 'manifest' ? '#ffffff' : '#71717a',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                        }}
                        title={copiedSection === 'manifest' ? 'Copied!' : 'Copy'}
                        onMouseEnter={(e) => { if (copiedSection !== 'manifest') e.currentTarget.style.background = '#f4f4f5'; }}
                        onMouseLeave={(e) => { if (copiedSection !== 'manifest') e.currentTarget.style.background = 'transparent'; }}
                      >
                        {copiedSection === 'manifest' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    {!detailsCollapsedSections.manifest && (
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '11px', background: '#fafafa', padding: '12px', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.06)', color: '#27272a', lineHeight: '1.5', margin: '0 0 0 16px' }}>{parsedOutput.manifest}</pre>
                    )}
                  </div>
                  </div>
                </div>
              )}

              {/* Floating Properties Panel */}
              {isPropertiesPanelOpen && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '360px',
                  height: 'calc(100% - 32px)',
                  maxHeight: 'calc(100% - 32px)',
                  background: '#ffffff',
                  padding: '0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
                  zIndex: 100,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '14px 16px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    background: '#fafafa',
                    flexShrink: 0,
                  }}>
                    <h2 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#09090b', letterSpacing: '-0.01em' }}>Properties</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => setIsSelectionModeEnabled(!isSelectionModeEnabled)}
                        style={{
                          background: isSelectionModeEnabled ? '#f4f4f5' : 'transparent',
                          border: 'none',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          lineHeight: '24px',
                          color: isSelectionModeEnabled ? '#09090b' : '#71717a',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                        }}
                        title="Selection Mode"
                        onMouseEnter={(e) => { const target = e.currentTarget; if (!isSelectionModeEnabled) { target.style.background = '#f4f4f5'; target.style.color = '#27272a'; } }}
                        onMouseLeave={(e) => { const target = e.currentTarget; if (!isSelectionModeEnabled) { target.style.background = 'transparent'; target.style.color = '#71717a'; } }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setIsPropertiesPanelOpen(false)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: '#71717a',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                        }}
                        onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#f4f4f5'; target.style.color = '#27272a'; }}
                        onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = 'transparent'; target.style.color = '#71717a'; }}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '16px', 
                    overflowY: 'auto', 
                    overflowX: 'hidden',
                    flex: 1,
                    minHeight: 0,
                  }}>
                    {(() => {
                      if (!manifestJson || !manifestJson.editorElement || selectedElementPath === null) {
                        return <p>Select an element to see its properties.</p>;
                      }
                      
                      const node = selectedElementPath.length > 0 ? getNodeByPath(manifestJson.editorElement, selectedElementPath) : manifestJson.editorElement;
                      
                      if (!node) {
                        return <p>Could not find the selected element in the manifest.</p>
                      }
                      
                      const nodeToRender = node.inlineElement || node;
                      
                      let propPath = ['root'];
                      let cssPath = ['rootCss'];

                      selectedElementPath.forEach(segment => {
                          if (segment === 'elements') {
                              propPath.push('elementProps');
                              cssPath.push('elements');
                          } else {
                              propPath.push(segment);
                              cssPath.push(segment);
                          }
                      });


                      return <ManifestNode
                        node={nodeToRender}
                        nodeKey={nodeToRender.displayName || 'Selected Element'}
                        path="root"
                        propPath={propPath}
                        cssPath={cssPath}
                        props={componentProps}
                        onPropChange={handlePropChange}
                        cssProps={componentCssProps}
                        onCssChange={handleCssPropChange}
                        collapsedNodes={collapsedNodes}
                        onToggleNode={handleToggleNode}
                      />
                    })()}
                  </div>
                </div>
              )}

              {/* Main Component Area */}
              <div style={{
                flex: 1,
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: 20, display: 'flex', gap: '8px' }}>
                  {!isMetadataPanelOpen && (
                  <button
                    onClick={() => setIsMetadataPanelOpen(true)}
                    style={{
                      padding: '6px 10px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '5px',
                      background: '#ffffff',
                      color: '#71717a',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '500',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      transition: 'all 0.15s ease',
                      height: '28px',
                    }}
                    onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#fafafa'; target.style.color = '#27272a'; target.style.borderColor = 'rgba(0, 0, 0, 0.12)'; }}
                    onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#ffffff'; target.style.color = '#71717a'; target.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                  >
                    Show Details
                  </button>
                  )}
                </div>
                {!isPropertiesPanelOpen && (
                  <button
                    onClick={() => setIsPropertiesPanelOpen(true)}
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      zIndex: 20,
                      padding: '6px 10px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '5px',
                      background: '#ffffff',
                      color: '#71717a',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '500',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      transition: 'all 0.15s ease',
                      height: '28px',
                    }}
                    onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#fafafa'; target.style.color = '#27272a'; target.style.borderColor = 'rgba(0, 0, 0, 0.12)'; }}
                    onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#ffffff'; target.style.color = '#71717a'; target.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                  >
                    Show Properties
                  </button>
                )}
                <Suspense fallback={<div>Loading...</div>}>
                  <ResizableSlider
                    containerState={containerState}
                    onContainerChange={setContainerState}
                  >
                    {renderComponent()}
                  </ResizableSlider>
                </Suspense>
              </div>
            </div>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <ResizableSlider 
                containerState={containerState}
                onContainerChange={setContainerState}
              >
                {renderComponent()}
              </ResizableSlider>
            </Suspense>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

const navButtonStyle = (isActive: boolean): CSSProperties => ({
  padding: '6px 12px',
  margin: 0,
  border: 'none',
  borderRadius: '5px',
  background: isActive ? '#f4f4f5' : 'transparent',
  color: isActive ? '#09090b' : '#71717a',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  height: '32px',
});

const paginationButtonStyle = (disabled: boolean, isSecondary: boolean = false): CSSProperties => ({
  padding: '6px 10px',
  border: `1px solid ${isSecondary ? 'rgba(22, 163, 74, 0.2)' : 'rgba(0, 0, 0, 0.08)'}`,
  borderRadius: '5px',
  background: disabled ? '#fafafa' : '#ffffff',
  color: disabled ? '#d4d4d8' : isSecondary ? '#16a34a' : '#71717a',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontSize: '12px',
  fontWeight: '500',
  transition: 'all 0.15s ease',
  height: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});


export default App;
