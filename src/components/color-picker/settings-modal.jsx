import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';
import ColorPicker from './color-picker';
import { onEventColorChange } from '../../actions/actions';

import {
  MODAL_TEXT,
  TAGS_NAME,
  MODAL_WIDTH,
  SPACE_MARGIN_BOTTOM,
} from '../../constants/colorPickerConstants';

import getTasksTypes from '../../utils/getTasksTypes';
import rgbToHex from '../../utils/colorPickerHelpers';

import './color-picker.scss';

const SettingsModal = ({
  setDisplaySettingsModal,
  displaySettingsModal,
  events,
  eventColors,
  onColorSelect,
}) => {
  const [isDisplayColorPicker, setDisplayColorPicker] = useState(false);
  const [targetColor, setTargetColor] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [eventTarget, setEventTarget] = useState(null);
  const [formattedColor, setFormattedColor] = useState(null);
  const [newColorPreset, setColorPreset] = useState(eventColors);

  useEffect(() => {
    setColorPreset((prevState) => ({ ...prevState, [selectedTag]: formattedColor }));
  }, [formattedColor]);

  const tasksTypes = getTasksTypes(events);
  const tagsName = TAGS_NAME;

  const displayColorPicker = ({ target }) => {
    setEventTarget(target);
    setSelectedTag(target.textContent);
    setTargetColor(rgbToHex(target.style.backgroundColor));
    setDisplayColorPicker(true);
  };

  const getTypeTaskTags = () => {
    const type = tasksTypes;
    return <Type {...{ type, eventColors, tagsName, displayColorPicker }} />;
  };

  const handleOk = () => {
    onColorSelect(newColorPreset);
    setDisplaySettingsModal(false);
  };

  const handleCancel = () => {
    setDisplaySettingsModal(false);
  };

  return (
    <>
      <Modal
        width={MODAL_WIDTH}
        visible={displaySettingsModal}
        title={<Line text={MODAL_TEXT} />}
        closable={false}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Space direction="vertical" style={{ marginBottom: SPACE_MARGIN_BOTTOM }}>
          <Line
            text={getTypeTaskTags()}
            setDisplayColorPicker={setDisplayColorPicker}
            setTargetColor={setTargetColor}
          />
        </Space>
        {isDisplayColorPicker && (
          <ColorPicker
            defaultColor={targetColor}
            setFormattedColor={setFormattedColor}
            eventTarget={eventTarget}
          />
        )}
      </Modal>
    </>
  );
};

const Line = ({ text }) => {
  const { Text } = Typography;
  return <Text style={{ lineHeight: '30px' }}>{text}</Text>;
};

const mapStateToProps = ({ events, eventColors }) => ({
  events,
  eventColors,
});

export default connect(mapStateToProps, { onColorSelect: onEventColorChange })(SettingsModal);
