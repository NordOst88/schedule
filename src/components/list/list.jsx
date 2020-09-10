import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Timeline, Spin, Radio, Typography, Space } from 'antd';

import getFormattedDate from '../../utils/getFormattedDate';

const List = ({ events }) => {
  const [mode, setMode] = useState('left');
  const { Text, Link } = Typography;

  const onChange = ({ target: { value } }) => {
    setMode(value);
  };

  const onMoreDetailsClick = (event) => {
    console.log('onMoreDetailsClick', event);
  };

  if (events) {
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
          <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="alternate">Alternate</Radio>
        </Radio.Group>
        <Timeline mode={mode}>
          {events.map((event) => {
            const activeEvent = Date.now() > new Date(+event.deadline);
            const textType = activeEvent ? 'secondary' : null;
            const startDate = getFormattedDate(event.dateTime);
            const deadlineDate = getFormattedDate(event.deadline);
            return (
              <Timeline.Item
                color={activeEvent ? 'gray' : 'green'}
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
                    Подробнее
                  </Text>
                  <Text type={textType || 'danger'}>Deadline: {deadlineDate}</Text>
                </Space>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </>
    );
  }
  return <Spin tip="Loading..." />;
};

const mapStateToProps = ({ events }) => ({
  events,
});

export default connect(mapStateToProps)(List);
