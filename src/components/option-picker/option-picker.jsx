import React from 'react';
import { Select } from 'antd';

const OptionPicker = ({ options = [], defaultValue, onChange }) => {
  const { Option } = Select;

  return (
    <Select
      onChange={onChange}
      showSearch="true"
      defaultValue={defaultValue}
      style={{
        width: 120,
        fontSize: '2rem',
      }}
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
