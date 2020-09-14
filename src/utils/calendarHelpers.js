import { MILLISECONDS } from '../constants/calendarConstants';

const compareDates = (moment, eventDate) => {
  const isSameDay = moment.date() === eventDate.getDate();
  const isSameMonth = moment.month() === eventDate.getMonth();
  const isSameYear = moment.year() === eventDate.getFullYear();

  return isSameDay && isSameMonth && isSameYear;
};

const filterDataByDay = (value, events) =>
  events.filter((obj) => {
    const eventDate = new Date(+obj.dateTime * MILLISECONDS);

    return compareDates(value, eventDate);
  });

const getListData = (value, events, eventColors) => {
  const currentData = filterDataByDay(value, events);

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
