import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import {
  onSetEvents,
  onSetSelectedItems,
  onSetSelectedItemsVisibility,
} from '../../actions/actions';

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
  HIDE_SELECTED_ITEMS_BUTTON_TEXT,
  SHOW_SELECTED_ITEMS_BUTTON_TEXT,
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

import { hideSelectedItems, showSelectedItems } from '../../utils/hideSelectedItems';

const api = new SwaggerService();
const { editEvent } = MODAL_ADD_EVENT_TEXT;

/**
 * Function that calls onSetEvents action.
 * @callback onFetchCallback
 * @param {Array} events - Current events.
 */

/**
 * Function that calls onSetSelectedItems action.
 * @callback onSelectItemCallback
 * @param {Object} selectedRow - Current events.
 */

/**
 * Function that calls onSetSelectedItemsVisibility action.
 * @callback setSelectItemVisibility
 * @param {boolean} - set visibility state to selected rows.
 */

/**
 * Component that showing the table with events.
 * @component
 * @param {Object} wrapper - Arguments wrapper.
 * @param {Array} wrapper.selectedEvents - List of selected events.
 * @param {string} wrapper.currentTimezone - Current timezone.
 * @param {Object} wrapper.eventColors - List of task type names and its colors.
 * @param {boolean} wrapper.tableEditMode - Edit table mode (true|false).
 * @param {onFetchCallback} wrapper.onFetch - Calls onSetEvents action.
 * @param {string} wrapper.currentView - Current app view. Сould be 'Table', 'List' or 'Calendar'.
 * @param {string} wrapper.role - Current user's role. Сould be 'Mentor' or 'Student'.
 * @param {number} wrapper.fontSize - Selected font size from redux store.
 * @param {onSelectItemCallback} wrapper.onSelectItem - Calls onSetSelectedItems action.
 * @param {Array} wrapper.selectedRowKeys - Keys list of selected rows.
 * @param {boolean} wrapper.isHiddenRowKeys - Is hidden rows (true|false).
 * @param {setSelectItemVisibility} wrapper.setSelectItemVisibility - Set visibility state to selected rows.
 */
const TableContainer = ({
  selectedEvents,
  currentTimezone,
  eventColors,
  tableEditMode,
  onFetch,
  currentView,
  role,
  fontSize,
  onSelectItem,
  selectedRowKeys,
  isHiddenRowKeys,
  setSelectItemVisibility,
}) => {
  const { onUpdateEvent, onDeleteEvent } = TIPS_TEXT;
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [spinnerTip, setSpinnerTip] = useState(onUpdateEvent);
  const columns = createColumns(currentTimezone, eventColors);
  const [selectedItems, setItem] = useState(selectedRowKeys);

  /**
   * Selecting event by clicking with shift on table row
   * @param {object} event event of click
   */
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

  /**
   * Selecting Events by clicking on checkbox
   * @param {object} selectedRow object of Selected Row keys of table
   */
  const onSelectChange = (selectedRow) => {
    setItem(selectedRow);
    onSelectItem(selectedRow);
  };

  const rowSelection = {
    onChange: onSelectChange,
    selectedRowKeys: selectedItems,
  };

  /**
   * Make Selected Event invisible by clicking on Hide Events button
   */
  const onHideButtonClick = () => {
    if (selectedItems.length) {
      setSelectItemVisibility(true);
    }
    hideSelectedItems(selectedItems);
  };

  /**
   * Make Selected Event visible by clicking on Show Hidden Events button
   */
  const onShowButtonClick = () => {
    setSelectItemVisibility(false);
    showSelectedItems(selectedItems);
  };
  const textSize = `${getFontSize(fontSize, 1.7)}`;
  const btnsStyles = {
    fontSize: textSize,
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
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

  /**
   * Function that calls api methods for manipulating event on backend.
   * Aslo its set loader, catch errors and show notification with fetch results.
   * @param {Object} event - Current event.
   */
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

  /**
   * Function that format event, calls fetchUpdateEvent and hide modal.
   * @param {Object} event - Current event.
   */
  const updateEvent = (event) => {
    const updatableEvent = formatEventForFetch(event);
    fetchUpdateEvent(updatableEvent);
    setDisplayModal(false);
  };

  /**
   * Function that calls api methods for manipulating event on backend.
   * Aslo its set loader, catch errors and show notification with fetch results.
   * @param {Object} event - Current event.
   */
  const fetchDeleteEvent = async (id) => {
    setDisplayModal(false);
    if (spinnerTip !== onDeleteEvent) {
      setSpinnerTip(onDeleteEvent);
    }
    setLoading(true);
    try {
      await api.deleteEventById(id);
      setTimeout(async () => {
        const events = await api.getAllEvents();
        onFetch(events);
        popupMessage({ ...SUCCESS_FETCH_MSG, ...SUCCESS_DELETE_EVENT });
      }, 1000);
    } catch (e) {
      popupMessage({
        ...ERROR_FETCH_MSG,
        message: e.name,
        description: e.message,
      });
    }
    setLoading(false);
  };

  /**
   * Function that open modal.
   * @param {Object} record - Current event.
   */

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
            <TableEditor style={btnsStyles} />
          </Form.Item>
        )}
        <Button type="dashed" style={btnsStyles} onClick={onHideButtonClick}>
          {HIDE_SELECTED_ITEMS_BUTTON_TEXT}
        </Button>
        <Button type="dashed" style={btnsStyles} className="marginLeft" onClick={onShowButtonClick}>
          {SHOW_SELECTED_ITEMS_BUTTON_TEXT}
        </Button>
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
  fontSize,
  selectedRowKeys,
  isHiddenRowKeys,
});

export default connect(mapStateToProps, {
  onFetch: onSetEvents,
  onSelectItem: onSetSelectedItems,
  setSelectItemVisibility: onSetSelectedItemsVisibility,
})(TableContainer);
