const getEventColor = (palette, type, mode) => {
  if (mode) {
    return palette.inactive;
  }
  return palette[type] || palette.default;
};
export default getEventColor;
