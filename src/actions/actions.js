import { SET_VIEW_MODE, SET_USER, SET_EVENTS } from './actions-types';

const onViewModeChange = (mode) => ({ type: SET_VIEW_MODE, payload: mode });
const onSetUser = (user) => ({ type: SET_USER, payload: user });
const onSetEvents = (events) => ({ type: SET_EVENTS, payload: events });

export { onViewModeChange, onSetUser, onSetEvents };
