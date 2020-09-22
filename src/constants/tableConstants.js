const TAGS_NAME = 'table-tags';

const COLUMNS_LIST = [
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

const SELECT_STYLES = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderRadius: '2px',
    borderColor: isFocused ? '#40a9ff' : '#d9d9d9',
    boxShadow: isFocused ? '0 0 0 2px rgba(24, 144, 255, 0.2)' : 0,
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

const SUCCESS_FETCH_MSG = {
  type: 'success',
  message: 'Success',
  duration: 3,
};

const ERROR_FETCH_MSG = {
  type: 'error',
  duration: null,
};

const SUCCESS_ADD_EVENT = { description: 'Event added successfully' };

export {
  COLUMNS_LIST,
  TAGS_NAME,
  SELECT_STYLES,
  SUCCESS_FETCH_MSG,
  SUCCESS_ADD_EVENT,
  ERROR_FETCH_MSG,
};
