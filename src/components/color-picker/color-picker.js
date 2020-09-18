import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ defaultColor, setFormattedColor, eventTarget }) => {
  const [color, setColor] = useState(defaultColor);
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  return (
    <div className="color__container" style={{ position: 'absolute' }}>
      <ChromePicker
        color={color}
        disableAlpha
        onChange={(updatedColor) => {
          setColor(updatedColor.hex);
          eventTarget.style.backgroundColor = updatedColor.hex;
        }}
        onChangeComplete={(updatedColor) => {
          setFormattedColor(updatedColor.hex);
        }}
      />
    </div>
  );
};

export default ColorPicker;
