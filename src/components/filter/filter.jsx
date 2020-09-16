import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'JS task', label: 'JS task' },
  { value: 'HTML task', label: 'HTML task' },
  { value: 'CSS task', label: 'CSS task' },
  { value: 'self-study', label: 'self-study' },
  { value: 'markdown', label: 'markdown' },
  { value: 'lecture', label: 'lecture' },
  { value: 'materials', label: 'materials' },
  { value: 'test', label: 'test' },
  { value: 'deadline', label: 'deadline' },
  { value: 'cross-check', label: 'cross-check' },
  { value: 'codewars', label: 'codewars' },
  { value: 'interview', label: 'interview' },
  { value: 'conference', label: 'conference' },
  { value: 'meet-up', label: 'meet-up' },
  { value: 'optional', label: 'optional' },
];

const customStyles = {
  option: (provided) => ({
    ...provided,
    lineHeight: '10px',
  }),
  container: (provided) => ({
    ...provided,
    lineHeight: '15px',
  }),

  /*   control: (provided) => ({
    ...provided,
    width: 300,
    height: 35,
    minHeight: 35,
  }),
  valueContainer: (provided) => ({
    ...provided,
    width: '100%',
    height: '100%',
  }),

  placeholder: (provided) => ({
    ...provided,
    lineHeight: 10,
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
    lineHeight: 26,
  }), */
};

const SelectContainer = () => (
  <div style={{ width: 300, maxHeight: 40, height: 35 }}>
    <Select
      closeMenuOnSelect={false}
      // defaultValue={[colourOptions[0], colourOptions[1]]}
      isMulti
      options={options}
      styles={customStyles}
      className="multi-select"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={100}
    />
  </div>
);
export default SelectContainer;
