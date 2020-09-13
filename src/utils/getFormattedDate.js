const getFormattedDate = (timestamp, timezone) => {
  if (timestamp) {
    const localDate = new Date(timestamp * 1000).toLocaleString('en-US', {
      timeZone: timezone,
    });
    const date = new Date(localDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    let day = date.getDate();
    day = day > 9 ? day : `0${day}`;
    return `${year}-${month}-${day} ${String(date).slice(15, 21)}`;
  }
  return null;
};
export default getFormattedDate;
