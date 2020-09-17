import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Badge, Calendar, Tooltip } from 'antd';

import ModalInfo from '../modal-info/modal-info';
import { filterDataByDay, getListData } from '../../utils/calendarHelpers';
import getFormattedDate from '../../utils/getFormattedDate';
import EventPopUp from './eventPopUp';
import {
  INACTIVE_EVENT_TYPE,
  INACTIVE_EVENT_COLOR,
  LARGE_MOBILE_WIDTH,
  DESKTOP_WIDTH,
  CALENDAR_FONT_SIZE,
  BADGE_HEIGHT,
} from '../../constants/calendarConstants';
import './calendar.scss';

const EllipsisText = (text) => (
  <Tooltip placement="topLeft" title={text}>
    <div
      style={{
        width: `${window.innerWidth <= DESKTOP_WIDTH ? '30px' : '80px'}`,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: CALENDAR_FONT_SIZE,
      }}
    >
      {text}
    </div>
  </Tooltip>
);

const dateCellRender = (value, events, eventColors, onEventClick, currentTimezone) => {
  const listData = getListData(value, events, eventColors, currentTimezone);

  return (
    <ul
      className="calendar__events"
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {listData.map((item) => {
        const { dateTime, name, color, id } = item;
        const activeEvent = Date.now() > new Date(getFormattedDate(dateTime, currentTimezone));
        const textType = activeEvent ? INACTIVE_EVENT_TYPE : null;
        const badgeText = window.innerWidth <= LARGE_MOBILE_WIDTH ? '' : EllipsisText(name);

        return (
          <li key={name} id={id}>
            <Badge
              onClick={() => onEventClick(item)}
              color={color}
              text={badgeText}
              style={{
                color: textType ? INACTIVE_EVENT_COLOR : color,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: BADGE_HEIGHT,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

const CalendarContainer = ({ events, eventColors, currentTimezone }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [eventDescription, setEventDescription] = useState(null);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [currentDateEvents, setCurrentDateEvents] = useState(null);

  const onEventClick = (eventName) => {
    setEventDescription(eventName);
    if (window.innerWidth <= LARGE_MOBILE_WIDTH) {
      if (displayPopUp) {
        setDisplayModal(true);
      }
    } else {
      setDisplayModal(true);
    }
  };

  return (
    <>
      <Calendar
        dateCellRender={(value) =>
          dateCellRender(value, events, eventColors, onEventClick, currentTimezone)
        }
        onSelect={(value) => {
          if (window.innerWidth <= LARGE_MOBILE_WIDTH) {
            const dayEvents = filterDataByDay(value, events, currentTimezone);
            setCurrentDateEvents(dayEvents);
            setDisplayPopUp(true);
          }
        }}
      />
      {displayModal && (
        <ModalInfo
          {...{ ...eventDescription, displayModal, setDisplayModal, eventColors, currentTimezone }}
        />
      )}
      {displayPopUp && (
        <EventPopUp
          currentDateEvents={currentDateEvents}
          displayPopUp={displayPopUp}
          onEventClick={onEventClick}
          setDisplayPopUp={setDisplayPopUp}
          displayModal={displayModal}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ events, eventColors, currentTimezone }) => ({
  events,
  eventColors,
  currentTimezone,
});

export default connect(mapStateToProps)(CalendarContainer);
