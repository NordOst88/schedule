import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Table, Form, Menu, Dropdown, Checkbox } from 'antd';
import { TableOutlined, DownOutlined } from '@ant-design/icons';
import columns from './columns';
import { dateFormat, columnsList } from '../../constants/tableConstants';
import {
  onDateChange,
  onDateOk,
  filterColumns,
  addColumnKey,
  removeColumnKey,
} from '../../utils/tableHelpers';
import './Table.scss';

const TableContainer = ({ events }) => {
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : '';
  const selectedColumns = storage.tableColumnsSelected
    ? JSON.parse(storage.tableColumnsSelected)
    : columnsList;
  const filteredColumns = filterColumns(columns, selectedColumns);
  const [visibleColumns, setColumnsToView] = useState(filteredColumns);
  const currentDate = Date.now() / 1000;

  const columnSelectHandler = (column, checked) => {
    const idx = columns.indexOf(column);
    if (!checked) {
      removeColumnKey(selectedColumns, column, idx);
      setColumnsToView([...visibleColumns].filter((item) => item !== column));
    } else {
      addColumnKey(selectedColumns, column);
      setColumnsToView([...visibleColumns.slice(0, idx), column, ...visibleColumns.slice(idx)]);
    }
  };

  const checkSetter = (column) => visibleColumns.includes(column);

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
        dataSource={events}
        columns={visibleColumns}
        rowKey="id"
        size="small"
        pagination={false}
      />
    </>
  );
};

const mapStateToProps = ({ events }) => ({
  events,
});

export default connect(mapStateToProps)(TableContainer);
