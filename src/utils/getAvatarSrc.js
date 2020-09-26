import logoRSSchool from '../assets/images/logo_rs.svg';

/**
 * Get organizer avatar's URL from github.
 * @param {string} url - URL of organizer's page.
 * @returns {(string|null)} Organizer avatar's URL or default logo URL or null.
 */
function getAvatarSrc(url) {
  if (url) {
    return url.indexOf('github') > -1 ? `${url}.png?size=48` : logoRSSchool;
  }
  return null;
}

export default getAvatarSrc;
