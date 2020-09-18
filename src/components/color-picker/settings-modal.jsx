import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';

import './color-picker.scss';
import getTasksTypes from '../../utils/getTasksTypes';
import ColorPicker from './color-picker';

const SettingsModal = ({ setDisplaySettingsModal, displaySettingsModal, events, eventColors }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const type = getTasksTypes(events);
  const tagsName = 'color__picker';
  const getTypeTaskTags = () => <Type {...{ type, eventColors, tagsName }} />;

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
          <Line text={getTypeTaskTags()} setDisplayColorPicker={setDisplayColorPicker} />
        </Space>
        {displayColorPicker && <ColorPicker />}
      </Modal>
    </div>
  );
};

const Line = ({ text, setDisplayColorPicker }) => {
  const { Text } = Typography;
  return (
    <>
      <Text style={{ lineHeight: '30px' }} onClick={() => setDisplayColorPicker(true)}>
        {text}
      </Text>
    </>
  );
};

const mapStateToProps = ({ events, eventColors }) => ({
  events,
  eventColors,
});

export default connect(mapStateToProps)(SettingsModal);
