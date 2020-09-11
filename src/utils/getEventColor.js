const getEventColor = (mode, palette, type) => {
  if (mode) {
    return palette.inactive;
  }
  return palette[type] || palette.default;
};
export default getEventColor;
