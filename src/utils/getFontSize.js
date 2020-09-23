import { DEFAULT_FONT_SIZE } from '../constants/constants';

const getFontSize = (fontSize = DEFAULT_FONT_SIZE, multiplier) => {
  const formattedFontSize = multiplier ? `${Math.round(multiplier * fontSize)}px` : `${fontSize}px`;

  return formattedFontSize;
};

export default getFontSize;
