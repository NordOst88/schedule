/**
 * Function generates styles for "add feedback button"
 *
 * @returns {Object} styles for add feedback button
 */

const feedbackButtonStyles = () => ({
  marginTop: 14,
});

/**
 * Function generates styles for "feedback switch button"
 *
 * @returns {Object} styles for feedback switch button
 */
const feedbackSwitchStyles = () => ({
  marginRight: 25,
  overflow: 'hidden',
});

/**
 * Function gets event data from the previous render and generates a new array of organizers with id param only
 *
 * @param {Object} prevState current event data including organizer
 * @returns {Array} array of organizers' id
 */

const getOrganizerID = (prevState) =>
  prevState.organizer.map((item) => {
    if (typeof item === 'string') {
      return item;
    }
    return item.id;
  });

export { feedbackButtonStyles, getOrganizerID, feedbackSwitchStyles };
