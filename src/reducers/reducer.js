import { SET_VIEW_MODE, SET_USER, SET_EVENTS } from '../actions/actions-types';
import setLocaLStorageSettings from '../utils/setLocalStorageSettings';
import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  console.log('reducer', state, action);
  switch (action.type) {
    case SET_VIEW_MODE:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, currentView: action.mode };
    case SET_USER:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, role: action.user };
    case SET_EVENTS:
      return { ...state, events: action.events };
    default:
      return state;
  }
};

export default reducer;
