import { SET_TABLE_VIEW, SET_CALENDAR_VIEW, SET_LIST_VIEW } from '../reducers/reducer';

const setTableView = () => ({ type: SET_TABLE_VIEW });
const setListView = () => ({ type: SET_LIST_VIEW });
const setCalendarView = () => ({ type: SET_CALENDAR_VIEW });

export default {
  setTableView,
  setListView,
  setCalendarView,
};
