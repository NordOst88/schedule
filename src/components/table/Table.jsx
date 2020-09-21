import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button, Typography } from 'antd';
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

import { hideItems, viewItems } from '../../utils/hideSelectedItems';

const { Text } = Typography;

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

  const handleRowClick = (e) => {
    if (e.shiftKey === true) {
      const target = e.target.closest('tr[data-row-key]');
      if (e.target.closest('tr[data-row-key]')) {
        const rowKey = target.getAttribute('data-row-key');
        const id = selectedItems.indexOf(`${rowKey}`);
        if (!selectedItems.includes(`${rowKey}`)) {
          setItem([...selectedItems, `${rowKey}`]);
          onSelectItem([...selectedItems, `${rowKey}`]);
        } else {
          const before = selectedItems.slice(0, id);
          const after = selectedItems.slice(id + 1);
          setItem([...before, ...after]);
          onSelectItem([...selectedItems, `${rowKey}`]);
        }
      }
    }
  };

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
          className="marginLeft"
          onClick={() => {
            setVisibility(false);
            viewItems(selectedItems);
          }}
        >
          Show Hidden Items
        </Button>
        <Text strong underline className="marginLeft typography">
          {isHiddenRowKeys === true ? 'Hidden items: ' : 'Selected Items: '} {selectedItems.length}
        </Text>
      </Form>
      <Table
        // hideItem
        onRow={() => {
          return {
            onClick: (e) => handleRowClick(e),
          };
        }}
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
