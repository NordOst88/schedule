import setLocaLStorageSettings from './setLocalStorageSettings';

const getTimeStamp = (value) => {
  const timestamp = Math.floor(new Date(value).getTime() / 1000);
  // console.log(timestamp);
  return timestamp;
};

function onDateChange(value, dateString) {
  // console.log('TimeStamp: ', value);
  getTimeStamp(dateString);
  // console.log('Date and time: ', dateString);
  return value;
}

function onDateOk(value) {
  // console.log('Selected Time: ', value);
  return value;
}

function filterColumns(columns, selectedColumns) {
  return columns.filter((item) => selectedColumns.includes(item.key));
}

function addColumnKey(selectedColumns, column, columnIdx) {
  if (!selectedColumns.includes(column.key)) {
    selectedColumns.splice(columnIdx, 0, column.key);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], 'table');
  }
  return selectedColumns;
}

function removeColumnKey(selectedColumns, column) {
  const idx = selectedColumns.indexOf(column.key);
  if (idx > -1) {
    selectedColumns.splice(idx, 1);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], 'table');
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
