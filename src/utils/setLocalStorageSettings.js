const setLocaLStorageSettings = (arr, type) => {
  const [property, value] = type === 'table' ? arr : arr[1];
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : {};
  storage[property] = value;
  localStorage.settings = JSON.stringify(storage);
};

export default setLocaLStorageSettings;
