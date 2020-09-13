import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Table, Form } from 'antd';
import columns from './columns';
import { dateFormat, columnsList } from '../../constants/tableConstants';
import {
  onDateChange,
  onDateOk,
  filterColumns,
  addColumnKey,
  removeColumnKey,
  addClassByCurrentDate,
} from '../../utils/tableHelpers';
import './Table.scss';
import ColumnSelector from './ColumnSelector';

const TableContainer = ({ events }) => {
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : '';
  const selectedColumns = storage.tableColumnsSelected
    ? JSON.parse(storage.tableColumnsSelected)
    : columnsList;
  const filteredColumns = filterColumns(columns, selectedColumns);
  const [visibleColumns, setColumnsToView] = useState(filteredColumns);

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

  return (
    <>
      <Form layout="inline" style={{ marginBottom: 16, marginTop: 16 }}>
        <Form.Item label="Date Picker">
          <DatePicker showTime onChange={onDateChange} onOk={onDateOk} format={dateFormat} />
        </Form.Item>
        <Form.Item style={{ cursor: 'pointer' }}>
          <ColumnSelector {...{ visibleColumns, columnSelectHandler }} />
        </Form.Item>
      </Form>
      <Table
        rowClassName={addClassByCurrentDate}
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
