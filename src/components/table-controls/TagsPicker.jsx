import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { selectStyles } from '../../constants/tableConstants';

const TagsPicker = ({ eventColors, value = {}, onChange }) => {
  const [tags, setTags] = useState([]);
  const taskTypes = Object.entries(eventColors);
  const taskOptions = taskTypes.map((item) => ({ value: item[0], label: item[0], color: item[1] }));
  const customStyles = {
    option: (styles, { data }) => ({
      ...styles,
      color: data.color,
      fontWeight: 500,
    }),
    multiValue: (styles, { data }) => {
      const { color } = data;
      return {
        ...styles,
        backgroundColor: data.color ? color : '#00b8d9',
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
    <CreatableSelect
      closeMenuOnSelect={false}
      isMulti
      options={taskOptions}
      styles={{ ...selectStyles, ...customStyles }}
      className="multi-select"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={100}
      onChange={handleOnChange}
      placeholder="Select and/or create new task type"
    />
  );
};

const mapStateToProps = ({ eventColors }) => ({
  eventColors,
});

export default connect(mapStateToProps)(TagsPicker);
