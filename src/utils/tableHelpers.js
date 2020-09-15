import setLocaLStorageSettings from './setLocalStorageSettings';
import { TABLE } from '../constants/constants';

// todo: remove after tests
const getTimeStamp = (value) => {
  const timestamp = Math.floor(new Date(value).getTime() / 1000);
  // console.log(timestamp);
  return timestamp;
};

// todo: remove after tests
function onDateChange(value, dateString) {
  // console.log('TimeStamp: ', value);
  getTimeStamp(dateString);
  // console.log('Date and time: ', dateString);
  return value;
}

// todo: remove after tests
function onDateOk(value) {
  // console.log('Selected Time: ', value);
  return value;
}

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

export {
  onDateChange,
  onDateOk,
  filterColumns,
  addColumnKey,
  removeColumnKey,
  addClassByCurrentDate,
};
