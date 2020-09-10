import { SET_VIEW_MODE, SET_USER, CURRENT_DATA } from '../constants/constants';

const onViewModeChange = (mode) => ({ type: SET_VIEW_MODE, mode });
const onSetUser = (user) => ({ type: SET_USER, user });

// calendar
const onEventClick = (currentData) => ({ type: CURRENT_DATA, currentData });

export { onViewModeChange, onSetUser, onEventClick };
