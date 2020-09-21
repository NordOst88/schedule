import mapboxgl from 'mapbox-gl';

const minutesInHour = 60;
const isNegative = 0;
const globalCoord = 0;

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3RhY2V5c3ljaCIsImEiOiJja2FpaGw0N2YwMHUzMzRtaXNtazBtYXpkIn0.DPP70YMFkqRuAScBuq5_Gw';

const setCoord = (coord, coordText, htmlBox) => {
  const box = htmlBox;
  const convertCoord = Math.abs(coord);
  const degree = Math.floor(convertCoord);
  const minutes = Math.floor((convertCoord - degree) * minutesInHour);

  box.textContent =
    coord < isNegative
      ? `${coordText} -${degree}°${minutes}′`
      : `${coordText} ${degree}°${minutes}′`;
};

const convertDMS = (langTo, latitude, longitude) => {
  let long = 'Longitude:';
  let lat = 'Latitude:';

  if (langTo === 'ru') {
    long = 'Долгота:';
    lat = 'Широта:';
  }

  if (langTo === 'be') {
    long = 'Даугата:';
    lat = 'Шырата:';
  }

  setCoord(latitude, lat, document.getElementById('latitude'));
  setCoord(longitude, long, document.getElementById('longitude'));
};

export const createMap = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [globalCoord, globalCoord],
    zoom: 9,
  });

  return map;
};

const addMap = (map, longitude, latitude) => {
  map.jumpTo({ center: [longitude, latitude] });
  new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
};

export async function initMap(langTo, map) {
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    convertDMS(langTo, latitude, longitude);
    addMap(map, longitude, latitude);
  });
}

export const updateMapBySearch = (langTo, map, position) => {
  const [longitude, latitude] = position.split(' ');

  convertDMS(langTo, latitude, longitude);
  addMap(map, longitude, latitude);
};
