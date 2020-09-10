import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Badge, Calendar } from 'antd';

import { VIEW_MODES, COLOR_PRESET } from '../../constants/constants';
import { onEventClick } from '../../actions/actions';

const compareDates = (moment, eventDate) => {
  const isSameDay = moment.date() === eventDate.getDate();
  const isSameMonth = moment.month() === eventDate.getMonth();
  const isSameYear = moment.year() === eventDate.getFullYear();

  return isSameDay && isSameMonth && isSameYear;
};

function getListData(value, data, colors) {
  const currentData = data.filter((obj) => {
    const eventDate = new Date(+obj.dateTime);
    return compareDates(value, eventDate);
  });

  if (!currentData.length) {
    return [];
  }

  return currentData.map((obj) => {
    const color = colors[obj.type];
    return { type: obj.type, name: obj.name, id: obj.id, color };
  });
}

export function dateCellRender(value, data, colors, onClick) {
  const listData = getListData(value, data, colors);

  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.name} id={item.id} onClick={() => onClick(item)}>
          <Badge color={item.color} text={item.name} />
        </li>
      ))}
    </ul>
  );
}

/* function getMonthData(value) {
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
 */
const CalendarContainer = ({ currentView, data, onClick }) => {
  return currentView === VIEW_MODES[2] ? (
    <Calendar dateCellRender={(value) => dateCellRender(value, data, COLOR_PRESET, onClick)} />
  ) : null;
};

const mapStateToProps = ({ currentView, data }) => {
  return {
    currentView,
    data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (currentData) => dispatch(onEventClick(currentData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
