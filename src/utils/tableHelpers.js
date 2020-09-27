import moment from 'moment';
import { TABLE, MODAL_INFO_TEXT } from '../constants/constants';
import setLocaLStorageSettings from './setLocalStorageSettings';
import getTimeStamp from './getTimeStamp';
import convertArrayToObject from './convertArrayToObject';

const { noInfo } = MODAL_INFO_TEXT;

/**
 * Filter columns array by a list of selected to view columns
 * @param {Array} columns - An array of objects with columns configurations.
 * @param {Array} selectedColumns - An array of strings with columns names selected to view.
 * @returns {Array} Filtered array of columns
 */
function filterColumns(columns, selectedColumns) {
  return columns.map((item) => {
    if (!selectedColumns.includes(item.key)) {
      return {};
    }
    return item;
  });
}

/**
 * Add new column name to list of columns selected to view and save this list to localstorage.
 * @param {Array} selectedColumns - An array of strings with columns names selected to view.
 * @param {Object} column - An object with column configuration.
 * @returns {Array} An array of strings with columns names selected to view.
 */
function addColumnKey(selectedColumns, column) {
  if (!selectedColumns.includes(column.key)) {
    selectedColumns.push(column.key);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], TABLE);
  }
  return selectedColumns;
}

/**
 * Remove column name from list of columns selected to view and save this list to localstorage.
 * @param {Array} selectedColumns - An array of strings with columns names selected to view.
 * @param {Object} column - An object with column configuration.
 * @returns {Array} An array of strings with columns names selected to view.
 */
function removeColumnKey(selectedColumns, column) {
  const idx = selectedColumns.indexOf(column.key);
  if (idx > -1) {
    selectedColumns.splice(idx, 1);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], TABLE);
  }
  return selectedColumns;
}

/**
 * Add class name to row if date of record in this row less than current.
 * @param {Object} record - An object with data of event.
 * @returns {(string|null)} Class name 'expired-date' or null.
 */
const addClassByCurrentDate = (record) => {
  if (+record.dateTime < Date.now() / 1000) {
    return 'expired-date';
  }
  return null;
};

/**
 * Format object with event's data for adding to form in modal.
 * @param {Object} event - An object with data of event.
 * @param {string} event.id - The event's id.
 * @param {number} event.week - The event's week.
 * @param {string} event.dateTime - The event's timestamp.
 * @param {string} event.deadline - The event's deadline timestamp.
 * @param {Array} event.type - List of the event's types.
 * @param {string} event.place - Where the event will take place.
 * @param {string} event.estimatedTime - Estimated duration of the event.
 * @param {string} event.name - The name of the event.
 * @param {string} event.description - Description of the event.
 * @param {string} event.descriptionUrl - Link to the event's page.
 * @param {Object} event.links - List of links to materials for the event.
 * @param {Object} event.feedbacks - List of the event feedbacks.
 * @param {boolean} event.allowFeedback - Option is it allowed to add feedbacks.
 * @param {Array} event.organizer - List of the event organizers.
 * @param {string} event.comment - Organizer's comment for the event.
 * @returns {Object} Object with formatted data.
 */
const formatEventForModal = ({
  id,
  week,
  dateTime,
  deadline,
  type,
  place,
  estimatedTime,
  name,
  description,
  descriptionUrl,
  links,
  feedbacks,
  allowFeedback,
  organizer,
  comment,
}) => ({
  id,
  week: +week,
  dateTime: dateTime && moment(dateTime * 1000),
  deadline: deadline && moment(deadline * 1000),
  type,
  place,
  estimatedTime,
  name,
  description,
  descriptionUrl,
  links: Object.entries(links).map((item) => ({
    title: item[0],
    url: item[1],
  })),
  feedbacks,
  allowFeedback,
  selectedOrganizers: organizer,
  comment,
});

/**
 * Format object with event's data for adding to form in modal.
 * @param {Object} event - An object with data of event.
 * @param {string} [event.id] - The event's id.
 * @param {number} [event.week] - The event's week.
 * @param {string} event.dateTime - The event's timestamp.
 * @param {string} [event.deadline] - The event's deadline timestamp.
 * @param {Array} [event.type=["N/A"]] - List of the event's types.
 * @param {string} [event.place="N/A"] - Where the event will take place.
 * @param {string} [event.estimatedTime="N/A"] - Estimated duration of the event.
 * @param {string} event.name - The name of the event.
 * @param {string} [event.description="N/A"] - Description of the event.
 * @param {string} [event.descriptionUrl="N/A"] - Link to the event's page.
 * @param {Object} [event.links] - List of links to materials for the event.
 * @param {Object} [event.feedbacks] - List of the event feedbacks.
 * @param {boolean} [event.allowFeedback] - Option is it allowed to add feedbacks.
 * @param {Array} event.organizer - List of the event organizers.
 * @param {string} [event.comment="N/A"] - Organizer's comment for the event.
 * @returns {Object} Object with formatted data.
 */
const formatEventForFetch = ({
  id,
  week,
  dateTime,
  deadline,
  type = [noInfo],
  place = noInfo,
  estimatedTime = noInfo,
  name = noInfo,
  descriptionUrl = noInfo,
  description = noInfo,
  links,
  feedbacks,
  allowFeedback,
  selectedOrganizers = [noInfo],
  comment = noInfo,
}) => ({
  id,
  week: `${week}`,
  dateTime: `${getTimeStamp(dateTime)}`,
  deadline: `${getTimeStamp(deadline)}`,
  type,
  place,
  estimatedTime,
  timeZone: '',
  name,
  descriptionUrl,
  description,
  links: convertArrayToObject(links),
  feedbacks,
  allowFeedback,
  organizer: selectedOrganizers.map((item) => item.id),
  comment,
});

export {
  filterColumns,
  addColumnKey,
  removeColumnKey,
  addClassByCurrentDate,
  formatEventForModal,
  formatEventForFetch,
};
