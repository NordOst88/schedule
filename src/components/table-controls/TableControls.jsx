/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';
import sortByDateTime from '../../utils/sortByDateTime';

const api = new SwaggerService();

const TableControls = ({ onFetch }) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <Space>
      <Button type="dashed" icon={<PlusOutlined spin={loading} />} onClick={addEventHandler}>
        Add test event
      </Button>
    </Space>
  );
};

const mapStateToProps = ({ onFetch }) => ({
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableControls);
