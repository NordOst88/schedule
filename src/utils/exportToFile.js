import html2pdf from 'html2pdf.js';
import { TABLE, CALENDAR } from '../constants/constants';

const exportToFile = (view) => {
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

  html2pdf(document.querySelector(className), {
    margin,
    filename: `${view}.pdf`,
    image: { type: 'jpeg', quality: 0.7 },
    html2canvas: {
      scale: 2,
      logging: false,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation },
  });
};

export default exportToFile;
