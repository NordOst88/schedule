import { SET_VIEW_MODE, SET_USER } from '../constants/constants';

const onViewModeChange = (mode) => ({ type: SET_VIEW_MODE, mode });
const onSetUser = (user) => ({ type: SET_USER, user });

export { onViewModeChange, onSetUser };
