import React from 'react';
import {
  DatePicker, Table, Tag, Space,
} from 'antd';
import dummyData from './dummyData';
import extractDateTime from '../../utils/extractDateTime';
import './Table.scss';
import 'antd/dist/antd.css';

const MyTable = () => {
  const { Column } = Table;

  const dateFormat = 'DD.MM.YYYY HH:mm';

  const getTimeStamp = (value) => {
    const timestamp = Math.floor((new Date(value)).getTime());
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

  return (
    <>
      <Table dataSource={dummyData} rowKey="id">
        <Column
          title="Date"
          dataIndex="dateTime"
          key="date"
          render={(date) => (
            <>
              {extractDateTime(date)}
            </>
          )}
        />
        <Column
          title="Time"
          dataIndex="dateTime"
          key="time"
          render={(time) => (
            <>
              {extractDateTime(time, 'time')}
            </>
          )}
        />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={(tags) => (
            <>
              {tags.map((tag) => {
                const color = tag === 'deadline' ? 'red' : 'green';
                return (
                  <Tag color={color} key={tag}>
                    {tag}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column title="Place" dataIndex="place" key="place" />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(name, record) => (
            <a href={record.descriptionUrl} target="_blanc">{ name }</a>
          )}
        />
        <Column title="Broadcast Url" dataIndex="broadcastUrl" key="broadcastUrl" />
        <Column
          title="Organizer"
          dataIndex="organizer"
          key="organizer"
          render={(org) => {
            const regex = /[A-Za-z0-9-_]*$/;
            const name = org.match(regex);
            return (
              <Space>
                <img
                  src={`https://github.com/${name}.png?size=48`}
                  style={{ height: '24px', width: '24px', borderRadius: '12px' }}
                  alt="avatar"
                />
                <a href={org} target="_blanc">{ name }</a>
              </Space>
            );
          }}
        />
        <Column title="Details Url" dataIndex="detailsUrl" key="detailsUrl" />
        <Column title="Comment" dataIndex="comment" key="comment" />
      </Table>
      <DatePicker
        showTime
        onChange={onChange}
        onOk={onOk}
        format={dateFormat}
      />
    </>
  );
};

export default MyTable;
