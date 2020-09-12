/* eslint-disable no-console */
import logoRSSchool from '../../assets/images/logo_rs.svg';
import setLocaLStorageSettings from '../../utils/setLocalStorageSettings';

function getAvatarSrc(url) {
  if (url.indexOf('github') > -1) {
    return `${url}.png?size=48`;
  }
  return logoRSSchool;
}

const getTimeStamp = (value) => {
  const timestamp = Math.floor(new Date(value).getTime() / 1000);
  console.log(timestamp);
};

function onDateChange(value, dateString) {
  console.log('TimeStamp: ', value);
  getTimeStamp(dateString);
  console.log('Date and time: ', dateString);
}

function onDateOk(value) {
  console.log('Selected Time: ', value);
}

function filterColumns(columns, selectedColumns) {
  return columns.filter((item) => selectedColumns.includes(item.key));
}

function addColumnKeyToList(selectedColumns, column, columnIdx) {
  if (!selectedColumns.includes(column.key)) {
    selectedColumns.splice(columnIdx, 0, column.key);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], 'table');
  }
  return selectedColumns;
}

function removeColumnKeyToList(selectedColumns, column) {
  const idx = selectedColumns.indexOf(column.key);
  if (idx > -1) {
    selectedColumns.splice(idx, 1);
    setLocaLStorageSettings(['tableColumnsSelected', JSON.stringify(selectedColumns)], 'table');
  }
  return selectedColumns;
}

export {
  getAvatarSrc,
  onDateChange,
  onDateOk,
  filterColumns,
  addColumnKeyToList,
  removeColumnKeyToList,
};
