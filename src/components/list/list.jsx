import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Timeline, Radio, Typography, Space } from 'antd';

import { LIST_TEXT } from '../../constants/constants';
import getFormattedDate from '../../utils/getFormattedDate';
import getEventColor from '../../utils/getEventColor';

const List = ({ events, eventColors }) => {
  const [mode, setMode] = useState('left');
  const { Text, Link } = Typography;
  const { moreDetails, left, right, alternate } = LIST_TEXT;

  const onChange = ({ target: { value } }) => {
    setMode(value);
  };

  const onMoreDetailsClick = (event) => {
    console.log('onMoreDetailsClick', event);
  };

  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          display: 'flex',
          marginBottom: 10,
          justifyContent: 'flex-end',
        }}
      >
        <Radio value="left">{left}</Radio>
        <Radio value="right">{right}</Radio>
        <Radio value="alternate">{alternate}</Radio>
      </Radio.Group>
      <Timeline mode={mode}>
        {events.map((event) => {
          const activeEvent = Date.now() > new Date(event.deadline * 1000);
          const colorEvent = getEventColor(activeEvent, eventColors, ...event.type);
          const textType = activeEvent ? 'secondary' : null;
          const startDate = getFormattedDate(event.dateTime);
          const deadlineDate = getFormattedDate(event.deadline);

          return (
            <Timeline.Item
              color={colorEvent}
              key={event.id}
              // label={mode === 'left' ? null : `${startDate}`}
              label={`${startDate}`}
            >
              <Space direction="vertical">
                {/* {mode === 'left' ? <p>{startDate}</p> : null} */}
                <Link href={event.descriptionUrl} target="_blank" type={textType}>
                  {event.name}
                </Link>
                <Text type={textType}>{event.description}</Text>
                <Text
                  mark
                  type={textType}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onMoreDetailsClick(event)}
                >
                  {moreDetails}
                </Text>
                <Text type={textType || 'danger'}>Deadline: {deadlineDate}</Text>
              </Space>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </>
  );
};

const mapStateToProps = ({ events, eventColors }) => ({
  events,
  eventColors,
});

export default connect(mapStateToProps)(List);
