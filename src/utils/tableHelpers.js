import moment from 'moment';
import setLocaLStorageSettings from './setLocalStorageSettings';
import getTimeStamp from './getTimeStamp';
import convertArrayToObject from './convertArrayToObject';
import { TABLE, MODAL_INFO_TEXT } from '../constants/constants';

const { noInfo } = MODAL_INFO_TEXT;

function filterColumns(columns, selectedColumns) {
  return columns.map((item) => {
    if (!selectedColumns.includes(item.key)) {
      return {};
    }
    return item;
  });
}

function addColumnKey(selectedColumns, column) {
  if (!selectedColumns.includes(column.key)) {
    selectedColumns.push(column.key);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], TABLE);
  }
  return selectedColumns;
}

function removeColumnKey(selectedColumns, column) {
  const idx = selectedColumns.indexOf(column.key);
  if (idx > -1) {
    selectedColumns.splice(idx, 1);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], TABLE);
  }
  return selectedColumns;
}

const addClassByCurrentDate = (record) => {
  if (+record.dateTime < Date.now() / 1000) {
    return 'expired-date';
  }
  return null;
};

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
  selectedOrganizers: organizer,
  comment,
});

const formatEventForFetch = ({
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
  selectedOrganizers = [noInfo],
  comment = noInfo,
}) => ({
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
