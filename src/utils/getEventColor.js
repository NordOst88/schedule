const getEventColor = (palette, type, mode) => {
  const formattedType = Array.isArray(type) ? type[0] : type;
  if (mode) {
    return palette.inactive;
  }
  return palette[formattedType] || palette.default;
};
export default getEventColor;
