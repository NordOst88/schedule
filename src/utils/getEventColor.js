/**
 * Returns the pre-computed color
 * @param {Array} palette - color presets
 * @param {(Array|string)} type - event type
 * @param {boolean} mode - event mode
 * @returns {string} event color
 */

const getEventColor = (palette, type, mode) => {
  const formattedType = Array.isArray(type) ? type[0] : type;
  if (mode) {
    return palette.inactive;
  }
  return palette[formattedType] || palette.default;
};
export default getEventColor;
