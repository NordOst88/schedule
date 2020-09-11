import { TABLE, STUDENT, COLOR_PRESET } from '../constants/constants';

const getInitialState = () => {
  const { mode, user, colorPreset, listView } = localStorage.settings
    ? JSON.parse(localStorage.settings)
    : {};

  return {
    currentView: mode || TABLE,
    role: user || STUDENT,
    events: [],
    eventColors: colorPreset || COLOR_PRESET,
    listView: listView || 'left',
  };
};

export default getInitialState;
