/* eslint-disable no-console */
import React from 'react';
import { DatePicker, Table, Form, Menu, Dropdown, Checkbox } from 'antd';
import { TableOutlined, DownOutlined } from '@ant-design/icons';
import columns from './columns';
import { dateFormat } from './constants';
import dummyData from './dummyData';
import { onDateChange, onDateOk } from './helpers';
import './Table.scss';
import 'antd/dist/antd.css';

const MyTable = () => {
  const menu = (cols) => (
    <Menu>
      {cols.map((column) => (
        <Menu.Item key={column.key}>
          <Checkbox>{column.title}</Checkbox>
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
        <Form.Item>
          <Dropdown overlay={menu(columns)}>
            <span>
              <TableOutlined /> Select Column <DownOutlined />
            </span>
          </Dropdown>
        </Form.Item>
      </Form>
      <Table dataSource={dummyData} columns={columns} rowKey="id" size="small" pagination={false} />
    </>
  );
};

export default MyTable;
