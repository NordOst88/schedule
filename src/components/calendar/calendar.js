import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Badge, Calendar } from 'antd';

const onEventClick = (eventName) => {
  // todo: show modal
  console.log('onEventClick', eventName);
};

const compareDates = (moment, eventDate) => {
  /* console.log(eventDate);
  console.log(moment); */
  const isSameDay = moment.date() === eventDate.getDate();
  const isSameMonth = moment.month() === eventDate.getMonth();
  const isSameYear = moment.year() === eventDate.getFullYear();
  // console.log(isSameDay && isSameMonth && isSameYear);
  return isSameDay && isSameMonth && isSameYear;
};

const filterDataByDay = (value, events) => {
  return events.filter((obj) => {
    const eventDate = new Date(+obj.dateTime * 1000);
    return compareDates(value, eventDate);
  });
};

function getListData(value, events, eventColors) {
  // console.log(events);
  const currentData = filterDataByDay(value, events);

  if (!currentData.length) {
    return [];
  }

  // console.log('data', currentData);

  return currentData.map((obj) => {
    const copyObj = obj;
    // todo to lowerCase
    const color = eventColors[copyObj.type[0]];
    copyObj.color = color;
    return copyObj;
  });
}

export function dateCellRender(value, events, eventColors) {
  const listData = getListData(value, events, eventColors);
  // todo 1000 to constants
  // todo colors to constants
  return (
    <ul className="events">
      {listData.map((item) => {
        const activeEvent = Date.now() > new Date(+item.dateTime * 1000);
        const textType = activeEvent ? 'secondary' : null;

        return (
          <li key={item.name} id={item.id} onClick={() => onEventClick(item)}>
            <Badge
              color={item.color}
              text={item.name}
              style={{ color: textType ? '#00000073' : '#faad14' }}
            />
          </li>
        );
      })}
    </ul>
  );
}

const CalendarContainer = ({ events, eventColors }) => (
  <Calendar
    dateCellRender={(value) => dateCellRender(value, events, eventColors)}
    onSelect={(value) => {
      console.log(filterDataByDay(value, events));
    }}
  />
);

const mapStateToProps = ({ events, eventColors }) => ({
  events,
  eventColors,
});

export default connect(mapStateToProps)(CalendarContainer);
