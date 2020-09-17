import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';

import './color-picker.scss';

const getTasksTypes = (events) => {
  const allTypes = events.map((obj) => obj.type).flat();
  return [...new Set(allTypes)];
};

const SettingsModal = ({ setDisplaySettingsModal, displaySettingsModal, events, eventColors }) => {
  const settingsContainerRef = useRef(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const type = getTasksTypes(events);
  const tagsName = 'color__picker';
  const getTypeTaskTags = () => <Type {...{ type, eventColors, tagsName }} />;

  return (
    <div ref={settingsContainerRef}>
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
        {displayColorPicker && <ChromePicker style={{ margin: '0 auto' }} />}
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
