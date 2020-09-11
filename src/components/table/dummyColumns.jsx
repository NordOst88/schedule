import React from 'react';
import { Tag, Space, Tooltip, Divider } from 'antd';
import extractDateTime from '../../utils/extractDateTime';
import { colorSelector, getOrganizer, getAvatarSrc } from './helpers';

const columns = [
  {
    title: 'Date',
    dataIndex: 'dateTime',
    key: 'date',
    render: (date) => <>{extractDateTime(date)}</>,
    sorter: (a, b) => a.dateTime - b.dateTime,
  },
  {
    title: 'Time',
    dataIndex: 'dateTime',
    key: 'time',
    render: (time) => <>{extractDateTime(time, 'time')}</>,
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (time) => <>{extractDateTime(time, 'dateTime')}</>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          const color = colorSelector(tag);
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
  {
    title: 'Links',
    dataIndex: 'links',
    key: 'links',
    render: (links) => (
      <>
        {links.map(({ name, url }, idx) => (
          <a
            href={url}
            target="_blanc"
            style={{
              whiteSpace: 'nowrap',
            }}
            key={name}
          >
            {name}
            {idx !== links.length - 1 ? (
              <Divider style={{ backgroundColor: '#757575' }} type="vertical" />
            ) : null}
          </a>
        ))}
      </>
    ),
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
    render: (organizers) => (
      <>
        {organizers.map((id) => {
          const { name, url } = getOrganizer(id);
          return (
            <Space key={name}>
              <img
                src={getAvatarSrc(url)}
                style={{
                  height: '24px',
                  width: '24px',
                  borderRadius: '12px',
                }}
                alt="avatar"
              />
              <a
                href={url}
                target="_blanc"
                style={{
                  marginRight: '8px',
                }}
              >
                {name}
              </a>
            </Space>
          );
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
