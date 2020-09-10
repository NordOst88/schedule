import { TABLE, STUDENT, SET_VIEW_MODE, SET_USER, CURRENT_DATA } from '../constants/constants';
import setLocaLStorageSettings from '../utils/setLocalStorageSettings';
import data from '../services/dummy-data';

let view;
let role;

if (localStorage.settings) {
  const storage = JSON.parse(localStorage.settings);
  view = storage.mode;
  role = storage.user;
}
const initialState = {
  currentView: view || TABLE,
  role: role || STUDENT,
  // calendar
  currentData: {},
  data,
};

const reducer = (state = initialState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case SET_VIEW_MODE:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, currentView: action.mode };
    case SET_USER:
      setLocaLStorageSettings(Object.entries(action)[1]);
      return { ...state, role: action.user };
    // calendar
    case CURRENT_DATA:
      return { ...state, currentData: action.currentData };
    default:
      return state;
  }
};

export default reducer;
