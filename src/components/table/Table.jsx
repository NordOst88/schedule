import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button, Typography } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import {
  onSetEvents,
  onSetSelectedItems,
  onSetSelectedItemsVisibility,
} from '../../actions/actions';
import sortByDateTime from '../../utils/sortByDateTime';
import createColumns from './createColumns';
import TableEditor from '../table-editor';
import popupMessage from '../popup-message';
import {
  COLUMNS_LIST,
  SUCCESS_FETCH_MSG,
  SUCCESS_UPDATE_EVENT,
  ERROR_FETCH_MSG,
} from '../../constants/tableConstants';
import {
  filterColumns,
  addColumnKey,
  removeColumnKey,
  addClassByCurrentDate,
  formatEventForFetch,
} from '../../utils/tableHelpers';
import './Table.scss';
import ColumnSelector from './ColumnSelector';
import ModalEvent from '../modal-event';
import {
  MODAL_ADD_EVENT_TEXT,
  MENTOR,
  TABLE,
  HIDDEN_EVENTS_TEXT,
  SELECTED_EVENTS_TEXT,
  HIDE_SELECTED_ITEMS_BUTTON_TEXT,
  SHOW_SELECTED_ITEMS_BUTTON_TEXT,
} from '../../constants/constants';
import ModalSpinner from '../modal-spinner';
import { hideSelectedItems, showSelectedItems } from '../../utils/hideSelectedItems';

const api = new SwaggerService();
const { editEvent } = MODAL_ADD_EVENT_TEXT;
const { Text } = Typography;

const TableContainer = ({
  selectedEvents,
  currentTimezone,
  eventColors,
  tableEditMode,
  onFetch,
  currentView,
  role,
  onSelectItem,
  selectedRowKeys,
  isHiddenRowKeys,
  setSelectItemVisibility,
}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const columns = createColumns(currentTimezone, eventColors);
  const [selectedItems, setItem] = useState(selectedRowKeys);

  const handleRowClick = (event) => {
    if (event.shiftKey) {
      if (event.target.closest('tr[data-row-key]')) {
        const target = event.target.closest('tr[data-row-key]');
        const rowKey = target.getAttribute('data-row-key');
        const id = selectedItems.indexOf(`${rowKey}`);
        if (!selectedItems.includes(`${rowKey}`)) {
          const newSelectedItems = [...selectedItems, `${rowKey}`];
          setItem(newSelectedItems);
          onSelectItem(newSelectedItems);
        } else {
          const before = selectedItems.slice(0, id);
          const after = selectedItems.slice(id + 1);
          const newSelectedItems = [...before, ...after];
          setItem(newSelectedItems);
          onSelectItem(newSelectedItems);
        }
      }
    }
  };

  useEffect(() => {
    if (isHiddenRowKeys) {
      hideSelectedItems(selectedItems);
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

  const onHideButtonClick = () => {
    if (selectedItems.length) {
      setSelectItemVisibility(true);
    }
    hideSelectedItems(selectedItems);
  };

  const onShowButtonClick = () => {
    setSelectItemVisibility(false);
    showSelectedItems(selectedItems);
  };

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
    api
      .updateEventById(event.id, event)
      .then(() => {
        api.getAllEvents().then((evnts) => {
          const formattedData = sortByDateTime(evnts);
          onFetch(formattedData);
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
      {loading && <ModalSpinner displaySpinner={loading} tip="Updating Event" />}
      <Form layout="inline" style={{ marginBottom: 16, marginTop: 16 }}>
        <Form.Item style={{ cursor: 'pointer' }}>
          <ColumnSelector {...{ visibleColumns, columnSelectHandler, columns }} />
        </Form.Item>
        {role === MENTOR && currentView === TABLE && (
          <Form.Item style={{ cursor: 'pointer' }}>
            <TableEditor />
          </Form.Item>
        )}
        <Button type="primary" onClick={onHideButtonClick}>
          {HIDE_SELECTED_ITEMS_BUTTON_TEXT}
        </Button>
        <Button type="primary" className="marginLeft" onClick={onShowButtonClick}>
          {SHOW_SELECTED_ITEMS_BUTTON_TEXT}
        </Button>
        <Text strong underline className="marginLeft typography">
          {isHiddenRowKeys && selectedItems.length ? HIDDEN_EVENTS_TEXT : SELECTED_EVENTS_TEXT}{' '}
          {selectedItems.length}
        </Text>
      </Form>
      <Table
        onRow={() => ({
          onClick: (event) => handleRowClick(event),
          style: {
            userSelect: 'none',
          },
        })}
        rowSelection={rowSelection}
        rowClassName={addClassByCurrentDate}
        dataSource={selectedEvents}
        columns={tableEditMode ? [editColumn, ...visibleColumns] : visibleColumns}
        rowKey="id"
        size="small"
        pagination={false}
      />
      {displayModal && (
        <ModalEvent
          {...{ setDisplayModal, displayModal, selectedEvent, updateEvent, api, title: editEvent }}
        />
      )}
    </>
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
  selectedRowKeys,
  isHiddenRowKeys,
}) => ({
  eventColors,
  selectedEvents,
  currentTimezone,
  tableEditMode,
  onFetch,
  role,
  currentView,
  selectedRowKeys,
  isHiddenRowKeys,
});

export default connect(mapStateToProps, {
  onFetch: onSetEvents,
  onSelectItem: onSetSelectedItems,
  setSelectItemVisibility: onSetSelectedItemsVisibility,
})(TableContainer);
