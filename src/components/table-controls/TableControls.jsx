import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import ModalEvent from '../modal-event';
import popupMessage from '../popup-message';
import { MODAL_ADD_EVENT_TEXT } from '../../constants/constants';
import {
  SUCCESS_FETCH_MSG,
  SUCCESS_ADD_EVENT,
  ERROR_FETCH_MSG,
} from '../../constants/tableConstants';
import { formatEventForFetch } from '../../utils/tableHelpers';
import sortByDateTime from '../../utils/sortByDateTime';

const api = new SwaggerService();
const { addEvent } = MODAL_ADD_EVENT_TEXT;

const TableControls = ({ onFetch, style }) => {
  const [loading, setLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const fetchAddEvent = (event) => {
    setLoading(true);
    api
      .addEvent(event)
      .then(() => {
        api.getAllEvents().then((events) => {
          const formattedData = sortByDateTime(events);
          onFetch(formattedData);
          setLoading(false);
          popupMessage({ ...SUCCESS_FETCH_MSG, ...SUCCESS_ADD_EVENT });
        });
      })
      .catch((error) => {
        setLoading(false);
        popupMessage({
          ...ERROR_FETCH_MSG,
          message: error.name,
          description: error.message,
          callbacksArg: event,
          callback: fetchAddEvent,
        });
      });
  };

  const createNewEvent = (event) => {
    const newEvent = formatEventForFetch(event);
    fetchAddEvent(newEvent);
    setDisplayModal(false);
  };

  return (
    <>
      <Button
        disabled={loading}
        icon={<PlusOutlined spin={loading} style={{ margin: '3px 0px 0px' }} />}
        onClick={() => setDisplayModal(true)}
        style={style}
      >
        Add event
      </Button>
      {displayModal && (
        <ModalEvent {...{ setDisplayModal, displayModal, createNewEvent, api, title: addEvent }} />
      )}
    </>
  );
};

const mapStateToProps = ({ onFetch }) => ({
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableControls);
