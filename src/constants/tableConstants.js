const tagsName = 'table-tags';

const columnsList = [
  'date',
  'time',
  'deadline',
  'type',
  'place',
  'estimatedTime',
  'name',
  'description',
  'links',
  'organizer',
  'comment',
];

const selectStyles = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: '2px',
    borderColor: state.isFocused ? '#40a9ff' : '#d9d9d9',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(24, 144, 255, 0.2)' : 0,
    minHeight: 30,
    '&:hover': {
      borderColor: '#40a9ff',
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: 4,
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: 4,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0px 6px',
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
  }),
};

export { columnsList, tagsName, selectStyles };
