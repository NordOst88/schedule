const TABLE = 'Table';
const LIST = 'List';
const CALENDAR = 'Calendar';
const STUDENT = 'Student';
const MENTOR = 'Mentor';

const VIEW_MODES = [TABLE, LIST, CALENDAR];
const USER_ROLES = [STUDENT, MENTOR];

const SET_VIEW_MODE = 'SET_VIEW_MODE';
const SET_USER = 'SET_USER';

// calendar
const CURRENT_DATA = 'CURRENT_DATA';

// colors
const COLOR_PRESET = {
  'js task': '#42d205',
  'HTML task': '#fadb14',
  'CSS task': '#0084ff',
  'self-study': '#08979c',
  markdown: '#d48806',
  lecture: '#bca900',
  materials: '#ff85c0',
  test: '#206b40',
  deadline: '#ff000d',
  'cross-check': '#1e2264',
  codewars: '#531dab',
  interview: '#715ad8',
  conference: '#b32cb2',
  'meet-up': '#2dc0c4',
  optional: '#b10162',
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
  CURRENT_DATA,
};
