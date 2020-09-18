const rgbToHex = (rgbText) =>
  rgbText.replace(
    /rgb\((.+?)\)/gi,
    (_, rgb) =>
      `#${rgb
        .split(',')
        .map((str) =>
          parseInt(str, 10)
            .toString(16)
            .padStart(2, '0'),
        )
        .join('')}`,
  );

export default rgbToHex;
