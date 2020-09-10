const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  return `${year}-${month}-${day} ${String(date).slice(15, 21)}`;
};
export default getFormattedDate;
