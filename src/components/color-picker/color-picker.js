import React, { useState, useEffect } from 'react';
import { ChromePicker, HuePicker } from 'react-color';

import { LARGE_MOBILE_WIDTH, HUE_PICKER_WIDTH } from '../../constants/colorPickerConstants';

const ColorPicker = ({ defaultColor, setFormattedColor, eventTarget }) => {
  const [color, setColor] = useState(defaultColor);
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  const updateColor = ({ hex }) => {
    setColor(hex);
    eventTarget.style.backgroundColor = hex;
  };

  const isMobile = window.innerWidth <= LARGE_MOBILE_WIDTH;

  return (
    <>
      {isMobile ? (
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <HuePicker
            width={HUE_PICKER_WIDTH}
            onChange={updateColor}
            onChangeComplete={(updatedColor) => {
              setFormattedColor(updatedColor.hex);
            }}
          />
        </div>
      ) : (
        <div style={{ position: 'absolute', cursor: 'pointer' }}>
          <ChromePicker
            color={color}
            disableAlpha
            onChange={updateColor}
            onChangeComplete={(updatedColor) => {
              setFormattedColor(updatedColor.hex);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ColorPicker;
