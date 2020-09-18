import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';

import './color-picker.scss';
import getTasksTypes from '../../utils/getTasksTypes';
import ColorPicker from './color-picker';

import rgbToHex from '../../utils/colorPickerHelpers';
import { onEventColorChange } from '../../actions/actions';
import { COLOR_PRESET } from '../../constants/constants';
import {
  MODAL_TEXT,
  TAGS_NAME,
  MODAL_WIDTH,
  CANCEL_TEXT,
  SPACE_MARGIN_BOTTOM,
} from '../../constants/colorPickerConstants';

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
    setColorPreset((prevState) => {
      const newState = { ...prevState };
      newState[selectedTag] = formattedColor;
      return newState;
    });
  }, [formattedColor]);

  const type = getTasksTypes(events);
  const tagsName = TAGS_NAME;

  const displayColorPicker = ({ target }) => {
    setEventTarget(target);
    setSelectedTag(target.textContent);
    setTargetColor(rgbToHex(target.style.backgroundColor));
    setDisplayColorPicker(true);
  };

  const getTypeTaskTags = () => <Type {...{ type, eventColors, tagsName, displayColorPicker }} />;

  return (
    <div>
      <Modal
        width={MODAL_WIDTH}
        cancelText={CANCEL_TEXT}
        visible={displaySettingsModal}
        title={<Line text={MODAL_TEXT} />}
        centered
        closable={false}
        onCancel={({ target }) => {
          if (target.textContent === CANCEL_TEXT) {
            onColorSelect(COLOR_PRESET);
          }
          setDisplaySettingsModal(false);
        }}
        onOk={() => {
          setDisplaySettingsModal(false);
          onColorSelect(newColorPreset);
        }}
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

export default connect(mapStateToProps, { onColorSelect: onEventColorChange })(SettingsModal);
