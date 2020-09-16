import React from 'react';

import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

import OptionPicker from '../option-picker/option-picker';
import { VIEW_MODES, CONTROLS_TEXT } from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import { onViewModeChange, onTimezoneChange } from '../../actions/actions';
import print from '../../utils/print';
import exportToFile from '../../utils/exportToFile';

import './controls.scss';

const Controls = ({ currentView, currentTimezone, onViewSelect, onTimezoneSelect }) => {
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
        <Button
          onClick={async () => {
            await exportToFile(currentView);
          }}
        >
          Save
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<PrintLogo />} onClick={print}>
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
})(Controls);
