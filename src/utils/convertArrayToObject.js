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
