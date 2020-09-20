const getTimeStamp = (momentObj) =>
  momentObj ? Math.floor(new Date(momentObj).getTime() / 1000) : '';

export default getTimeStamp;
