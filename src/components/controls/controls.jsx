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
  VIEW_SPINNER_TIP,
} from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import {
  onViewModeChange,
  onTimezoneChange,
  onTaskChange,
  onFontSizeChange,
} from '../../actions/actions';
import print from '../../utils/print';
import getFontSize from '../../utils/getFontSize';
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
  const { printBtn, textAdjust, colorSettings } = CONTROLS_TEXT;
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [spinnerTip, setSpinnerTip] = useState(MODAL_SPINNER_TIP);
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false);

  const onBtnExportClick = async (extension) => {
    if (displaySpinner !== MODAL_SPINNER_TIP) {
      setSpinnerTip(MODAL_SPINNER_TIP);
    }
    setDisplaySpinner(true);
    await exportToFile(currentView, extension);
    setDisplaySpinner(false);
  };

  const onSettingsClick = () => {
    setDisplaySettingsModal(true);
  };

  const onViewAdjustment = () => {
    if (displaySpinner !== VIEW_SPINNER_TIP) {
      setSpinnerTip(VIEW_SPINNER_TIP);
    }
    setDisplaySpinner(true);
    onTextSizeChange(fontSize);
    setTimeout(() => {
      setDisplaySpinner(false);
    }, 1000);
  };

  const textSize = `${getFontSize(fontSize, 1.7)}`;
  const iconsStyles = { fontSize: '1.9rem', margin: '3px 0 0' };
  const btnsStyles = {
    fontSize: textSize,
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
  };
  const getStyles = (width) => ({ width, fontSize: textSize });

  return (
    <>
      <Menu
        mode="horizontal"
        style={{
          height: 50,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu.Item>
          <Dropdown
            text={BTN_SAVE_TEXT}
            onBtnClick={onBtnExportClick}
            items={SAVE_OPTIONS}
            styles={getStyles(115)}
          />
        </Menu.Item>
        <Menu.Item>
          <OptionPicker
            onChange={onViewSelect}
            defaultValue={currentView}
            options={VIEW_MODES}
            styles={getStyles(130)}
          />
        </Menu.Item>
        <Menu.Item>
          <OptionPicker
            onChange={onTimezoneSelect}
            defaultValue={currentTimezone}
            options={TIMEZONE}
            styles={getStyles(225)}
          />
        </Menu.Item>
        <Menu.Item>
          <OptionPicker
            onChange={onTaskSelect}
            defaultValue={selectedTask}
            options={tasksTypes}
            styles={getStyles(175)}
          />
        </Menu.Item>
        <Menu.Item>
          <Button icon={<PrinterOutlined style={iconsStyles} />} onClick={print} style={btnsStyles}>
            {printBtn}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            icon={<LineHeightOutlined style={iconsStyles} />}
            onClick={onViewAdjustment}
            style={btnsStyles}
          >
            {textAdjust}
          </Button>
        </Menu.Item>
        {role === MENTOR && (
          <Menu.Item>
            <TableControls style={btnsStyles} />
          </Menu.Item>
        )}
        <Menu.Item>
          <Button
            icon={<SettingOutlined style={iconsStyles} />}
            onClick={onSettingsClick}
            style={btnsStyles}
          >
            {colorSettings}
          </Button>
        </Menu.Item>
      </Menu>
      {displaySpinner && <ModalSpinner {...{ displaySpinner, tip: spinnerTip }} />}
      {displaySettingsModal && (
        <SettingsModal {...{ setDisplaySettingsModal, displaySettingsModal }} />
      )}
    </>
  );
};

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
