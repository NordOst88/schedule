import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SELECT_STYLES } from '../../constants/tableConstants';

/**
 * Send changed value to parent component.
 * @callback onChangeCallback
 * @param {Array} changedValue - Changed list of selected organizers.
 */

/**
 * Component for selecting and showing organizers from list of them, which gets from backend.
 * @component
 * @param {Object} wrapper - Arguments wrapper.
 * @param {Array} wrapper.value - List of selected organizers.
 * @param {onChangeCallback} wrapper.onChange - Callback that send changed value to parent component.
 */
const OrganizersPicker = ({ value, onChange, api }) => {
  const formattedValue = value && value.map((item) => ({ value: item.id, label: item.name }));
  const [organizers, setOrganizers] = useState([]);
  useEffect(() => {
    const getOrganizers = async () => {
      const result = await api.getAllOrganizers();
      const organizersOptions = await result.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOrganizers(organizersOptions);
    };
    getOrganizers();
  }, []);

  const customStyles = {
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': {
        cursor: 'pointer',
      },
    }),
  };

  /**
   * Trigger that checks onChange exists and if so then calls onChange with changed value as argument.
   * @param {Array} changedValue - Changed list of selected organizers.
   */
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  /**
   * Handler that formatting array of organizers and then calls triggerChange with formatted array as argument.
   * @param {Array} selectedOrgs - List of selected organizers.
   */
  const handleOnChange = (selectedOrgs) => {
    const newOrgs = selectedOrgs
      ? selectedOrgs.map((item) => ({ name: item.label, id: item.value }))
      : [];
    triggerChange(newOrgs);
  };

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={organizers}
      styles={{ ...SELECT_STYLES, ...customStyles }}
      className="multi-select"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={100}
      onChange={handleOnChange}
      placeholder="Select organizer"
      value={formattedValue}
    />
  );
};

export default OrganizersPicker;
