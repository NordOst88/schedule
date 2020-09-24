const TABLE = 'Table';
const LIST = 'List';
const CALENDAR = 'Calendar';
const STUDENT = 'Student';
const MENTOR = 'Mentor';

const VIEW_MODES = [TABLE, LIST, CALENDAR];
const USER_ROLES = [STUDENT, MENTOR];

const RADIO_ITEMS = {
  left: 'Left',
  right: 'Right',
  alternate: 'Alternate',
};

const LIST_TEXT = {
  moreDetails: 'Подробнее',
  deadline: 'Deadline:',
};

const HEADER_TEXT = {
  title: 'Schedule',
  linkUrl: 'https://rs.school/',
  imageAlt: 'Rolling Scopes School Logo',
};

const CONTROLS_TEXT = {
  printBtn: 'Print',
  textAdjust: 'Change text size',
  colorSettings: 'Color settings',
};

const MODAL_INFO_TEXT = {
  estimatedWeek: 'Неделя обучения : ',
  taskName: 'Тема : ',
  taskType: 'Тип задания : ',
  taskStart: 'Дата выдачи : ',
  taskDeadline: 'Дата сдачи : ',
  estimatedStudyTime: 'Время на прохождение : ',
  taskPlace: 'Место проведения : ',
  taskDescription: 'Описание : ',
  taskLinks: 'Материалы : ',
  taskOrganizer: 'Организатор : ',
  taskComment: 'Комментарий : ',
  noInfo: 'N/A',
};

const MODAL_ADD_EVENT_TEXT = {
  week: 'Week',
  date: 'Date',
  deadline: 'Deadline',
  taskType: 'Task type',
  place: 'Place',
  estimatedTime: 'Estimated Time',
  taskName: 'Task Name',
  taskURL: 'Task URL',
  description: 'Description',
  organizers: 'Organizers',
  comment: 'Comment',
  links: 'Links',
  addEvent: 'Add event',
  editEvent: 'Edit event',
};

const COLOR_PRESET = {
  'JS task': '#42d205',
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
  inactive: '#808080',
  default: '#000000',
};

const MODAL_SPINNER_TIP = 'Please, wait. We are preparing files for you ...';
const VIEW_SPINNER_TIP = 'Please, wait. We are preparing view for you ...';

const SAVE_OPTIONS = ['PDF', 'JPG'];
const BTN_SAVE_TEXT = 'Save as';

const ALL_TASKS = 'All task types';
const DEFAULT_FONT_SIZE = 10;
const ADJUST_FONT_SIZE = 13;

const TABLE_EDITABLE = true;

const HIDDEN_ITEMS_TEXT = 'Hidden Items: ';
const SELECTED_ITEMS_TEXT = 'Selected Items: ';

export {
  TABLE,
  LIST,
  CALENDAR,
  STUDENT,
  MENTOR,
  VIEW_MODES,
  USER_ROLES,
  COLOR_PRESET,
  LIST_TEXT,
  MODAL_INFO_TEXT,
  HEADER_TEXT,
  CONTROLS_TEXT,
  MODAL_SPINNER_TIP,
  SAVE_OPTIONS,
  BTN_SAVE_TEXT,
  ALL_TASKS,
  MODAL_ADD_EVENT_TEXT,
  TABLE_EDITABLE,
  DEFAULT_FONT_SIZE,
  ADJUST_FONT_SIZE,
  RADIO_ITEMS,
  VIEW_SPINNER_TIP,
  HIDDEN_ITEMS_TEXT,
  SELECTED_ITEMS_TEXT,
};
