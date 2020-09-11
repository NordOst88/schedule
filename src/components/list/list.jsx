/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { Timeline, Radio, Typography, Space } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import { LIST_TEXT } from '../../constants/constants';
import { onSetListView } from '../../actions/actions';
import getFormattedDate from '../../utils/getFormattedDate';
import getEventColor from '../../utils/getEventColor';

const List = ({ events, eventColors, listView, onChange }) => {
  const { Text, Link } = Typography;
  const { moreDetails, left, right, alternate, deadline } = LIST_TEXT;

  const onMoreDetailsClick = (event) => {
    // todo: show modal
    console.log('onMoreDetailsClick', event);
  };

  // todo: add style
  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={listView}
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
      <Timeline mode={listView}>
        {events.map((event) => {
          const activeEvent = Date.now() > new Date(event.deadline * 1000);
          const colorEvent = getEventColor(activeEvent, eventColors, ...event.type);
          const textType = activeEvent ? 'secondary' : null;
          const startDate = getFormattedDate(event.dateTime);
          const deadlineDate = getFormattedDate(event.deadline);
          const dateValue = listView === 'left' || listView === 'right' ? null : `${startDate}`;

          return (
            <Timeline.Item
              key={event.id}
              label={dateValue}
              dot={<FlagOutlined style={{ fontSize: '2rem', color: colorEvent }} />}
              style={{ color: textType ? '#00000073' : '#faad14' }}
            >
              <Space direction="vertical">
                {dateValue ? null : (
                  <Text type={textType || 'warning'} strong>
                    {startDate}
                  </Text>
                )}
                <Link href={event.descriptionUrl} target="_blank" type={textType}>
                  {event.name}
                </Link>
                <Text type={textType}>{event.description}</Text>
                <Text
                  mark="false"
                  type={textType}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onMoreDetailsClick(event);
                  }}
                >
                  {moreDetails}
                </Text>
                <Text type={textType || 'danger'}>{`${deadline} ${deadlineDate}`}</Text>
              </Space>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </>
  );
};

const mapStateToProps = ({ events, eventColors, listView }) => ({
  events,
  eventColors,
  listView,
});

export default connect(mapStateToProps, { onChange: onSetListView })(List);
