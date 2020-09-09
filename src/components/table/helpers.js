import dummyMentors from './dummyMentors';
import logoRSSchool from '../../assets/images/logo_rs.svg';

const tagsColors = {
  'js task': 'green',
  additional: 'purple',
  deadline: 'red',
  lecture: 'blue',
  'self-study': 'cyan',
};

const colorSelector = (type) => tagsColors[type];

function getOrganizer(id) {
  return dummyMentors.find((mentor) => mentor.id === id);
}

function getAvatarSrc(url) {
  if (url.indexOf('github') > -1) {
    return `${url}.png?size=48`;
  }
  return logoRSSchool;
}

export { colorSelector, getOrganizer, getAvatarSrc };
