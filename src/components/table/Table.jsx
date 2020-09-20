import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import sortByDateTime from '../../utils/sortByDateTime';
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
import getTimeStamp from '../../utils/getTimeStamp';
import convertArrayToObject from '../../utils/convertArrayToObject';
import { MODAL_INFO_TEXT, MODAL_ADD_EVENT_TEXT } from '../../constants/constants';
import ModalSpinner from '../modal-spinner';

const api = new SwaggerService();
const { noInfo } = MODAL_INFO_TEXT;
const { editEvent } = MODAL_ADD_EVENT_TEXT;

const TableContainer = ({ events, currentTimezone, eventColors, tableEditMode, onFetch }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = useState(false);
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

  const fetchToBackend = (event) => {
    setLoading(true);
    api.updateEventById(event.id, event).then(() => {
      api.getAllEvents().then((evnts) => {
        const formattedData = sortByDateTime(evnts);
        onFetch(formattedData);
        setLoading(false);
      });
    });
  };

  const updateEvent = ({
    week,
    dateTime,
    deadline,
    type = [noInfo],
    place = noInfo,
    estimatedTime = noInfo,
    name = noInfo,
    descriptionUrl = noInfo,
    description = noInfo,
    links,
    selectedOrganizers = [noInfo],
    comment = noInfo,
  }) => {
    const newEvent = {
      week: `${week}`,
      dateTime: `${getTimeStamp(dateTime)}`,
      deadline: `${getTimeStamp(deadline)}`,
      type,
      place,
      estimatedTime,
      timeZone: '',
      name,
      descriptionUrl,
      description,
      links: convertArrayToObject(links),
      organizer: selectedOrganizers.map((item) => item.id),
      comment,
    };
    fetchToBackend(newEvent);
    setDisplayModal(false);
  };

  const openModal = (record) => {
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
        key={id}
        onClick={() => openModal(record)}
      />
    ),
    align: 'center',
  };

  return (
    <>
      <ModalSpinner displaySpinner={loading} tip="Updating Event" />
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
      <ModalAddEvent
        {...{ setDisplayModal, displayModal, selectedEvent, updateEvent, api }}
        title={editEvent}
      />
    </>
  );
};

const mapStateToProps = ({ events, currentTimezone, eventColors, tableEditMode, onFetch }) => ({
  eventColors,
  events,
  currentTimezone,
  tableEditMode,
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableContainer);
