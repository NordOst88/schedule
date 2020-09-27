/**
 * Convert array of objects to object when keys is values of array's object[title]
 * and values is values of array's object[url]
 * @param {Array} array - The event's list of links.
 * @returns {Object} Formatted object with titles and URL's of links to materials.
 */
const convertArrayToObject = (array) =>
  Array.isArray(array)
    ? array.reduce(
        (obj, item) => ({
          ...obj,
          [item.title]: item.url,
        }),
        {},
      )
    : {};

export default convertArrayToObject;
