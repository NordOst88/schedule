import {
  SET_VIEW_MODE,
  SET_USER,
  SET_EVENTS,
  SET_LIST_VIEW,
  SET_TIMEZONE,
  SET_TASK,
  SET_COLOR,
  SET_TABLE_EDIT_MODE,
  SET_FONT_SIZE,
} from '../actions/actions-types';

import { ALL_TASKS } from '../constants/constants';
import setLocaLStorageSettings from '../utils/setLocalStorageSettings';
import getInitialState from '../utils/getInitialState';
import getSelectedEvents from '../utils/getSelectedEvents';
import getTasksTypes from '../utils/getTasksTypes';

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_VIEW_MODE:
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, currentView: action.mode };
    case SET_TIMEZONE:
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, currentTimezone: action.timezone };
    case SET_USER:
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, role: action.user };
    case SET_EVENTS: {
      const { events } = action;
      return {
        ...state,
        events,
        selectedEvents: getSelectedEvents(events, state.selectedTask),
        tasksTypes: [ALL_TASKS, ...getTasksTypes(events)],
      };
    }
    case SET_LIST_VIEW:
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, listView: action.listView };
    case SET_TASK: {
      const { selectedTask } = action;
      setLocaLStorageSettings(Object.entries(action));
      return {
        ...state,
        selectedTask,
        selectedEvents: getSelectedEvents(state.events, selectedTask),
      };
    }
    case SET_COLOR: {
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, eventColors: action.colorPreset };
    }
    case SET_TABLE_EDIT_MODE:
      return { ...state, tableEditMode: action.tableEditMode };
    case SET_FONT_SIZE:
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, fontSize: action.fontSize };
    default:
      return state;
  }
};

export default reducer;
