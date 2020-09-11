import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Badge, Calendar } from 'antd';

import { VIEW_MODES, COLOR_PRESET } from '../../constants/constants';

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

export function dateCellRender(value, data, colors) {
  const listData = getListData(value, data, colors);

  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.name} id={item.id} onClick={() => console.log(item)}>
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
const CalendarContainer = ({ events }) => (
  <Calendar dateCellRender={(value) => dateCellRender(value, events, COLOR_PRESET)} />
);

const mapStateToProps = ({ events }) => ({
  events,
});

export default connect(mapStateToProps)(CalendarContainer);
