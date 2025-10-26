import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  showLabels?: boolean;
  height?: number;
  borderRadius?: number;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  afterImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=2&con=1.2",
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  showLabels = true,
  height = 400,
  borderRadius = 12,
  className = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch move
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Handle image loading
  const handleImageLoad = (type: 'before' | 'after') => {
    setIsLoaded(prev => ({ ...prev, [type]: true }));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    if (e.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(100, prev + step));
    }
  };

  const containerStyles: CSSProperties = {
    position: 'relative',
    height: `${height}px`,
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  };

  const imageStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease'
  };

  const beforeImageStyles: CSSProperties = {
    ...imageStyles,
    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
    transition: isDragging ? 'none' : 'clip-path 0.1s ease-out'
  };

  const afterImageStyles: CSSProperties = {
    ...imageStyles,
    opacity: isLoaded.after ? 1 : 0
  };

  const sliderLineStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: `${sliderPosition}%`,
    width: '3px',
    height: '100%',
    backgroundColor: '#ffffff',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)',
    transition: isDragging ? 'none' : 'left 0.1s ease-out',
    zIndex: 3
  };

  const sliderHandleStyles: CSSProperties & { '&:hover'?: CSSProperties; '&:focus'?: CSSProperties } = {
    position: 'absolute',
    top: '50%',
    left: `${sliderPosition}%`,
    width: '48px',
    height: '48px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: isDragging ? 'grabbing' : 'grab',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: isDragging ? 'none' : 'left 0.1s ease-out, transform 0.2s ease',
    zIndex: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #f8f9fa',
    '&:hover': {
      transform: 'translate(-50%, -50%) scale(1.1)'
    },
    '&:focus': {
      outline: '2px solid #007bff',
      outlineOffset: '2px'
    }
  };

  const arrowStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px'
  };

  const arrowIconStyles: CSSProperties = {
    width: '6px',
    height: '6px',
    borderTop: '2px solid #6c757d',
    borderRight: '2px solid #6c757d'
  };

  const labelStyles: CSSProperties = {
    position: 'absolute',
    top: '20px',
    padding: '8px 16px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    zIndex: 2
  };

  const beforeLabelStyles: CSSProperties = {
    ...labelStyles,
    left: '20px',
    opacity: sliderPosition > 10 ? 1 : 0,
    transform: `translateY(${sliderPosition > 10 ? 0 : -10}px)`
  };

  const afterLabelStyles: CSSProperties = {
    ...labelStyles,
    right: '20px',
    opacity: sliderPosition < 90 ? 1 : 0,
    transform: `translateY(${sliderPosition < 90 ? 0 : -10}px)`
  };

  const loadingOverlayStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.5s ease',
    opacity: (isLoaded.before && isLoaded.after) ? 0 : 1,
    pointerEvents: (isLoaded.before && isLoaded.after) ? 'none' : 'all',
    zIndex: 5
  };

  const spinnerStyles: CSSProperties = {
    width: '40px',
    height: '40px',
    border: '3px solid #e9ecef',
    borderTop: '3px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div className={className}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div
        ref={containerRef}
        style={containerStyles}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Loading overlay */}
        <div style={loadingOverlayStyles}>
          <div style={spinnerStyles}></div>
        </div>

        {/* After image (background) */}
        <img
          src={afterImage}
          alt="After comparison"
          style={afterImageStyles}
          onLoad={() => handleImageLoad('after')}
          draggable={false}
        />

        {/* Before image (clipped) */}
        <img
          src={beforeImage}
          alt="Before comparison"
          style={beforeImageStyles}
          onLoad={() => handleImageLoad('before')}
          draggable={false}
        />

        {/* Labels */}
        {showLabels && (
          <>
            <div style={beforeLabelStyles}>
              {beforeLabel}
            </div>
            <div style={afterLabelStyles}>
              {afterLabel}
            </div>
          </>
        )}

        {/* Slider line */}
        <div style={sliderLineStyles} />

        {/* Slider handle */}
        <div
          style={sliderHandleStyles}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div style={arrowStyles}>
            <div
              style={{
                ...arrowIconStyles,
                transform: 'rotate(-135deg)'
              }}
            />
            <div
              style={{
                ...arrowIconStyles,
                transform: 'rotate(45deg)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
