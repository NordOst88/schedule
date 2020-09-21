import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button } from 'antd';
import createColumns from './createColumns';
import { COLUMNS_LIST } from '../../constants/tableConstants';
import {
  filterColumns,
  addColumnKey,
  removeColumnKey,
  addClassByCurrentDate,
} from '../../utils/tableHelpers';
import './Table.scss';
import ColumnSelector from './ColumnSelector';

import { onSetSelectedItems, onSetVisibility } from '../../actions/actions';

import { hideItems, viewItems } from '../../utils/hideItem';

const TableContainer = ({
  events,
  currentTimezone,
  eventColors,
  onSelectItem,
  selectedRowKeys,
  isHiddenRowKeys,
  setVisibility,
}) => {
  // hideItem
  const [selectedItems, setItem] = useState(selectedRowKeys);

  useEffect(() => {
    if (isHiddenRowKeys === true) {
      hideItems(selectedItems);
    }
  }, []);

  const onSelectChange = (selectedRow) => {
    setItem(selectedRow);
    onSelectItem(selectedRow);
  };

  const rowSelection = {
    onChange: onSelectChange,
    selectedRowKeys: selectedItems,
  };

  const columns = createColumns(currentTimezone, eventColors);

  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : '';
  const selectedColumns = storage.tableColumnsSelected
    ? JSON.parse(storage.tableColumnsSelected)
    : COLUMNS_LIST;

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
        <Form.Item style={{ cursor: 'pointer' }}>
          <ColumnSelector {...{ visibleColumns, columnSelectHandler, columns }} />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            if (selectedItems !== 0) {
              setVisibility(true);
            }
            hideItems(selectedItems);
          }}
        >
          Hide Selected items
        </Button>
        <Button
          type="primary"
          className="button-margin"
          onClick={() => {
            setVisibility(false);
            viewItems(selectedItems);
          }}
        >
          Show Hidden Items
        </Button>
      </Form>
      <Table
        // hideItem
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

const mapStateToProps = ({
  events,
  currentTimezone,
  eventColors,
  selectedRowKeys,
  isHiddenRowKeys,
}) => ({
  eventColors,
  events,
  currentTimezone,
  selectedRowKeys,
  isHiddenRowKeys,
});

export default connect(mapStateToProps, {
  onSelectItem: onSetSelectedItems,
  setVisibility: onSetVisibility,
})(TableContainer);
