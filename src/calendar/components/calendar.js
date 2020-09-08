import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Badge, Calendar } from 'antd';

import { VIEW_MODES } from '../../constants/constants';

const compareDates = (moment, eventDate) => {
  const isSameDay = moment.date() === eventDate.getDate();
  const isSameMonth = moment.month() === eventDate.getMonth();
  const isSameYear = moment.year() === eventDate.getFullYear();

  return isSameDay && isSameMonth && isSameYear;
};

function getListData(value, data) {
  const currentData = data.filter((obj) => {
    const eventDate = new Date(+obj.dateTime);
    return compareDates(value, eventDate);
  });

  return currentData.map((obj) => {
    return { type: 'success', content: obj.name };
  });
}

export function dateCellRender(value, data) {
  const listData = getListData(value, data);

  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

export function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const CalendarContainer = ({ currentView, data }) => {
  console.log(data);
  return currentView === VIEW_MODES[2] ? (
    <Calendar dateCellRender={(value) => dateCellRender(value, data)} />
  ) : null;
};

const mapStateToProps = ({ currentView, data }) => {
  return {
    currentView,
    data,
  };
};

export default connect(mapStateToProps)(CalendarContainer);
