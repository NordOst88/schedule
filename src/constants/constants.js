const TABLE = 'Table';
const LIST = 'List';
const CALENDAR = 'Calendar';
const STUDENT = 'Student';
const MENTOR = 'Mentor';

const VIEW_MODES = [TABLE, LIST, CALENDAR];
const USER_ROLES = [STUDENT, MENTOR];

const SET_VIEW_MODE = 'SET_VIEW_MODE';
const SET_USER = 'SET_USER';

// colors
const COLOR_PRESET = {
  'js task': '#bae637',
  'HTML task': '#ffffb8',
  'self-study': '#b5f5ec',
  markdown: '#fff2e8',
  lecture: '#efdbff',
  materials: '#ffd6e7',
  test: '#237804',
  deadline: '#ff7875',
  'cross-check': '#fa541c',
  codewars: '#13c2c2',
  interview: '#fff566',
};

export {
  TABLE,
  LIST,
  CALENDAR,
  STUDENT,
  MENTOR,
  SET_VIEW_MODE,
  VIEW_MODES,
  USER_ROLES,
  SET_USER,
  COLOR_PRESET,
};
