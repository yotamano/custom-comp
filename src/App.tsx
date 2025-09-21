import React, { useState, lazy, Suspense, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { transform } from '@babel/standalone';

import ResizableSlider from './ResizableSlider';

const Component1 = lazy(() => import('../1'));
const Component2 = lazy(() => import('../2'));

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

const compileCode = (code) => {
  try {
    const transformedCode = transform(code, {
      presets: ['react', 'env', 'typescript'],
      filename: 'component.tsx', // Allow JSX parsing
    }).code;
    
    const exports = {};
    const require = (name) => {
      if (name === 'react') return React;
      throw new Error(`Cannot find module '${name}'`);
    };
    
    new Function('exports', 'require', transformedCode)(exports, require);
    
    if (exports.default) {
      return { component: exports.default, error: null };
    }
    return { component: null, error: 'No default export found.' };
  } catch (error) {
    console.error("Error compiling code:", error);
    return { component: null, error: error.message };
  }
};

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('1');
  const [code, setCode] = useState(initialCode);
  const [compiledResult, setCompiledResult] = useState(() => compileCode(initialCode));
  const [generatedOutput, setGeneratedOutput] = useState(initialGeneratedOutput);
  const [isMetadataPanelOpen, setIsMetadataPanelOpen] = useState(true);

  const [parsedOutput, setParsedOutput] = useState({
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

  const parseAndCompileGeneratedOutput = (output) => {
    const designBriefMatch = output.match(/<design-brief>([\s\S]*?)<\/design-brief>/);
    const reactCodeMatch = output.match(/<react>([\s\S]*?)<\/react>/);
    const cssMatch = output.match(/<css>([\s\S]*?)<\/css>/);
    const manifestMatch = output.match(/<manifest>([\s\S]*?)<\/manifest>/);

    const designBrief = designBriefMatch ? designBriefMatch[1].trim() : 'Not found.';
    const reactCode = reactCodeMatch ? reactCodeMatch[1].trim() : 'Not found.';
    const css = cssMatch ? cssMatch[1].trim() : 'Not found.';
    const manifest = manifestMatch ? manifestMatch[1].trim() : 'Not found.';

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
    parseAndCompileGeneratedOutput(generatedOutput);
  }, [generatedOutput]);

  const handleCodeChange = (newCode) => {
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
            <RenderedComponent />
          </>
        ) : <div>Compiling...</div>;
      }
      case 'live':
        if (compiledResult.error) {
          return <div style={{ color: 'red', padding: '1rem' }}><strong>Error:</strong> {compiledResult.error}</div>;
        }
        return compiledResult.component ? <compiledResult.component /> : <div>Compiling...</div>;
      default:
        return null;
    }
  };

  const buttonStyle = (isActive) => ({
    width: '100%',
    padding: '12px 16px',
    margin: '4px 0',
    border: 'none',
    borderRadius: '8px',
    background: isActive ? '#3498db' : '#ffffff',
    color: isActive ? '#ffffff' : '#333333',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    boxShadow: isActive ? '0 2px 8px rgba(52, 152, 219, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
  });

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ 
        width: '280px', 
        padding: '20px', 
        borderRight: '1px solid #e1e8ed', 
        overflowY: 'auto', 
        background: '#f8f9fa',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          marginTop: 0,
          marginBottom: '20px',
          fontSize: '20px',
          fontWeight: '600',
          color: '#2c3e50',
          textAlign: 'center'
        }}>Components</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <button 
            style={buttonStyle(selectedComponent === '1')}
            onClick={() => setSelectedComponent('1')}
            onMouseEnter={(e) => {
              if (selectedComponent !== '1') {
                e.target.style.background = '#f1f3f4';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedComponent !== '1') {
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            📊 Before/After Slider
          </button>
          
          <button 
            style={buttonStyle(selectedComponent === '2')}
            onClick={() => setSelectedComponent('2')}
            onMouseEnter={(e) => {
              if (selectedComponent !== '2') {
                e.target.style.background = '#f1f3f4';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedComponent !== '2') {
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            🎨 Component 2
          </button>
          
          <button 
            style={buttonStyle(selectedComponent === 'live')}
            onClick={() => setSelectedComponent('live')}
            onMouseEnter={(e) => {
              if (selectedComponent !== 'live') {
                e.target.style.background = '#f1f3f4';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedComponent !== 'live') {
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            ⚡ Live Editor
          </button>

          <button 
            style={buttonStyle(selectedComponent === 'generated')}
            onClick={() => setSelectedComponent('generated')}
            onMouseEnter={(e) => {
              if (selectedComponent !== 'generated') {
                e.target.style.background = '#f1f3f4';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedComponent !== 'generated') {
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            📄 Generated Output
          </button>
        </div>
        
        {selectedComponent === 'live' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#34495e',
              marginBottom: '12px'
            }}>Code Editor</h3>
            <div style={{ 
              border: '1px solid #d1d9e0', 
              borderRadius: '8px', 
              height: '350px', 
              overflow: 'hidden', 
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <Editor
                value={code}
                onValueChange={handleCodeChange}
                highlight={(code) => Prism.highlight(code, Prism.languages.jsx, 'jsx')}
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
          <div style={{width: '100%'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#34495e' }}>
                Paste Generated Output
              </h3>
              <button
                onClick={() => setGeneratedOutput('')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d1d9e0',
                  borderRadius: '6px',
                  background: '#ffffff',
                  color: '#34495e',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.target.style.background = '#f1f3f4'; e.target.style.borderColor = '#b1b9c0'; }}
                onMouseLeave={(e) => { e.target.style.background = '#ffffff'; e.target.style.borderColor = '#d1d9e0'; }}
              >
                Clear
              </button>
            </div>
            <textarea
              value={generatedOutput}
              onChange={(e) => setGeneratedOutput(e.target.value)}
              style={{
                width: '100%',
                height: '400px',
                fontFamily: '"Fira Code", "SF Mono", Monaco, monospace',
                fontSize: 13,
                border: '1px solid #d1d9e0',
                borderRadius: '8px',
                padding: '12px',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
          </div>
        )}
      </div>
      <div style={{ 
        flex: 1, 
        padding: '20px', 
        position: 'relative', 
        background: '#f5f5f5',
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
                flex: 1,
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                overflow: 'auto',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                minWidth: '300px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#2c3e50' }}>Details</h2>
                  <button
                    onClick={() => setIsMetadataPanelOpen(false)}
                    style={{
                      background: '#f1f3f4',
                      border: '1px solid #e1e8ed',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: 0,
                      lineHeight: '26px',
                      color: '#5c6a77',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.target.style.background = '#e1e8ed'; e.target.style.color = '#2c3e50'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#f1f3f4'; e.target.style.color = '#5c6a77'; }}
                  >
                    &times;
                  </button>
                </div>
                <h3 style={{ marginTop: 0 }}>Design Brief</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px' }}>{parsedOutput.designBrief}</pre>
                <hr style={{margin: '20px 0'}} />
                <h3>Manifest</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px' }}>{parsedOutput.manifest}</pre>
              </div>
            )}
            <div style={{
              flex: 1,
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
                    padding: '8px 16px',
                    border: '1px solid #d1d9e0',
                    borderRadius: '6px',
                    background: '#ffffff',
                    color: '#34495e',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#f1f3f4'; e.target.style.borderColor = '#b1b9c0'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#ffffff'; e.target.style.borderColor = '#d1d9e0'; }}
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
  );
};

export default App;
