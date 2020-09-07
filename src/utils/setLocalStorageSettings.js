const setLocaLStorageSettings = (arr) => {
  const [property, value] = arr;
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : {};
  storage[property] = value;
  localStorage.settings = JSON.stringify(storage);
};

export default setLocaLStorageSettings;
