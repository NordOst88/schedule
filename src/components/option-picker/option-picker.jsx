import React from 'react';
import { Select } from 'antd';

import './option-picker.scss';

const OptionPicker = ({ options = [], defaultValue, onChange }) => {
  const { Option } = Select;

  return (
    <Select
      onChange={onChange}
      showSearch="true"
      defaultValue={defaultValue}
      className="option-picker"
    >
      {options.length
        ? options.map((option) => (
            <Option value={option} key={option}>
              {option}
            </Option>
          ))
        : null}
    </Select>
  );
};

export default OptionPicker;
