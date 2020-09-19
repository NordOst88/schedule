/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
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
import ModalAddEvent from '../table-controls/ModalAddEvent';

const api = new SwaggerService();

const TableContainer = ({ events, currentTimezone, eventColors, tableEditMode }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
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

  const updateEvent = (event) => {
    console.log(event);
  };

  const openModal = (id, record) => {
    setDisplayModal(true);
    setSelectedEvent(record);
  };

  const editColumn = {
    title: () => <EditTwoTone />,
    dataIndex: 'id',
    key: 'id',
    render: (id, record) => (
      <Button
        type="dashed"
        size="small"
        icon={<EditTwoTone />}
        onClick={() => openModal(id, record)}
      />
    ),
    align: 'center',
  };

  return (
    <>
      <Form layout="inline" style={{ marginBottom: 16, marginTop: 16 }}>
        <Form.Item style={{ cursor: 'pointer' }}>
          <ColumnSelector {...{ visibleColumns, columnSelectHandler, columns }} />
        </Form.Item>
      </Form>
      <Table
        rowClassName={addClassByCurrentDate}
        dataSource={events}
        columns={tableEditMode ? [editColumn, ...visibleColumns] : visibleColumns}
        rowKey="id"
        size="small"
        pagination={false}
      />
      <ModalAddEvent {...{ setDisplayModal, displayModal, selectedEvent, updateEvent, api }} />
    </>
  );
};

const mapStateToProps = ({ events, currentTimezone, eventColors, tableEditMode }) => ({
  eventColors,
  events,
  currentTimezone,
  tableEditMode,
});

export default connect(mapStateToProps)(TableContainer);
