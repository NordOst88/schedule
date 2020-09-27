/**
 * Get timestamp from momentjs object
 * @param {Object} momentObj - An object from momentjs.
 * @returns {(Array|null)} Timestamp or null
 */
const getTimeStamp = (momentObj) =>
  momentObj ? Math.floor(new Date(momentObj).getTime() / 1000) : '';

export default getTimeStamp;
