import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import { PrinterOutlined, SettingOutlined, LineHeightOutlined } from '@ant-design/icons';

import ModalSpinner from '../modal-spinner/modal-spinner';
import OptionPicker from '../option-picker/option-picker';
import Dropdown from '../dropdown/dropdown';
import TableControls from '../table-controls';
import {
  VIEW_MODES,
  CONTROLS_TEXT,
  MODAL_SPINNER_TIP,
  BTN_SAVE_TEXT,
  SAVE_OPTIONS,
  MENTOR,
  TABLE,
} from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import {
  onViewModeChange,
  onTimezoneChange,
  onTaskChange,
  onFontSizeChange,
} from '../../actions/actions';
import print from '../../utils/print';
import exportToFile from '../../utils/exportToFile';

import './controls.scss';

import SettingsModal from '../color-picker/settings-modal';

const Controls = ({
  currentView,
  currentTimezone,
  onViewSelect,
  onTaskSelect,
  onTimezoneSelect,
  selectedTask,
  tasksTypes,
  onTextSizeChange,
  fontSize,
  role,
}) => {
  const { printBtn, textAdjust } = CONTROLS_TEXT;
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false);

  const onBtnExportClick = async (extension) => {
    setDisplaySpinner(true);
    await exportToFile(currentView, extension);
    setDisplaySpinner(false);
  };

  const onSettingsClick = () => {
    setDisplaySettingsModal(true);
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
          <OptionPicker onChange={onTaskSelect} defaultValue={selectedTask} options={tasksTypes} />
        </Menu.Item>
        <Menu.Item>
          <Button icon={<PrintLogo />} onClick={print}>
            {printBtn}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            icon={<TextSizeLogo />}
            onClick={() => {
              onTextSizeChange(fontSize);
            }}
          >
            {textAdjust}
          </Button>
        </Menu.Item>
        {role === MENTOR && currentView === TABLE && (
          <Menu.Item>
            <TableControls />
          </Menu.Item>
        )}
        <Menu.Item>
          <Button icon={<SettingsLogo />} onClick={onSettingsClick} />
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

const TextSizeLogo = () => (
  <LineHeightOutlined style={{ fontSize: '1.8rem', verticalAlign: 'bottom', marginRight: 0 }} />
);

const SettingsLogo = () => (
  <SettingOutlined style={{ fontSize: '1.8rem', verticalAlign: 'bottom', marginRight: 0 }} />
);

const mapStateToProps = ({
  currentView,
  tasksTypes,
  currentTimezone,
  selectedTask,
  role,
  fontSize,
}) => ({
  currentView,
  currentTimezone,
  selectedTask,
  tasksTypes,
  role,
  fontSize,
});

export default connect(mapStateToProps, {
  onViewSelect: onViewModeChange,
  onTimezoneSelect: onTimezoneChange,
  onTaskSelect: onTaskChange,
  onTextSizeChange: onFontSizeChange,
})(Controls);
