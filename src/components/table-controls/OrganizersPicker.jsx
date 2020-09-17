import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { selectStyles } from '../../constants/tableConstants';

const OrganizersPicker = ({ value = {}, onChange, api }) => {
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

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        organizers,
        ...value,
        ...changedValue,
      });
    }
  };

  const handleOnChange = (selectedOrgs) => {
    const newOrgs = selectedOrgs ? selectedOrgs.map((item) => item.value) : [];
    triggerChange({
      organizers: newOrgs,
    });
  };

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={organizers}
      styles={selectStyles}
      className="multi-select"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={100}
      onChange={handleOnChange}
      placeholder="Select organizer"
    />
  );
};

export default OrganizersPicker;
