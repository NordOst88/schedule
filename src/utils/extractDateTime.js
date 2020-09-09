export default function extractDateTime(dateTime, type = 'date') {
  if (dateTime === '') {
    return null;
  }
  if (type === 'date') {
    return new Date(+dateTime * 1000).toLocaleDateString();
  }
  if (type === 'dateTime') {
    return new Date(+dateTime * 1000).toLocaleString().slice(0, 17);
  }
  return new Date(+dateTime * 1000).toLocaleTimeString().slice(0, 5);
}
