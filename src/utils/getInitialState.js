import { TABLE, STUDENT } from '../constants/constants';

const getInitialState = () => {
  const { mode, user } = localStorage.settings ? JSON.parse(localStorage.settings) : {};

  return {
    currentView: mode || TABLE,
    role: user || STUDENT,
    events: null,
  };
};

export default getInitialState;
