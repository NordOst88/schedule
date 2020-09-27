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
import getFontSize from '../../utils/getFontSize';

import './color-picker.scss';

const SettingsModal = ({
  setDisplaySettingsModal,
  displaySettingsModal,
  events,
  eventColors,
  onColorSelect,
  textSize,
}) => {
  const [isDisplayColorPicker, setDisplayColorPicker] = useState(false);
  const [targetColor, setTargetColor] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [eventTarget, setEventTarget] = useState(null);
  const [formattedColor, setFormattedColor] = useState(null);
  const [newColorPreset, setColorPreset] = useState(eventColors);
  const fontSize = getFontSize(textSize, 1.6);
  const titleTextSize = getFontSize(textSize, 1.9);

  useEffect(() => {
    if (formattedColor) {
      setColorPreset((prevState) => ({ ...prevState, [selectedTag]: formattedColor }));
    }
  }, [formattedColor]);

  const tasksTypes = getTasksTypes(events);
  const tagsName = TAGS_NAME;

  /**
   * Function set state of:
   * -current target
   * -selected tag
   * -target color
   * -displays color picker modal
   *
   * @param {Object} event current event and its target
   */
  const displayColorPicker = ({ target }) => {
    setEventTarget(target);
    setSelectedTag(target.textContent);
    setTargetColor(rgbToHex(target.style.backgroundColor));
    setDisplayColorPicker(true);
  };

  /**
   * function generates all tags using tasks types
   *
   * @returns (
   * <Type {...{ type, eventColors, tagsName, displayColorPicker, fontSize }} />
   * )
   */
  const getTypeTaskTags = () => {
    const type = tasksTypes;
    return <Type {...{ type, eventColors, tagsName, displayColorPicker, fontSize }} />;
  };

  /**
   * Function handle onOk logic in the modal
   * It set state of new color present for the tags
   * it set state for not displaying color picker modal
   */
  const handleOk = () => {
    onColorSelect(newColorPreset);
    setDisplaySettingsModal(false);
  };

  /**
   * Function handles onCancel logic in the modal
   * it set state for not displaying color picker modal
   */
  const handleCancel = () => {
    setDisplaySettingsModal(false);
  };

  return (
    <>
      <Modal
        width={MODAL_WIDTH}
        visible={displaySettingsModal}
        title={<Line text={MODAL_TEXT} fontSize={titleTextSize} />}
        closable={false}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Space direction="vertical" style={{ marginBottom: SPACE_MARGIN_BOTTOM }}>
          <Line
            text={getTypeTaskTags()}
            setDisplayColorPicker={setDisplayColorPicker}
            setTargetColor={setTargetColor}
            fontSize={fontSize}
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

const Line = ({ text, fontSize }) => {
  const { Text } = Typography;
  return <Text style={{ fontSize }}>{text}</Text>;
};

const mapStateToProps = ({ events, eventColors, fontSize }) => ({
  events,
  eventColors,
  textSize: fontSize,
});

export default connect(mapStateToProps, { onColorSelect: onEventColorChange })(SettingsModal);
