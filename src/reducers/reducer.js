import { SET_VIEW_MODE, SET_USER, SET_EVENTS, SET_LIST_VIEW } from '../actions/actions-types';
import setLocaLStorageSettings from '../utils/setLocalStorageSettings';
import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  console.log('reducer', state, 'action', action);
  switch (action.type) {
    case SET_VIEW_MODE:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, currentView: action.mode };
    case SET_USER:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, role: action.user };
    case SET_EVENTS:
      return { ...state, events: action.events };
    case SET_LIST_VIEW:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, listView: action.listView };
    default:
      return state;
  }
};

export default reducer;
