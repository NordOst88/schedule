export default function extractDateTime(dateTime, type = 'date') {
  if (type === 'date') {
    return new Date(+dateTime).toLocaleDateString();
  }
  return new Date(+dateTime).toLocaleTimeString().slice(0, 5);
}
