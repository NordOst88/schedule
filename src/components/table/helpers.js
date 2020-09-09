import dummyMentors from './dummyMentors';

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

export { colorSelector, getOrganizer };
