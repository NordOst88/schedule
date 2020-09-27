import { TABLE } from '../constants/constants';

/**
 * Set application's settings in localstorage
 * @param {Array} arr - Application's settings.
 * @param {string} [type] - Type of settings.
 */
const setLocaLStorageSettings = (arr, type) => {
  const [property, value] = type === TABLE ? arr : arr[1];
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : {};
  storage[property] = value;
  localStorage.settings = JSON.stringify(storage);
};

export default setLocaLStorageSettings;
