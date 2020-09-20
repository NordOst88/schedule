import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import sortByDateTime from '../../utils/sortByDateTime';
import ModalEvent from '../modal-event';
import { MODAL_ADD_EVENT_TEXT } from '../../constants/constants';
import TableEdit from '../table-edit';
import { formatEventForFetch } from '../../utils/tableHelpers';

const api = new SwaggerService();
const { addEvent } = MODAL_ADD_EVENT_TEXT;

const TableControls = ({ onFetch }) => {
  const [loading, setLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const fetchAddEvent = (event) => {
    setLoading(true);
    api.addEvent(event).then(() => {
      api.getAllEvents().then((events) => {
        const formattedData = sortByDateTime(events);
        onFetch(formattedData);
        setLoading(false);
      });
    });
  };

  const createNewEvent = (event) => {
    const newEvent = formatEventForFetch(event);
    fetchAddEvent(newEvent);
    setDisplayModal(false);
  };

  return (
    <Space>
      <Button
        type="dashed"
        disabled={loading}
        icon={<PlusOutlined spin={loading} />}
        onClick={() => setDisplayModal(true)}
      >
        Add event
      </Button>
      <TableEdit />
      <ModalEvent {...{ setDisplayModal, displayModal, createNewEvent, api }} title={addEvent} />
    </Space>
  );
};

const mapStateToProps = ({ onFetch }) => ({
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableControls);
