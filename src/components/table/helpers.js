/* eslint-disable no-console */
import dummyMentors from './dummyMentors';
import logoRSSchool from '../../assets/images/logo_rs.svg';
import { tagsColors } from './constants';

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

const getTimeStamp = (value) => {
  const timestamp = Math.floor(new Date(value).getTime() / 1000);
  console.log(timestamp);
};

function onDateChange(value, dateString) {
  console.log('TimeStamp: ', value);
  getTimeStamp(dateString);
  console.log('Date and time: ', dateString);
}

function onDateOk(value) {
  console.log('Selected Time: ', value);
}

export { colorSelector, getOrganizer, getAvatarSrc, onDateChange, onDateOk };
