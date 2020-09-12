/* eslint-disable no-unused-vars */
import React from 'react';
import { Tag, Space, Tooltip, Divider } from 'antd';
import { getAvatarSrc } from './helpers';
import getEventColor from '../../utils/getEventColor';
import getFormattedDate from '../../utils/getFormattedDate';
import store from '../../store';

const { eventColors } = store.getState();

const columns = [
  {
    title: 'Date',
    dataIndex: 'dateTime',
    key: 'date',
    render: (date) => <>{getFormattedDate(date, 'date')}</>,
    sorter: (a, b) => a.dateTime - b.dateTime,
  },
  {
    title: 'Time',
    dataIndex: 'dateTime',
    key: 'time',
    render: (time) => <>{getFormattedDate(time, 'time')}</>,
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
    render: (tags) => (
      <>
        {tags.map((tag) => {
          const color = getEventColor(false, eventColors, tag);
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
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
        <a href={record.url} target="_blanc">
          {name}
        </a>
      </>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description) => (
      <Tooltip placement="topLeft" title={description}>
        <div
          style={{
            width: 200,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </div>
      </Tooltip>
    ),
  },
  // {
  //   title: 'Links',
  //   dataIndex: 'links',
  //   key: 'links',
  //   render: (links) => (
  //     <>
  //       {links.map((object, idx) => (
  //         <a
  //           href={Object.entries(object)[0][1]}
  //           target="_blanc"
  //           style={{
  //             whiteSpace: 'nowrap',
  //           }}
  //           key={Object.entries(object)[0][0]}
  //         >
  //           {Object.entries(object)[0][0]}
  //           {idx !== links.length - 1 ? (
  //             <Divider style={{ backgroundColor: '#757575' }} type="vertical" />
  //           ) : null}
  //         </a>
  //       ))}
  //     </>
  //   ),
  // },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
    render: (organizers) => (
      <>
        {organizers.map((obj) => {
          if (obj instanceof Object) {
            return (
              <Space key={obj.name}>
                <img
                  src={getAvatarSrc(obj.url)}
                  style={{
                    height: '24px',
                    width: '24px',
                    borderRadius: '12px',
                  }}
                  alt="avatar"
                />
                <a
                  href={obj.url}
                  target="_blanc"
                  style={{
                    marginRight: '8px',
                  }}
                >
                  {obj.name}
                </a>
              </Space>
            );
          }
          return null;
        })}
      </>
    ),
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    render: (comment) => (
      <Tooltip placement="topLeft" title={comment}>
        <div
          style={{
            width: 200,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {comment}
        </div>
      </Tooltip>
    ),
  },
];

export default columns;
