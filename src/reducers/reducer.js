import { SET_VIEW_MODE, SET_USER, SET_EVENTS } from '../actions/actions-types';
import setLocaLStorageSettings from '../utils/setLocalStorageSettings';
import getInitialState from '../utils/getInitialState';

const reducer = (state = getInitialState(), action) => {
  console.log('reducer', state, action);
  switch (action.type) {
    case SET_VIEW_MODE:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, currentView: action.payload };
    case SET_USER:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, role: action.payload };
    case SET_EVENTS:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export default reducer;
