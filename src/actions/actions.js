import { SET_VIEW_MODE, SET_USER, SET_EVENTS } from './actions-types';

const onViewModeChange = (mode) => ({ type: SET_VIEW_MODE, mode });
const onSetUser = (user) => ({ type: SET_USER, user });
const onSetEvents = (events) => ({ type: SET_EVENTS, events });

export { onViewModeChange, onSetUser, onSetEvents };
