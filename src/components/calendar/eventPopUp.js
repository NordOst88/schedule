import React from 'react';
//import { connect } from 'react-redux';

import { Modal, Space, Typography } from 'antd';

import 'antd/dist/antd.css';
//import { Badge, Calendar } from 'antd';

const EventPopUp = ({
  currentEvents,
  displayPopUp,
  onEventClick,
  setDisplayPopUp,
  displayModal,
}) => {
  const isDisplay = !displayModal && displayPopUp;
  return (
    <Modal
      width={300}
      visible={isDisplay}
      style={{ top: 20 }}
      footer={null}
      onCancel={() => {
        setDisplayPopUp(false);
      }}
    >
      <Space direction="vertical">
        {currentEvents.map((item) => {
          const { name, color } = item;

          return <Line text={name} color={color} item={item} onEventClick={onEventClick} />;
        })}
      </Space>
    </Modal>
  );
};

const Line = ({ text, color, item, onEventClick }) => {
  const { Text } = Typography;
  return (
    <>
      <Text onClick={() => onEventClick(item)} style={{ color, cursor: 'pointer' }}>
        {text}
      </Text>
    </>
  );
};

export default EventPopUp;
