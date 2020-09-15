import getFormattedDate from './getFormattedDate';

const compareDates = (moment, eventDate) => {
  const isSameDay = moment.date() === eventDate.getDate();
  const isSameMonth = moment.month() === eventDate.getMonth();
  const isSameYear = moment.year() === eventDate.getFullYear();

  return isSameDay && isSameMonth && isSameYear;
};

const filterDataByDay = (value, events, currentTimezone) =>
  events.filter((obj) => {
    const localTime = new Date(getFormattedDate(obj.dateTime, currentTimezone));

    return compareDates(value, localTime);
  });

const getListData = (value, events, eventColors, currentTimezone) => {
  const currentData = filterDataByDay(value, events, currentTimezone);

  if (!currentData.length) {
    return [];
  }

  return currentData.map((obj) => {
    const objCopy = obj;
    const color = eventColors[objCopy.type[0]];
    objCopy.color = color;

    return objCopy;
  });
};

export { filterDataByDay, getListData };
