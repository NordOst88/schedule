import { ALL_TASKS } from '../constants/constants';

const getSelectedEvents = (events, selectedTask) => {
  if (selectedTask === ALL_TASKS) {
    return events;
  }
  const formattedEvents = events
    .map((event) => {
      if (event.type.includes(selectedTask)) {
        return event;
      }
      return null;
    })
    .filter((event) => event);

  return formattedEvents;
};

export default getSelectedEvents;
