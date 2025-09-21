import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const ResizableSlider = ({ children, containerState, onContainerChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleKnobClick = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const knobSize = 24;
  const borderWidth = isEditing ? 2 : 1;

  const styles = {
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
      height: '100%',
      opacity: isEditing ? 0.8 : 1,
      transition: 'opacity 0.3s ease',
    }
  };

  return (
    <Rnd
      size={{ width: containerState.width, height: containerState.height }}
      position={{ x: containerState.x, y: containerState.y }}
      onDrag={(e, d) => {
        onContainerChange(prev => ({ ...prev, x: d.x, y: d.y }));
      }}
      onResize={(e, direction, ref, delta, position) => {
        onContainerChange(prev => ({
          ...prev,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
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
      <div style={styles.sliderContainer}>
        {children}
      </div>
    </Rnd>
  );
};

export default ResizableSlider;
