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
import { MODAL_INFO_TEXT } from '../../constants/constants';
import TableEdit from '../table-edit';

const api = new SwaggerService();
const { noInfo } = MODAL_INFO_TEXT;

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

  const createNewEvent = ({
    week,
    dateTime,
    deadline,
    type,
    place = noInfo,
    estimatedTime = noInfo,
    name = noInfo,
    descriptionUrl = noInfo,
    description = noInfo,
    links,
    selectedOrganizers,
    comment = noInfo,
  }) => {
    const newEvent = {
      week: `${week}`,
      dateTime: `${getTimeStamp(dateTime)}`,
      deadline: `${getTimeStamp(deadline)}`,
      type: type ? type.tags : [noInfo],
      place,
      estimatedTime,
      timeZone: '',
      name,
      descriptionUrl,
      description,
      links: convertArrayToObject(links),
      organizer: selectedOrganizers ? selectedOrganizers.organizers : [noInfo],
      comment,
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
      <TableEdit />
      <ModalAddEvent {...{ setDisplayModal, displayModal, createNewEvent, api }} />
    </Space>
  );
};

const mapStateToProps = ({ onFetch }) => ({
  onFetch,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(TableControls);
