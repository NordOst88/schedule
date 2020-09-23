import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Timeline, Radio, Typography, Space, Divider } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import ModalInfo from '../modal-info/modal-info';

import { LIST_TEXT, RADIO_ITEMS } from '../../constants/constants';
import { onSetListView } from '../../actions/actions';
import getFormattedDate from '../../utils/getFormattedDate';
import getEventColor from '../../utils/getEventColor';
import getFontSize from '../../utils/getFontSize';

import './list.scss';

const List = ({
  selectedEvents,
  eventColors,
  listView,
  onChange,
  currentTimezone,
  textSize,
  role,
}) => {
  const { Text, Link } = Typography;
  const { moreDetails, deadline } = LIST_TEXT;
  const [displayModal, setDisplayModal] = useState(false);
  const [eventDescription, setEventDescription] = useState(null);
  const fontSize = getFontSize(textSize, 1.6);
  const titleTextSize = getFontSize(textSize, 1.9);

  const onMoreDetailsClick = (event) => {
    setEventDescription(event);
    setDisplayModal(true);
  };
  // todo: add style
  return (
    <>
      <ListTypeSelect {...{ onChange, listView, radioItems: RADIO_ITEMS, fontSize }} />
      <Timeline mode={listView}>
        {selectedEvents.map((event) => {
          const activeEvent = Date.now() > new Date(event.dateTime * 1000);
          const colorEvent = getEventColor(eventColors, event.type, activeEvent);
          const textType = activeEvent ? 'secondary' : null;
          const startDate = getFormattedDate(event.dateTime, currentTimezone);
          const deadlineDate = getFormattedDate(event.deadline, currentTimezone);
          const [left, right, alternate] = Object.keys(RADIO_ITEMS);
          const dateValue = listView === left || listView === right ? null : `${startDate}`;

          return (
            <Timeline.Item
              key={event.id}
              label={dateValue}
              dot={<FlagOutlined style={{ fontSize: '2.4rem', color: colorEvent }} />}
              style={{ color: textType ? eventColors.inactive : eventColors.markdown, fontSize }}
            >
              <Space direction="vertical">
                {!dateValue && (
                  <Text type={textType || 'success'} strong>
                    {startDate}
                  </Text>
                )}
                <Link
                  href={event.descriptionUrl}
                  target="_blank"
                  type={textType}
                  style={{ fontSize: titleTextSize, lineHeight: 1 }}
                >
                  {event.name}
                </Link>
                <Text
                  type={textType}
                  style={{
                    display: 'block',
                    textAlign: listView !== alternate ? listView : 'center',
                  }}
                >
                  {event.description}
                </Text>
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
                <Divider />
              </Space>
            </Timeline.Item>
          );
        })}
      </Timeline>
      {displayModal && (
        <ModalInfo
          {...{
            ...eventDescription,
            displayModal,
            setDisplayModal,
            eventColors,
            currentTimezone,
            fontSize,
            titleTextSize,
            role,
          }}
        />
      )}
    </>
  );
};

const ListTypeSelect = ({ onChange, listView, radioItems, fontSize }) => {
  const radioStyles = { fontSize, display: 'flex', alignItems: 'center' };
  const radioItemsKeys = Object.entries(radioItems);

  return (
    <Radio.Group
      onChange={onChange}
      value={listView}
      style={{
        display: 'flex',
        marginBottom: 10,
        justifyContent: 'flex-end',
      }}
    >
      {radioItemsKeys.length
        ? radioItemsKeys.map((item) => (
            <Radio value={item[0]} style={radioStyles} key={item[0]}>
              {item[1]}
            </Radio>
          ))
        : null}
    </Radio.Group>
  );
};

const mapStateToProps = ({
  events,
  selectedEvents,
  eventColors,
  listView,
  currentTimezone,
  fontSize,
  role,
}) => ({
  events,
  selectedEvents,
  eventColors,
  listView,
  currentTimezone,
  textSize: fontSize,
  role,
});

export default connect(mapStateToProps, { onChange: onSetListView })(List);
