import { TABLE, STUDENT, COLOR_PRESET, ALL_TASKS } from '../constants/constants';

const getInitialState = () => {
  const {
    mode,
    user,
    colorPreset,
    listView,
    timezone,
    selectedTask,
    fontSize,
    selectedRowKeys,
    isHiddenRowKeys,
  } = localStorage.settings ? JSON.parse(localStorage.settings) : {};

  return {
    currentView: mode || TABLE,
    role: user || STUDENT,
    events: [],
    selectedEvents: [],
    eventColors: colorPreset || COLOR_PRESET,
    listView: listView || 'left',
    currentTimezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    selectedTask: selectedTask || ALL_TASKS,
    tasksTypes: [],
    tableEditMode: false,
    fontSize: fontSize || 10,
    selectedRowKeys: selectedRowKeys || [],
    isHiddenRowKeys: isHiddenRowKeys || false,
  };
};

export default getInitialState;
