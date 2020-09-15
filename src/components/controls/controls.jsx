/* eslint-disable new-cap */
import React from 'react';

import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import OptionPicker from '../option-picker/option-picker';
import { VIEW_MODES, CONTROLS_TEXT } from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import { onViewModeChange, onTimezoneChange } from '../../actions/actions';
import print from '../../utils/print';

import './controls.scss';

const exportPdf = () => {
  const input = document.querySelector('.ant-layout-content');

  //-----
  // html2canvas(input).then((canvas) => {
  //   const imgData = canvas.toDataURL('image/png');

  //   const imgWidth = 210;
  //   const pageHeight = 295;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //   let heightLeft = imgHeight;
  //   const doc = new jsPDF('p', 'mm', 'a4', true);
  //   let position = 0;

  //   doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;

  //   while (heightLeft >= 0) {
  //     position = heightLeft - imgHeight;
  //     doc.addPage();
  //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }
  //   doc.save('file.pdf');
  // });
  //---------
  html2pdf()
    .from(input)
    .save();
};

const Controls = ({ currentView, currentTimezone, onViewSelect, onTimezoneSelect, onPrint }) => {
  const { printBtn } = CONTROLS_TEXT;
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <OptionPicker onChange={onViewSelect} defaultValue={currentView} options={VIEW_MODES} />
      </Menu.Item>
      <Menu.Item>
        <OptionPicker
          onChange={onTimezoneSelect}
          defaultValue={currentTimezone}
          options={TIMEZONE}
        />
      </Menu.Item>
      <Menu.Item>
        <Button onClick={exportPdf}>Save</Button>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<PrintLogo />} onClick={onPrint}>
          {printBtn}
        </Button>
      </Menu.Item>
    </Menu>
  );
};

const PrintLogo = () => (
  <PrinterOutlined style={{ fontSize: '1.8rem', verticalAlign: 'bottom', marginRight: 0 }} />
);

const mapStateToProps = ({ currentView, currentTimezone }) => ({
  currentView,
  currentTimezone,
});

export default connect(mapStateToProps, {
  onViewSelect: onViewModeChange,
  onTimezoneSelect: onTimezoneChange,
  onPrint: print,
})(Controls);

// class Controls extends PureComponent {
//   exportPdf = () => {
//     const doc = new jsPDF();
//     doc.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
//     doc.save('myDocument.pdf');
//   };

//   render() {
//     const { currentView, currentTimezone, onViewSelect, onTimezoneSelect, onPrint } = this.props;
//     const { printBtn } = CONTROLS_TEXT;
//     return (
//       <Menu mode="horizontal">
//         <Menu.Item>
//           <OptionPicker onChange={onViewSelect} defaultValue={currentView} options={VIEW_MODES} />
//         </Menu.Item>
//         <Menu.Item>
//           <OptionPicker
//             onChange={onTimezoneSelect}
//             defaultValue={currentTimezone}
//             options={TIMEZONE}
//           />
//         </Menu.Item>
//         <Menu.Item>
//           <Button onClick={this.exportPdf}>Save</Button>
//         </Menu.Item>
//         <Menu.Item>
//           <Button icon={<PrintLogo />} onClick={onPrint}>
//             {printBtn}
//           </Button>
//         </Menu.Item>
//       </Menu>
//     );
//   }
// }
