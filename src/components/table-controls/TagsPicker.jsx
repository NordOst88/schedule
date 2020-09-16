import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const TagsPicker = ({ eventColors, value = {}, onChange }) => {
  const [tags, setTags] = useState([]);
  const taskTypes = Object.entries(eventColors);
  const taskOptions = taskTypes.map((item) => ({ value: item[0], label: item[0], color: item[1] }));
  const colorStyles = {
    option: (styles, { data }) => ({
      ...styles,
      color: data.color,
      fontWeight: 500,
    }),
    control: (styles) => ({
      ...styles,
      borderRadius: '2px',
    }),
    multiValue: (styles, { data }) => {
      const { color } = data;
      return {
        ...styles,
        backgroundColor: color,
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: 'white',
      backgroundColor: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
        cursor: 'pointer',
      },
    }),
  };

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        tags,
        ...value,
        ...changedValue,
      });
    }
  };

  const handleOnChange = (selectedTags) => {
    const newTags = selectedTags ? selectedTags.map((item) => item.value) : [];
    setTags(newTags);
    triggerChange({
      tags: newTags,
    });
  };

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={taskOptions}
      styles={colorStyles}
      className="multi-select"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={100}
      onChange={handleOnChange}
    />
  );
};

const mapStateToProps = ({ eventColors }) => ({
  eventColors,
});

export default connect(mapStateToProps)(TagsPicker);
