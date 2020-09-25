import React from 'react';

import { Modal, Space, Badge, Tooltip } from 'antd';

import { ELLIPSIS_TEXT_WIDTH } from '../../constants/calendarConstants';

const EllipsisText = (text, textSize) => (
  <Tooltip placement="topLeft" title={text}>
    <div
      style={{
        width: ELLIPSIS_TEXT_WIDTH,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: textSize,
      }}
    >
      {text}
    </div>
  </Tooltip>
);

const EventPopUp = ({
  currentDateEvents = [],
  displayPopUp,
  onEventClick,
  setDisplayPopUp,
  displayModal,
  textSize,
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
            <Line
              text={name}
              color={color}
              item={item}
              onEventClick={onEventClick}
              key={name}
              textSize={textSize}
            />
          );
        })}
      </Space>
    </Modal>
  );
};

const Line = ({ text, color, item, onEventClick, textSize }) => (
  <>
    <Badge
      onClick={() => {
        onEventClick(item);
      }}
      text={EllipsisText(text, textSize)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      color={color}
    />
  </>
);

export default EventPopUp;
