import React from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { SELECT_STYLES } from '../../constants/tableConstants';
import { COLOR_PRESET } from '../../constants/constants';

const { inactive } = COLOR_PRESET;

/**
 * Send changed value to parent component.
 * @callback onChangeCallback
 * @param {Array} changedValue - Changed list of selected tags.
 */

/**
 * Component for selecting and showing tags with task names from list of them.
 * @component
 * @param {Object} wrapper - Arguments wrapper.
 * @param {Object} wrapper.eventColors - List of task types and colors of them.
 * @param {Array} wrapper.value - List of selected tags.
 * @param {onChangeCallback} wrapper.onChange - Callback that send changed value to parent component.
 */
const TagsPicker = ({ eventColors, value, onChange }) => {
  const taskTypes = Object.entries(eventColors);
  const taskOptions = taskTypes.map((item) => ({ value: item[0], label: item[0], color: item[1] }));
  const formattedValue =
    value && value.map((item) => ({ value: item, label: item, color: eventColors[item] }));

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
        backgroundColor: color || inactive,
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

  /**
   * Trigger that checks onChange exists and if so then calls onChange with changed value as argument.
   * @param {Array} changedValue - Changed list of selected tags.
   */
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  /**
   * Handler that formatting array of tags and then calls triggerChange with formatted array as argument.
   * @param {Array} selectedTags - List of selected tags.
   */
  const handleOnChange = (selectedTags) => {
    const newTags = selectedTags ? selectedTags.map((item) => item.value) : [];
    triggerChange(newTags);
  };

  return (
    <CreatableSelect
      closeMenuOnSelect={false}
      isMulti
      options={taskOptions}
      styles={{ ...SELECT_STYLES, ...customStyles }}
      className="multi-select"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={100}
      onChange={handleOnChange}
      placeholder="Select and/or create new task type"
      value={formattedValue}
    />
  );
};

const mapStateToProps = ({ eventColors }) => ({
  eventColors,
});

export default connect(mapStateToProps)(TagsPicker);
