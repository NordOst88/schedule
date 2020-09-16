import html2pdf from 'html2pdf.js';

import { TABLE, CALENDAR } from '../constants/constants';

const exportToFile = async (view) => {
  let [className, orientation, margin] = ['.ant-timeline', 'p', [7, 10, 9, 10]];

  switch (view) {
    case TABLE:
      [className, orientation, margin] = ['.ant-table-content', 'l', [5, 5, 5, 5]];
      break;
    case CALENDAR:
      [className, orientation, margin] = ['.ant-picker-calendar', 'l', [2, 10, 2, 10]];
      break;
    default:
      break;
  }

  const config = {
    margin,
    filename: `${view}.pdf`,
    image: { type: 'jpeg', quality: 0.7 },
    html2canvas: {
      scale: 2,
      logging: false,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation },
  };

  const input = document.querySelector(className);

  await html2pdf(input, config);

  await html2pdf()
    .set(config)
    .from(input)
    .toImg()
    .outputImg()
    .then((img) => {
      const link = document.createElement('a');
      link.download = `${view}.jpeg`;
      link.href = img.src;
      link.click();
    });
};

export default exportToFile;
