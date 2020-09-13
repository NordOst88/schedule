import React from 'react';
import { Tooltip, Typography } from 'antd';
import Type from '../task-type';
import Links from '../links';
import Organizer from '../organizer';
import getFormattedDate from '../../utils/getFormattedDate';
import store from '../../store';
import { tagsName } from '../../constants/tableConstants';

const { eventColors } = store.getState();
const { Link } = Typography;

const EllipsedText = (text) => (
  <Tooltip placement="topLeft" title={text}>
    <div
      style={{
        width: 200,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  </Tooltip>
);

const columns = [
  {
    title: 'Date',
    dataIndex: 'dateTime',
    key: 'date',
    render: (date) => <>{getFormattedDate(date).slice(0, 10)}</>,
    sorter: (a, b) => a.dateTime - b.dateTime,
  },
  {
    title: 'Time',
    dataIndex: 'dateTime',
    key: 'time',
    render: (time) => <>{getFormattedDate(time).slice(12)}</>,
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (deadline) => <>{getFormattedDate(deadline)}</>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => <Type {...{ type, eventColors, tagsName }} />,
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
  },
  {
    title: 'Estimated Time',
    dataIndex: 'estimatedTime',
    key: 'estimatedTime',
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => (
      <>
        <Link href={record.descriptionUrl} target="_blank">
          {name}
        </Link>
      </>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description) => EllipsedText(description),
  },
  {
    title: 'Links',
    dataIndex: 'links',
    key: 'links',
    render: (links) => <Links {...{ links }} />,
    align: 'center',
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
    render: (organizer) => <Organizer {...{ organizer }} />,
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    render: (comment) => EllipsedText(comment),
  },
];

export default columns;
