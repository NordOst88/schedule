import getFormattedDate from './getFormattedDate';

/**
 * Function compares current Date and the event date
 *
 * @param {Object} moment current date
 * @param {Object} eventDate event date
 * @returns {boolean} is the same date
 */

const compareDates = (moment, eventDate) => {
  const isSameDay = moment.date() === eventDate.getDate();
  const isSameMonth = moment.month() === eventDate.getMonth();
  const isSameYear = moment.year() === eventDate.getFullYear();

  return isSameDay && isSameMonth && isSameYear;
};

/**
 * Function filters events according to the current date(day)
 *
 * @param {Object} value
 * @param {Array} events
 * @param {string} currentTimezone current country/city
 * @returns {function} the result of compareDates function
 */

const filterDataByDay = (value, events, currentTimezone) =>
  events.filter((obj) => {
    const localTime = new Date(getFormattedDate(obj.dateTime, currentTimezone));

    return compareDates(value, localTime);
  });

/**
 * Function gets list data for each calendar day
 *
 * @param {Object} value current moment/current date
 * @param {Object} events all events
 * @param {Object} eventColors events' colors
 * @param {string} currentTimezone current country/city
 * @returns {Array} array which includes copy of the currentData array with structured objects for a calendar day
 */

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
