/* eslint-disable no-console */
import React from 'react';
import { DatePicker, Table, Tag, Space } from 'antd';
import dummyData from './dummyData';
import extractDateTime from '../../utils/extractDateTime';
import { colorSelector, getOrganizer, getAvatarSrc } from './helpers';
import './Table.scss';
import 'antd/dist/antd.css';

const MyTable = () => {
  const dateFormat = 'DD.MM.YYYY HH:mm';

  const getTimeStamp = (value) => {
    const timestamp = Math.floor(new Date(value).getTime());
    console.log(timestamp);
  };

  function onChange(value, dateString) {
    console.log('TimeStamp: ', value);
    getTimeStamp(dateString);
    console.log('Date and time: ', dateString);
  }

  function onOk(value) {
    console.log('Selected Time: ', value);
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'dateTime',
      key: 'date',
      render: (date) => <>{extractDateTime(date)}</>,
      sorter: (a, b) => a.dateTime - b.dateTime,
      // defaultSortOrder: 'ascend',
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
      width: 50,
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
    },
    {
      title: 'Links',
      dataIndex: 'links',
      key: 'links',
      render: (links) => (
        <>
          {links.map(({ name, url }) => (
            <a
              href={url}
              target="_blanc"
              style={{
                marginRight: '8px',
              }}
              key={name}
            >
              {name}
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
    },
  ];

  return (
    <>
      <Table dataSource={dummyData} columns={columns} rowKey="id" size="small" pagination={false} />
      <DatePicker showTime onChange={onChange} onOk={onOk} format={dateFormat} />
    </>
  );
};

export default MyTable;
