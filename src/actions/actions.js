import {
  SET_VIEW_MODE,
  SET_USER,
  SET_EVENTS,
  SET_LIST_VIEW,
  SET_TIMEZONE,
  SET_TASK,
} from './actions-types';

const onTimezoneChange = (timezone) => ({ type: SET_TIMEZONE, timezone });
const onViewModeChange = (mode) => ({ type: SET_VIEW_MODE, mode });
const onSetUser = (user) => ({ type: SET_USER, user });
const onSetEvents = (events) => ({ type: SET_EVENTS, events });
const onSetListView = ({ target: { value } }) => ({ type: SET_LIST_VIEW, listView: value });
const onTaskChange = (task) => ({ type: SET_TASK, selectedTask: task });

export { onViewModeChange, onSetUser, onSetEvents, onSetListView, onTimezoneChange, onTaskChange };
