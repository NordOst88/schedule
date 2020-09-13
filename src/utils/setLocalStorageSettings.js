import { TABLE } from '../constants/constants';

const setLocaLStorageSettings = (arr, type) => {
  const [property, value] = type === TABLE ? arr : arr[1];
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : {};
  storage[property] = value;
  localStorage.settings = JSON.stringify(storage);
};

export default setLocaLStorageSettings;
