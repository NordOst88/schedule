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
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
    width: '300px',
    boxShadow: state.isFocused ? null : null,
  }),
};

const SelectContainer = () => (
  <Select
    closeMenuOnSelect={false}
    // defaultValue={[colourOptions[0], colourOptions[1]]}
    isMulti
    options={options}
    styles={customStyles}
  />
);
export default SelectContainer;
