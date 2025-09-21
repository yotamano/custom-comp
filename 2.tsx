import React, { useState, useEffect, useRef } from 'react';

const ParallaxPhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const carouselRef = useRef(null);

  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=entropy',
      title: 'Mountain Vista',
      description: 'Majestic peaks reaching towards endless skies'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop&crop=entropy',
      title: 'Forest Canopy',
      description: 'Ancient trees dancing in golden light'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&crop=entropy',
      title: 'Ocean Dreams',
      description: 'Waves embracing pristine shores'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&crop=entropy',
      title: 'Desert Horizon',
      description: 'Endless dunes beneath starlit skies'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=entropy',
      title: 'Arctic Wonder',
      description: 'Crystalline formations in polar silence'
    }
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const handleMouseMove = (e) => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const getSlideStyle = (index, relativeIndex) => {
    const distance = Math.abs(relativeIndex);
    const direction = relativeIndex > 0 ? 1 : -1;
    
    const baseTransform = `translateX(${relativeIndex * 100}%)`;
    const scaleValue = 1 - distance * 0.1;
    const rotateValue = relativeIndex * 2;
    const zIndex = 10 - distance;
    const opacity = distance <= 2 ? 1 - (distance * 0.3) : 0;
    
    const parallaxX = (mousePosition.x - 0.5) * (30 - distance * 10) * direction;
    const parallaxY = (mousePosition.y - 0.5) * (20 - distance * 5);
    
    return {
      transform: `${baseTransform} translateY(${parallaxY}px) translateZ(${-distance * 100}px) scale(${scaleValue}) rotateY(${rotateValue}deg) translateX(${parallaxX}px)`,
      opacity,
      zIndex,
      filter: distance > 0 ? `blur(${Math.min(distance * 2, 8)}px) brightness(${1 - distance * 0.2})` : 'none'
    };
  };

  return (
    <div
      ref={carouselRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0f0f0f 100%)',
        cursor: 'grab',
        perspective: '1000px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Background Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(255, 255, 255, 0.03) 0%, 
            transparent 50%),
          radial-gradient(circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, 
            rgba(100, 150, 255, 0.02) 0%, 
            transparent 40%)
        `,
        transition: 'background 0.3s ease',
        pointerEvents: 'none'
      }} />

      {/* Carousel Container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '800px',
        height: '500px',
        maxWidth: '90vw',
        maxHeight: '70vh',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d'
      }}>
        {photos.map((photo, index) => {
          const relativeIndex = index - currentIndex;
          const normalizedIndex = relativeIndex > photos.length / 2 
            ? relativeIndex - photos.length 
            : relativeIndex < -photos.length / 2 
            ? relativeIndex + photos.length 
            : relativeIndex;
          
          if (Math.abs(normalizedIndex) > 2) return null;

          return (
            <div
              key={photo.id}
              onClick={() => goToSlide(index)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: normalizedIndex === 0 ? 'default' : 'pointer',
                transition: isTransitioning 
                  ? 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                  : 'transform 0.3s ease, filter 0.3s ease',
                boxShadow: `
                  0 ${20 + Math.abs(normalizedIndex) * 10}px ${40 + Math.abs(normalizedIndex) * 20}px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(255, 255, 255, ${normalizedIndex === 0 ? 0.1 : 0.05}),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                ...getSlideStyle(index, normalizedIndex)
              }}
            >
              {/* Image */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${photo.url})`,
                backgroundSize: 'cover',
                backgroundPosition: `${50 + (mousePosition.x - 0.5) * 10}% ${50 + (mousePosition.y - 0.5) * 10}%`,
                transition: 'background-position 0.3s ease',
                transform: `scale(${1 + Math.abs(normalizedIndex) * 0.05})`
              }} />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                  linear-gradient(
                    135deg, 
                    rgba(0, 0, 0, 0.1) 0%, 
                    rgba(0, 0, 0, 0.3) 70%, 
                    rgba(0, 0, 0, 0.6) 100%
                  )
                `,
                opacity: normalizedIndex === 0 ? 1 : 0.7
              }} />

              {/* Content */}
              {normalizedIndex === 0 && (
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '40px',
                  right: '40px',
                  color: 'white',
                  transform: `translateY(${(mousePosition.y - 0.5) * -10}px)`,
                  transition: 'transform 0.3s ease'
                }}>
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: '300',
                    margin: '0 0 12px 0',
                    letterSpacing: '1px',
                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeInUp 0.8s ease forwards'
                  }}>
                    {photo.title}
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    margin: 0,
                    opacity: 0.9,
                    letterSpacing: '0.5px',
                    textShadow: '0 1px 10px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeInUp 0.8s 0.2s ease forwards',
                    animationFillMode: 'both'
                  }}>
                    {photo.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        aria-label="Previous image"
        style={{
          position: 'absolute',
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60px',
          height: '60px',
          border: 'none',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          fontSize: '24px',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          opacity: isTransitioning ? 0.5 : 1,
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        aria-label="Next image"
        style={{
          position: 'absolute',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60px',
          height: '60px',
          border: 'none',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          fontSize: '24px',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          opacity: isTransitioning ? 0.5 : 1,
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 100
      }}>
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            aria-label={`Go to image ${index + 1}`}
            style={{
              width: currentIndex === index ? '40px' : '12px',
              height: '12px',
              border: 'none',
              borderRadius: '6px',
              background: currentIndex === index 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(255, 255, 255, 0.3)',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              opacity: isTransitioning ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (currentIndex !== index) {
                e.target.style.background = 'rgba(255, 255, 255, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== index) {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              }
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ParallaxPhotoCarousel;
