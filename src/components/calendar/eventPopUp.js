import React from 'react';

import { Modal, Space, Badge, Tooltip } from 'antd';

import { ELLIPSIS_TEXT_WIDTH } from '../../constants/calendarConstants';

/**
 * Creates tooltip component
 *
 * @param {string} text test which will be displayed
 * @param {number} fontSize current fontsize
 * @example
 * const text = 'Add feedback';
 * const fontSize = 14;
 *
 * return (
 * <EllipsisText text={text} fontSize={fontSize} />)
 */

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

/**
 * Creates a small popup modal on mobile devices for better displaying event on the particular date
 *
 * @component
 * @example
 * const currentDateEvents = [{name: 'JS basics course, color: '#1111'}]
 * const displayPopUp = true;
 * const onEventClick = () => console.log('handle event click');
 * const setDisplayPopUp = () => console.log('set state for displaying popup to false');
 * const displayModal = true/false;
 * const textSize = 14;
 *
 * return (
 *  <EventPopUp {...{currentDateEvents, displayPopUp, onEventClick, setDisplayPopUp, displayModal, textSize }} />
 * )
 */

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

/**
 * Component creates Line including badge and event description
 *
 * @component
 * @example
 * const text = ''Js course materials';
 * const color = '#0000';
 * const item = e.target;
 * const onEventClick = () => console.log('handle onClick function');
 * const textSize = 14;
 *
 * return (
 *  <Line {...{ text, color, item, onEventClick, textSize }} />
 * )
 */

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
