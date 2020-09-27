import { YANDEX_TOKEN } from '../constants/mapConstants';

/**
 * Function gets the address of the event and fetches geolocation position
 *
 * @param {string} address address of the event
 * @returns {string} geolocation of the event
 * @returns {boolean} if no position, return false;
 */

export default async function getCoordinatesFromAddress(address) {
  const response = await fetch(`${YANDEX_TOKEN}${address}`);
  const data = await response.json();
  const { featureMember } = data.response.GeoObjectCollection;

  if (featureMember.length) {
    return featureMember[0].GeoObject.Point.pos;
  }

  return false;
}
