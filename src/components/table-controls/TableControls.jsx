/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import sortByDateTime from '../../utils/sortByDateTime';
import ModalAddEvent from './ModalAddEvent';
import getTimeStamp from '../../utils/getTimeStamp';

const api = new SwaggerService();

const TableControls = ({ onFetch }) => {
  const [loading, setLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const testEvent = {
    week: '13',
    dateTime: '1607035600',
    deadline: '1608681600',
    type: ['test'],
    place: 'Test',
    estimatedTime: '8h',
    timeZone: '',
    name: 'TEST',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
    description: 'TEST',
    links: {
      TEST: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/interview-corejs.md',
    },
    organizer: ['DVgluQnLGTg9ggTi6A4N'],
    comment: 'TEST',
  };

  const addEventHandler = () => {
    setLoading(true);
    api.addEvent(testEvent).then(() => {
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
      type: [event.type],
      place: '',
      estimatedTime: '',
      timeZone: '',
      name: event.name,
      descriptionUrl: event.descriptionUrl,
      description: event.description,
      links: {
        TEST: '',
      },
      organizer: [''],
      comment: event.comment,
    };
    console.log(newEvent);
  };

  const addEventFromModal = (event) => {
    console.log('TestEvent ====>', testEvent);
    console.log('Event ====>', event);
    createNewEvent(event);
    setDisplayModal(false);
  };

  return (
    <Space>
      <Button type="dashed" icon={<PlusOutlined spin={loading} />} onClick={addEventHandler}>
        Add test event
      </Button>
      <Button type="dashed" onClick={() => setDisplayModal(true)}>
        Open modal
      </Button>
      <ModalAddEvent {...{ setDisplayModal, displayModal, addEventFromModal }} />
    </Space>
  );
};

const mapStateToProps = ({ onFetch }) => ({
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableControls);
