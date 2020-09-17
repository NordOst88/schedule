import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';

import './color-picker.scss';

const getTasksTypes = (events) => {
  const allTypes = events.map((obj) => obj.type).flat();
  return [...new Set(allTypes)];
};

const SettingsModal = ({ setDisplaySettingsModal, displaySettingsModal, events, eventColors }) => {
  const settingsContainerRef = useRef(null);
  const type = getTasksTypes(events);
  const getTypeTaskTags = () => <Type {...{ type, eventColors }} />;
  console.log('types', getTypeTaskTags());

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
        <Space direction="vertical">
          <Line text={getTypeTaskTags()} />
        </Space>
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
