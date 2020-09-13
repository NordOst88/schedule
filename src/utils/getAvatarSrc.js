import logoRSSchool from '../assets/images/logo_rs.svg';

function getAvatarSrc(url) {
  if (url) {
    return url.indexOf('github') > -1 ? `${url}.png?size=48` : logoRSSchool;
  }
  return null;
}

export default getAvatarSrc;
