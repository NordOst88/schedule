import { YANDEX_TOKEN } from '../constants/mapConstants';

export default async function getCoordinatesFromAddress(inputText) {
  const noResult = false;
  const searchValue = inputText;
  const response = await fetch(`${YANDEX_TOKEN}${searchValue}`);
  const data = await response.json();
  const {
    response: {
      GeoObjectCollection: { featureMember },
    },
  } = data;

  if (featureMember.length !== 0) {
    const [
      {
        GeoObject: {
          Point: { pos },
        },
      },
    ] = featureMember;

    return pos;
  }

  return noResult;
}
