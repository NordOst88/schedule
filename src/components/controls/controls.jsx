/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import OptionPicker from '../option-picker/option-picker';
import { VIEW_MODES } from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import { onViewModeChange, onTimezoneChange } from '../../actions/actions';
import print from '../../utils/print';

import './controls.scss';

// const _exportPdf = () => {
//   html2canvas(document.querySelector('.ant-layout-content')).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     // eslint-disable-next-line new-cap
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, 'PNG', 0, 0);
//     pdf.output('dataurlnewwindow');
//     pdf.save('download.pdf');
//   });
// };

const Controls = ({ currentView, currentTimezone, onViewSelect, onTimezoneSelect, onPrint }) => {
  const PrintLogo = (
    <PrinterOutlined style={{ fontSize: '1.8rem', verticalAlign: 'bottom', marginRight: 0 }} />
  );
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
        <Button>Print</Button>
      </Menu.Item>
      <Menu.Item>
        <Button icon={PrintLogo} onClick={onPrint}>
          Print
        </Button>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = ({ currentView, currentTimezone }) => ({
  currentView,
  currentTimezone,
});

export default connect(mapStateToProps, {
  onViewSelect: onViewModeChange,
  onTimezoneSelect: onTimezoneChange,
  onPrint: print,
})(Controls);
