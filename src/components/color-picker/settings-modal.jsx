import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';

import './color-picker.scss';
import getTasksTypes from '../../utils/getTasksTypes';
import ColorPicker from './color-picker';

import rgbToHex from '../../utils/colorPickerHelpers';

const SettingsModal = ({ setDisplaySettingsModal, displaySettingsModal, events, eventColors }) => {
  const [isDisplayColorPicker, setDisplayColorPicker] = useState(false);
  const [targetColor, setTargetColor] = useState(null);
  const type = getTasksTypes(events);
  const tagsName = 'color__picker';

  const displayColorPicker = ({ target }) => {
    setTargetColor(rgbToHex(target.style.backgroundColor));
    setDisplayColorPicker(true);
  };

  const getTypeTaskTags = () => <Type {...{ type, eventColors, tagsName, displayColorPicker }} />;

  return (
    <div>
      <Modal
        width={650}
        visible={displaySettingsModal}
        title={<Line title="Settings" text="Settings" />}
        centered
        onCancel={() => {
          setDisplaySettingsModal(false);
        }}
      >
        <Space direction="vertical" style={{ marginBottom: 20 }}>
          <Line
            text={getTypeTaskTags()}
            setDisplayColorPicker={setDisplayColorPicker}
            setTargetColor={setTargetColor}
          />
        </Space>
        {isDisplayColorPicker && <ColorPicker defaultColor={targetColor} />}
      </Modal>
    </div>
  );
};

const Line = ({ text }) => {
  const { Text } = Typography;
  return (
    <>
      <Text style={{ lineHeight: '30px' }}>{text}</Text>
    </>
  );
};

const mapStateToProps = ({ events, eventColors }) => ({
  events,
  eventColors,
});

export default connect(mapStateToProps)(SettingsModal);
