import React, { useState, lazy, Suspense, useEffect, CSSProperties } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { transform } from '@babel/standalone';
import type { TransformOptions } from '@babel/core';

import ResizableSlider from './ResizableSlider';

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
      throw new Error(`Cannot find module '${name}'`);
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

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('generated');
  const [code, setCode] = useState(initialCode);
  const [compiledResult, setCompiledResult] = useState<CompiledResult>(() => compileCode(initialCode));
  const [generatedOutput, setGeneratedOutput] = useState(initialGeneratedOutput);
  const [isMetadataPanelOpen, setIsMetadataPanelOpen] = useState(true);

  const [parsedOutput, setParsedOutput] = useState<ParsedOutput>({
    designBrief: '',
    reactCode: '',
    css: '',
    manifest: '',
    component: null,
    error: null,
  });

  const [containerState, setContainerState] = useState({
    x: 50,
    y: 50,
    width: 500,
    height: 400
  });

  const [csvResults, setCsvResults] = useState<CSVResult[]>([]);
  const [currentCSVIndex, setCurrentCSVIndex] = useState(0);
  const [isCSVMode, setIsCSVMode] = useState(false);

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
  };

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

  const renderComponent = () => {
    switch (selectedComponent) {
      case '1':
        return <Component1 />;
      case '2':
        return <Component2 />;
      case 'generated': {
        const RenderedComponent = parsedOutput.component;
        if (parsedOutput.error) {
          return <div style={{ color: 'red', padding: '1rem' }}><strong>Error:</strong> {parsedOutput.error}</div>;
        }
        return RenderedComponent ? (
          <>
            <style>{parsedOutput.css}</style>
            <RenderedComponent 
              {...{
                className: "generated-component",
                id: "generated-component-1",
                wix: {}
              } as any}
            />
          </>
        ) : <div>Compiling...</div>;
      }
      case 'live':
        if (compiledResult.error) {
          return <div style={{ color: 'red', padding: '1rem' }}><strong>Error:</strong> {compiledResult.error}</div>;
        }
        const LiveComponent = compiledResult.component;
        return LiveComponent ? <LiveComponent /> : <div>Compiling...</div>;
      default:
        return null;
    }
  };

  const buttonStyle = (isActive: boolean): CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    margin: '4px 0',
    border: 'none',
    borderRadius: '8px',
    background: isActive ? '#0070f3' : '#ffffff',
    color: isActive ? '#ffffff' : '#333333',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    boxShadow: isActive ? '0 4px 14px 0 rgba(0, 118, 255, 0.39)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
  });

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean, isActive: boolean) => {
    if (!isActive) {
      const target = e.currentTarget;
      target.style.background = isHovering ? '#f1f3f4' : '#ffffff';
      target.style.transform = isHovering ? 'translateY(-1px)' : 'translateY(0)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', background: '#ffffff' }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px', 
        borderBottom: '1px solid #e5e7eb', 
        background: '#ffffff',
      }}>
        <h2 style={{
          margin: 0,
          marginRight: '24px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
        }}>Components</h2>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            style={navButtonStyle(selectedComponent === '1')}
            onClick={() => setSelectedComponent('1')}
          >
            📊 Before/After Slider
          </button>
          
          <button 
            style={navButtonStyle(selectedComponent === '2')}
            onClick={() => setSelectedComponent('2')}
          >
            🎨 Component 2
          </button>
          
          <button 
            style={navButtonStyle(selectedComponent === 'live')}
            onClick={() => setSelectedComponent('live')}
          >
            ⚡ Live Editor
          </button>

          <button 
            style={navButtonStyle(selectedComponent === 'generated')}
            onClick={() => setSelectedComponent('generated')}
          >
            📄 Generated Output
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
                    display: 'inline-block',
                    padding: '8px 14px',
                    border: '1px solid #2563eb',
                    borderRadius: '6px',
                    background: '#2563eb',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#1d4ed8'; }}
                  onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#2563eb'; }}
                >
                  📁 Upload CSV
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
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
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
                      padding: '7px 10px',
                      border: '1px solid #dcdcdc',
                      borderRadius: '6px',
                      fontSize: '13px',
                      background: '#ffffff',
                      cursor: 'pointer',
                      minWidth: '200px'
                    }}
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
          width: selectedComponent === 'generated' && isCSVMode ? '0px' : '320px',
          padding: selectedComponent === 'generated' && isCSVMode ? '0' : '24px',
          borderRight: selectedComponent === 'generated' && isCSVMode ? 'none' : '1px solid #e5e7eb',
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
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
                flexShrink: 0
              }}>Code Editor</h3>
              <div style={{ 
                border: '1px solid #d1d4d8', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                background: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
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
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#374151' }}>
                      Paste Generated Output
                    </h3>
                    <button
                      onClick={() => setGeneratedOutput('')}
                      style={{
                        padding: '6px 12px',
                        border: '1px solid #d1d4d8',
                        borderRadius: '6px',
                        background: '#ffffff',
                        color: '#374151',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#f9fafb'; }}
                      onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#ffffff'; }}
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
                      fontSize: 13,
                      border: '1px solid #d1d4d8',
                      borderRadius: '8px',
                      padding: '12px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      flex: 1
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <div style={{ 
          flex: 1, 
          padding: '24px', 
          position: 'relative', 
          background: '#f9fafb',
          minHeight: 0,
          display: 'flex',
          gap: '20px'
        }}>
          {selectedComponent === 'generated' ? (
            <div style={{
              display: 'flex',
              width: '100%',
              gap: '20px'
            }}>
              {isMetadataPanelOpen && (
                <div style={{
                  flex: 0.5,
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  overflow: 'auto',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  minWidth: '250px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Details</h2>
                    <button
                      onClick={() => setIsMetadataPanelOpen(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        lineHeight: '32px',
                        color: '#666666',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#f0f0f0'; target.style.color = '#111111'; }}
                      onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = 'transparent'; target.style.color = '#666666'; }}
                    >
                      &times;
                    </button>
                  </div>
                  {isCSVMode && csvResults.length > 0 && (
                    <>
                      <div style={{
                        background: '#f9fafb',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#111827' }}>Prompt</h3>
                        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#374151' }}>
                          {csvResults[currentCSVIndex].prompt}
                        </p>
                        {csvResults[currentCSVIndex].category && (
                          <>
                            <h3 style={{ marginTop: '16px', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#111827' }}>Category</h3>
                            <span style={{
                              display: 'inline-block',
                              background: '#eff6ff',
                              color: '#2563eb',
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {csvResults[currentCSVIndex].category}
                            </span>
                          </>
                        )}
                      </div>
                      <hr style={{margin: '24px 0', border: 'none', borderTop: '1px solid #e5e7eb'}} />
                    </>
                  )}
                  <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>Design Brief</h3>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px', background: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>{parsedOutput.designBrief}</pre>
                  <hr style={{margin: '24px 0', border: 'none', borderTop: '1px solid #e5e7eb'}} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>Manifest</h3>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px', background: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>{parsedOutput.manifest}</pre>
                </div>
              )}
              <div style={{
                flex: 1.5,
                position: 'relative'
              }}>
                {!isMetadataPanelOpen && (
                  <button
                    onClick={() => setIsMetadataPanelOpen(true)}
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                      zIndex: 20,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { const target = e.currentTarget; target.style.background = '#f9fafb'; }}
                    onMouseLeave={(e) => { const target = e.currentTarget; target.style.background = '#ffffff'; }}
                  >
                    Show Details
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
  );
};

const navButtonStyle = (isActive: boolean): CSSProperties => ({
  padding: '8px 16px',
  margin: 0,
  border: 'none',
  borderRadius: '6px',
  background: isActive ? '#f3f4f6' : 'transparent',
  color: isActive ? '#1f2937' : '#6b7280',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.2s ease',
});

const paginationButtonStyle = (disabled: boolean, isSecondary: boolean = false): CSSProperties => ({
  padding: '8px 12px',
  border: `1px solid ${isSecondary ? '#16a34a' : '#e5e7eb'}`,
  borderRadius: '6px',
  background: disabled ? '#f9fafb' : '#ffffff',
  color: disabled ? '#9ca3af' : isSecondary ? '#16a34a' : '#374151',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
});


export default App;
