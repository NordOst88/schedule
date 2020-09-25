import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import createColumns from './createColumns';
import TableEditor from '../table-editor';
import popupMessage from '../popup-message';
import ModalEvent from '../modal-event';
import ColumnSelector from './ColumnSelector';
import ModalSpinner from '../modal-spinner';
import {
  COLUMNS_LIST,
  SUCCESS_FETCH_MSG,
  SUCCESS_UPDATE_EVENT,
  SUCCESS_DELETE_EVENT,
  ERROR_FETCH_MSG,
} from '../../constants/tableConstants';
import {
  MODAL_ADD_EVENT_TEXT,
  MENTOR,
  TABLE,
  TIPS_TEXT,
  DEFAULT_FONT_SIZE,
} from '../../constants/constants';
import {
  filterColumns,
  addColumnKey,
  removeColumnKey,
  addClassByCurrentDate,
  formatEventForFetch,
} from '../../utils/tableHelpers';
import getFontSize from '../../utils/getFontSize';
import './Table.scss';

const api = new SwaggerService();
const { editEvent } = MODAL_ADD_EVENT_TEXT;

const TableContainer = ({
  selectedEvents,
  currentTimezone,
  eventColors,
  tableEditMode,
  onFetch,
  currentView,
  role,
  fontSize,
}) => {
  const { onUpdateEvent, onDeleteEvent } = TIPS_TEXT;
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [spinnerTip, setSpinnerTip] = useState(onUpdateEvent);
  const columns = createColumns(currentTimezone, eventColors);
  const textSize = getFontSize(fontSize, 1.7);

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

  const fetchUpdateEvent = (event) => {
    setLoading(true);
    if (spinnerTip !== onUpdateEvent) {
      setSpinnerTip(onUpdateEvent);
    }
    api
      .updateEventById(event.id, event)
      .then(() => {
        api.getAllEvents().then((events) => {
          onFetch(events);
          setLoading(false);
          popupMessage({ ...SUCCESS_FETCH_MSG, ...SUCCESS_UPDATE_EVENT });
        });
      })
      .catch((error) => {
        setLoading(false);
        popupMessage({
          ...ERROR_FETCH_MSG,
          message: error.name,
          description: error.message,
          callbacksArg: event,
          callback: fetchUpdateEvent,
        });
      });
  };

  const updateEvent = (event) => {
    const updatableEvent = formatEventForFetch(event);
    fetchUpdateEvent(updatableEvent);
    setDisplayModal(false);
  };

  const fetchDeleteEvent = async (id) => {
    setDisplayModal(false);
    if (spinnerTip !== onDeleteEvent) {
      setSpinnerTip(onDeleteEvent);
    }
    setLoading(true);
    try {
      await api.deleteEventById(id);
      const events = await api.getAllEvents();
      onFetch(events);
      popupMessage({ ...SUCCESS_FETCH_MSG, ...SUCCESS_DELETE_EVENT });
    } catch (e) {
      popupMessage({
        ...ERROR_FETCH_MSG,
        message: e.name,
        description: e.message,
      });
    }
    setLoading(false);
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
    <div className="table-wrap" style={{ overflowX: 'auto', height: '85vh' }}>
      {loading && <ModalSpinner displaySpinner={loading} tip={spinnerTip} />}
      <Form layout="inline" style={{ marginBottom: 16, marginTop: 16 }}>
        <Form.Item style={{ cursor: 'pointer' }}>
          <ColumnSelector
            {...{ visibleColumns, columnSelectHandler, columns, fontSize: textSize }}
          />
        </Form.Item>
        {role === MENTOR && currentView === TABLE && (
          <Form.Item style={{ cursor: 'pointer' }}>
            <TableEditor fontSize={textSize} />
          </Form.Item>
        )}
      </Form>
      <Table
        rowClassName={addClassByCurrentDate}
        dataSource={selectedEvents}
        columns={
          tableEditMode && role === MENTOR ? [editColumn, ...visibleColumns] : visibleColumns
        }
        rowKey="id"
        size={fontSize === DEFAULT_FONT_SIZE ? 'small' : 'middle'}
        pagination={false}
      />
      {displayModal && (
        <ModalEvent
          {...{
            setDisplayModal,
            setLoading,
            displayModal,
            selectedEvent,
            updateEvent,
            fetchDeleteEvent,
            api,
            title: editEvent,
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  selectedEvents,
  currentTimezone,
  eventColors,
  tableEditMode,
  onFetch,
  role,
  currentView,
  fontSize,
}) => ({
  eventColors,
  selectedEvents,
  currentTimezone,
  tableEditMode,
  onFetch,
  role,
  currentView,
  fontSize,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableContainer);
