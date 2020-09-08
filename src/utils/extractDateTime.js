export default function extractDateTime(dateTime, type = 'date') {
  if (dateTime === '') {
    return null;
  }
  if (type === 'date') {
    return new Date(+dateTime).toLocaleDateString();
  }
  if (type === 'dateTime') {
    return new Date(+dateTime).toLocaleString().slice(0, 17);
  }
  return new Date(+dateTime).toLocaleTimeString().slice(0, 5);
}
