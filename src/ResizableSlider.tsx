import React, { useState, CSSProperties, ReactNode, useRef, useEffect } from 'react';
import { Rnd, DraggableData, ResizableDelta, Position } from 'react-rnd';

export interface ContainerState {
  x: number;
  y: number;
  width: number;
  height: number | 'auto';
}

interface ResizableSliderProps {
  children: ReactNode;
  containerState: ContainerState;
  onContainerChange: React.Dispatch<React.SetStateAction<ContainerState>>;
}

const ResizableSlider: React.FC<ResizableSliderProps> = ({ children, containerState, onContainerChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number>(400);

  // Measure content height when height is 'auto'
  useEffect(() => {
    if (containerState.height === 'auto' && contentRef.current) {
      const measureHeight = () => {
        if (contentRef.current) {
          const height = contentRef.current.scrollHeight;
          setMeasuredHeight(height);
        }
      };
      
      measureHeight();
      
      // Re-measure on content changes
      const resizeObserver = new ResizeObserver(measureHeight);
      resizeObserver.observe(contentRef.current);
      
      return () => resizeObserver.disconnect();
    } else if (typeof containerState.height === 'number') {
      setMeasuredHeight(containerState.height);
    }
  }, [containerState.height, children]);

  const handleKnobClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const knobSize = 24;
  const borderWidth = isEditing ? 2 : 1;
  
  // Use measured height for Rnd when height is 'auto', otherwise use the numeric value
  const rndHeight = containerState.height === 'auto' ? measuredHeight : containerState.height;

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `${borderWidth}px solid ${isEditing ? '#3498db' : '#ddd'}`,
      background: '#f9f9f9',
      position: 'relative',
      transition: 'border-color 0.3s ease',
    },
    knob: {
      position: 'absolute',
      top: `-${knobSize / 2 + borderWidth}px`,
      left: `-${knobSize / 2 + borderWidth}px`,
      width: `${knobSize}px`,
      height: `${knobSize}px`,
      borderRadius: '50%',
      background: isEditing ? '#3498db' : '#fff',
      border: `2px solid ${isEditing ? '#2980b9' : '#ccc'}`,
      cursor: 'pointer',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    knobIcon: {
      width: '50%',
      height: '50%',
      background: isEditing ? '#fff' : '#ccc',
      borderRadius: '50%',
      transition: 'background-color 0.3s ease',
    },
    sliderContainer: {
      width: '100%',
      height: containerState.height === 'auto' ? 'auto' : '100%',
      opacity: isEditing ? 0.8 : 1,
      transition: 'opacity 0.3s ease',
    }
  };

  return (
    <Rnd
      size={{ width: containerState.width, height: rndHeight }}
      position={{ x: containerState.x, y: containerState.y }}
      onDrag={(_e, d: DraggableData) => {
        onContainerChange(prev => ({ ...prev, x: d.x, y: d.y }));
      }}
      onResize={(_e, _direction, ref: HTMLElement, _delta: ResizableDelta, position: Position) => {
        // When user resizes, convert 'auto' to actual pixel value
        onContainerChange(prev => ({
          ...prev,
          width: ref.offsetWidth,
          height: ref.offsetHeight, // Convert 'auto' to number when resized
          x: position.x,
          y: position.y
        }));
      }}
      minWidth={36}
      minHeight={36}
      bounds="parent"
      style={styles.container}
      disableDragging={!isEditing}
      enableResizing={isEditing ? undefined : {
        top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
      }}
      dragHandleClassName="drag-handle"
    >
      <div className="drag-handle" style={{...styles.knob, cursor: isEditing ? 'move' : 'pointer'}} onClick={handleKnobClick}>
        <div style={styles.knobIcon} />
      </div>
      <div ref={contentRef} style={styles.sliderContainer}>
        {children}
      </div>
    </Rnd>
  );
};

export default ResizableSlider;
