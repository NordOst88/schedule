import React, { useState } from 'react';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
import { Badge, Calendar } from 'antd';

import ModalInfo from '../modal-info/modal-info';
import { filterDataByDay, getListData } from '../../utils/calendarHelpers';
import EventPopUp from './eventPopUp';
import {
  INACTIVE_EVENT_TYPE,
  INACTIVE_EVENT_COLOR,
  MILLISECONDS,
} from '../../constants/calendarConstants';

const dateCellRender = (value, events, eventColors, onEventClick) => {
  const listData = getListData(value, events, eventColors);

  return (
    <ul
      className="events"
      style={{
        margin: '0',
        padding: '0',
        listStyle: 'none',
      }}
    >
      {listData.map((item) => {
        const { dateTime, name, color, id } = item;
        const activeEvent = Date.now() > new Date(+dateTime * MILLISECONDS);
        const textType = activeEvent ? INACTIVE_EVENT_TYPE : null;

        return (
          <li key={name} id={id} onClick={() => onEventClick(item)}>
            <Badge
              color={color}
              text={name}
              style={{ color: textType ? INACTIVE_EVENT_COLOR : color }}
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
    setDisplayModal(true);
  };

  return (
    <>
      <Calendar
        dateCellRender={(value) => dateCellRender(value, events, eventColors, onEventClick)}
        onSelect={(value) => {
          const dayEvents = filterDataByDay(value, events);
          setCurrentDateEvents(dayEvents);
          setDisplayPopUp(true);
        }}
      />
      {displayModal && (
        <ModalInfo
          {...{ ...eventDescription, displayModal, setDisplayModal, eventColors, currentTimezone }}
        />
      )}
      {displayPopUp && (
        <EventPopUp
          currentEvents={currentDateEvents}
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
