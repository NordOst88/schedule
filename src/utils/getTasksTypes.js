const getTasksTypes = (events) => {
  const allTaskTypes = events.map((event) => event.type).flat();
  return [...new Set(allTaskTypes)];
};

export default getTasksTypes;
