import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SELECT_STYLES } from '../../constants/tableConstants';

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

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

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
