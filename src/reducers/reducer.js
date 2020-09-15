import {
  SET_VIEW_MODE,
  SET_USER,
  SET_EVENTS,
  SET_LIST_VIEW,
  SET_TIMEZONE,
} from '../actions/actions-types';
import setLocaLStorageSettings from '../utils/setLocalStorageSettings';
import getInitialState from '../utils/getInitialState';

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
    case SET_EVENTS:
      return { ...state, events: action.events };
    case SET_LIST_VIEW:
      setLocaLStorageSettings(Object.entries(action));
      return { ...state, listView: action.listView };
    default:
      return state;
  }
};

export default reducer;
