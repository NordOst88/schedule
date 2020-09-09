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
const COLOR_PRESET = [
  { type: 'js task', color: '#d9f7be' },
  { type: 'HTML task', color: '#ffffb8' },
  { type: 'self-study', color: '#b5f5ec' },
  { type: 'markdown', color: '#fff2e8' },
  { type: 'lecture', color: '#efdbff' },
  { type: 'materials', color: '#ffd6e7' },
  { type: 'test', color: '#237804' },
  { type: 'deadline', color: '#ff7875' },
  { type: 'cross-check', color: '#fa541c' },
  { type: 'codewars', color: '#13c2c2' },
  { type: 'interview', color: '#fff566' },
];
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
