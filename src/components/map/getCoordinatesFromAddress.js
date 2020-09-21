const yandexGeocoding =
  'https://geocode-maps.yandex.ru/1.x/?apikey=8a4327a5-b906-4828-a81a-88e55dd3039e&format=json&lang=ru_RU&geocode=';

const error = [];
const noResult = false;

export default async function fetchGeopositionBySearch(inputText) {
  try {
    const searchValue = inputText;
    const response = await fetch(`${yandexGeocoding}${searchValue}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    error.push(err);
  }

  return noResult;
}
