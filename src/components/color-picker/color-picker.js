import React, { useState, useEffect } from 'react';
import { HuePicker } from 'react-color';

import { HUE_PICKER_WIDTH } from '../../constants/colorPickerConstants';

/**
 * Component creates Hue color picker and setChosen color to the state
 *
 * @component
 * @example
 * const defaultColor = '#00000';
 * const eventTarget = e.target;
 * const setFormattedColor = () => console.log('sets state');
 *
 * return (
 *  <ColorPicker {...{ defaultColor, setFormattedColor, eventTarget }} />
 * )
 */

const ColorPicker = ({ defaultColor, setFormattedColor, eventTarget }) => {
  const [color, setColor] = useState(defaultColor);
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  /**
   * Function sets color state using hex format
   * changes background of the target element using hex format
   *
   * @param {Object} colorObject color object with hex
   */
  const updateColor = ({ hex }) => {
    setColor(hex);
    eventTarget.style.backgroundColor = hex;
  };

  return (
    <div style={{ position: 'absolute', cursor: 'pointer', width: '80%' }}>
      <HuePicker
        color={color}
        width={HUE_PICKER_WIDTH}
        onChange={updateColor}
        onChangeComplete={(updatedColor) => {
          setFormattedColor(updatedColor.hex);
        }}
      />
    </div>
  );
};

export default ColorPicker;
