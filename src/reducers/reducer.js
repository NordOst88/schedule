const SET_TABLE_VIEW = 'SET_TABLE_VIEW';
const SET_CALENDAR_VIEW = 'SET_CALENDAR_VIEW';
const SET_LIST_VIEW = 'SET_LIST_VIEW';

const initialState = {
  currentMode: 'table',
  role: 'student',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_VIEW:
      return { currentMode: 'table' };
    case SET_CALENDAR_VIEW:
      return { currentMode: 'calendar' };
    case SET_LIST_VIEW:
      return { currentMode: 'list' };
    default:
      return state;
  }
};

export default reducer;

export { SET_TABLE_VIEW, SET_CALENDAR_VIEW, SET_LIST_VIEW };
