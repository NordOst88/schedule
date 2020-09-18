import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import defaultColor from '../../constants/colorPickerConstants';

const ColorPicker = () => {
  const [color, setColor] = useState(defaultColor);

  return (
    <div className="color__container" style={{ position: 'absolute' }}>
      <ChromePicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
    </div>
  );
};

export default ColorPicker;
