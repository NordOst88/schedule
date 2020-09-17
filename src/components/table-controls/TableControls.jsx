import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import sortByDateTime from '../../utils/sortByDateTime';
import ModalAddEvent from './ModalAddEvent';
import getTimeStamp from '../../utils/getTimeStamp';
import convertArrayToObject from '../../utils/convertArrayToObject';

const api = new SwaggerService();

const TableControls = ({ onFetch }) => {
  const [loading, setLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const addEventToBackend = (event) => {
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
    const newEvent = {
      week: `${event.week}`,
      dateTime: `${getTimeStamp(event.dateTime)}`,
      deadline: `${getTimeStamp(event.deadline)}`,
      type: event.type ? event.type.tags : [''],
      place: event.place || '',
      estimatedTime: event.estimatedTime || '',
      timeZone: '',
      name: event.name || '',
      descriptionUrl: event.descriptionUrl || '',
      description: event.description || '',
      links: convertArrayToObject(event.links),
      organizer: event.organizers ? event.organizers.organizers : [''],
      comment: event.comment || '',
    };
    addEventToBackend(newEvent);
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
        Add Event
      </Button>
      <ModalAddEvent {...{ setDisplayModal, displayModal, createNewEvent, api }} />
    </Space>
  );
};

const mapStateToProps = ({ onFetch }) => ({
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableControls);
