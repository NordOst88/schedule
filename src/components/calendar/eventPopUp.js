import React from 'react';

import { Modal, Space, Badge } from 'antd';

const EventPopUp = ({
  currentDateEvents = [],
  displayPopUp,
  onEventClick,
  setDisplayPopUp,
  displayModal,
}) => {
  const isDisplay = !displayModal && displayPopUp && currentDateEvents.length;

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
        {currentDateEvents.map((item) => {
          const { name, color } = item;

          return (
            <Line text={name} color={color} item={item} onEventClick={onEventClick} key={name} />
          );
        })}
      </Space>
    </Modal>
  );
};

const Line = ({ text, color, item, onEventClick }) => (
  <>
    <Badge
      onClick={() => {
        onEventClick(item);
      }}
      style={{ cursor: 'pointer' }}
      color={color}
      text={text}
    />
  </>
);

export default EventPopUp;
