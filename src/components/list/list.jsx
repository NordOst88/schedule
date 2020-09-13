import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Timeline, Radio, Typography, Space } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import ModalInfo from '../modal-info/modal-info';

import { LIST_TEXT } from '../../constants/constants';
import { onSetListView } from '../../actions/actions';
import getFormattedDate from '../../utils/getFormattedDate';
import getEventColor from '../../utils/getEventColor';

const List = ({ events, eventColors, listView, onChange }) => {
  const { Text, Link } = Typography;
  const { moreDetails, left, right, alternate, deadline } = LIST_TEXT;
  const [displayModal, setDisplayModal] = useState(false);
  const [eventDescription, setEventDescription] = useState(null);

  const onMoreDetailsClick = (event) => {
    setEventDescription(event);
    setDisplayModal(true);
  };

  // todo: add style
  return (
    <>
      <ListTypeSelect {...{ onChange, listView, left, right, alternate }} />
      <Timeline mode={listView}>
        {events.map((event) => {
          const activeEvent = Date.now() > new Date(event.dateTime * 1000);
          const colorEvent = getEventColor(eventColors, ...event.type, activeEvent);
          const textType = activeEvent ? 'secondary' : null;
          const startDate = getFormattedDate(event.dateTime);
          const deadlineDate = getFormattedDate(event.deadline);
          const dateValue = listView === 'left' || listView === 'right' ? null : `${startDate}`;

          return (
            <Timeline.Item
              key={event.id}
              label={dateValue}
              dot={<FlagOutlined style={{ fontSize: '2rem', color: colorEvent }} />}
              style={{ color: textType ? eventColors.inactive : eventColors.markdown }}
            >
              <Space direction="vertical">
                {!dateValue && (
                  <Text type={textType || 'warning'} strong>
                    {startDate}
                  </Text>
                )}
                <Link href={event.descriptionUrl} target="_blank" type={textType}>
                  {event.name}
                </Link>
                <Text type={textType}>{event.description}</Text>
                <Text
                  mark
                  type={textType}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onMoreDetailsClick(event);
                  }}
                >
                  {moreDetails}
                </Text>
                {deadlineDate && (
                  <Text type={textType || 'danger'}>{`${deadline} ${deadlineDate}`}</Text>
                )}
              </Space>
            </Timeline.Item>
          );
        })}
      </Timeline>
      {displayModal && (
        <ModalInfo {...{ ...eventDescription, displayModal, setDisplayModal, eventColors }} />
      )}
    </>
  );
};

const ListTypeSelect = ({ onChange, listView, left, right, alternate }) => (
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
);

const mapStateToProps = ({ events, eventColors, listView }) => ({
  events,
  eventColors,
  listView,
});

export default connect(mapStateToProps, { onChange: onSetListView })(List);
