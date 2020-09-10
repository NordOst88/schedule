import React, { useState } from 'react';
import { DatePicker, Table, Form, Menu, Dropdown, Checkbox } from 'antd';
import { TableOutlined, DownOutlined } from '@ant-design/icons';
import columns from './columns';
import { dateFormat } from './constants';
import dummyData from './dummyData';
import { onDateChange, onDateOk } from './helpers';
import './Table.scss';
import 'antd/dist/antd.css';

const MyTable = () => {
  const [columnsToView, setColumnsToView] = useState(columns);
  const currentDate = Math.floor(new Date('2020-09-06T17:30').getTime() / 1000);

  const columnSelectHandler = (column, checked) => {
    if (!checked) {
      setColumnsToView([...columnsToView].filter((item) => item !== column));
    } else {
      const idx = columns.indexOf(column);
      setColumnsToView([...columnsToView.slice(0, idx), column, ...columnsToView.slice(idx)]);
    }
  };

  const checkSetter = (column) => columnsToView.includes(column);

  const menu = (cols) => (
    <Menu>
      {cols.map((column) => (
        <Menu.Item key={column.key}>
          <Checkbox
            checked={checkSetter(column)}
            onChange={({ target }) => columnSelectHandler(column, target.checked)}
          >
            {column.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Form layout="inline" style={{ marginBottom: 16, marginTop: 16 }}>
        <Form.Item label="Date Picker">
          <DatePicker showTime onChange={onDateChange} onOk={onDateOk} format={dateFormat} />
        </Form.Item>
        <Form.Item style={{ cursor: 'pointer' }}>
          <Dropdown overlay={menu(columns)} arrow>
            <span>
              <TableOutlined /> Select Column <DownOutlined />
            </span>
          </Dropdown>
        </Form.Item>
      </Form>
      <Table
        rowClassName={(record) => {
          if (+record.dateTime < currentDate) {
            return 'expired-date';
          }
          return null;
        }}
        dataSource={dummyData}
        columns={columnsToView}
        rowKey="id"
        size="small"
        pagination={false}
      />
    </>
  );
};

export default MyTable;
