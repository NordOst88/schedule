import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Table, Form, Button } from 'antd';
import createColumns from './createColumns';
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

import { selection, unselected } from '../../utils/itemSelection';

const TableContainer = ({ events, currentTimezone, eventColors }) => {
  //  selection
  const [i, setI] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setI({ selectedRowKeys });
  };

  const rowSelection = {
    i,
    onChange: onSelectChange,
  };

  const columns = createColumns(currentTimezone, eventColors);

  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : '';
  const selectedColumns = storage.tableColumnsSelected
    ? JSON.parse(storage.tableColumnsSelected)
    : columnsList;

  let filteredColumns = filterColumns(columns, selectedColumns);
  const [visibleColumns, setVisibleColumns] = useState(filteredColumns);
  useEffect(() => {
    filteredColumns = filterColumns(columns, selectedColumns);
    setVisibleColumns(filteredColumns);
  }, [currentTimezone, eventColors]);

  const columnSelectHandler = (column, checked) => {
    const idx = columns.indexOf(column);
    if (!checked) {
      removeColumnKey(selectedColumns, column, idx);
      setVisibleColumns([...visibleColumns.slice(0, idx), {}, ...visibleColumns.slice(idx + 1)]);
    } else {
      addColumnKey(selectedColumns, column);
      setVisibleColumns([
        ...visibleColumns.slice(0, idx),
        column,
        ...visibleColumns.slice(idx + 1),
      ]);
    }
  };

  return (
    <>
      <Form layout="inline" style={{ marginBottom: 16, marginTop: 16 }}>
        <Form.Item label="Date Picker">
          <DatePicker showTime onChange={onDateChange} onOk={onDateOk} format={dateFormat} />
        </Form.Item>
        <Form.Item style={{ cursor: 'pointer' }}>
          <ColumnSelector {...{ visibleColumns, columnSelectHandler, columns }} />
        </Form.Item>
        <Button type="primary" onClick={() => selection(i)}>
          Hide items
        </Button>
        <Button
          type="primary"
          className="button-margin"
          onClick={() => {
            unselected(i);
          }}
        >
          Show Items
        </Button>
      </Form>
      <Table
        rowSelection={rowSelection}
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

const mapStateToProps = ({ events, currentTimezone, eventColors }) => ({
  eventColors,
  events,
  currentTimezone,
});

export default connect(mapStateToProps)(TableContainer);
