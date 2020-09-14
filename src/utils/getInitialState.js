import { TABLE, STUDENT, COLOR_PRESET } from '../constants/constants';

const getInitialState = () => {
  const { mode, user, colorPreset, listView, timezone } = localStorage.settings
    ? JSON.parse(localStorage.settings)
    : {};

  return {
    currentView: mode || TABLE,
    role: user || STUDENT,
    events: [],
    eventColors: colorPreset || COLOR_PRESET,
    listView: listView || 'left',
    currentTimezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

export default getInitialState;
