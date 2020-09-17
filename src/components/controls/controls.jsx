import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

import ModalSpinner from '../modal-spinner/modal-spinner';
import OptionPicker from '../option-picker/option-picker';
import Dropdown from '../dropdown/dropdown';

import {
  VIEW_MODES,
  CONTROLS_TEXT,
  MODAL_SPINNER_TIP,
  BTN_SAVE_TEXT,
  SAVE_OPTIONS,
} from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import { onViewModeChange, onTimezoneChange } from '../../actions/actions';
import print from '../../utils/print';
import exportToFile from '../../utils/exportToFile';

import './controls.scss';

import SettingsLogo from '../color-picker/settings-logo';
import SettingsModal from '../color-picker/color-picker';

const Controls = ({ currentView, currentTimezone, onViewSelect, onTimezoneSelect }) => {
  const { printBtn, settingsBtn } = CONTROLS_TEXT;
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false);

  const onBtnExportClick = async (extension) => {
    setDisplaySpinner(true);
    await exportToFile(currentView, extension);
    setDisplaySpinner(false);
  };

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item>
          <Dropdown text={BTN_SAVE_TEXT} onBtnClick={onBtnExportClick} items={SAVE_OPTIONS} />
        </Menu.Item>
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
          <Button icon={<PrintLogo />} onClick={print}>
            {printBtn}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button icon={<SettingsLogo />} onClick={() => setDisplaySettingsModal(true)}>
            {settingsBtn}
          </Button>
        </Menu.Item>
      </Menu>
      {displaySpinner && <ModalSpinner {...{ displaySpinner, tip: MODAL_SPINNER_TIP }} />}
      {displaySettingsModal && (
        <SettingsModal {...{ setDisplaySettingsModal, displaySettingsModal }} />
      )}
    </>
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
