import React from 'react';

import { Modal, Space, Typography } from 'antd';

import Type from '../task-type';
import Links from '../links/links';
import Organizer from '../organizer/organizer';

import getFormattedDate from '../../utils/getFormattedDate';
import { MODAL_INFO_TEXT } from '../../constants/constants';

import './modal-info.scss';

const {
  noInfo,
  estimatedWeek,
  taskType,
  taskStart,
  taskDeadline,
  estimatedStudyTime,
  taskPlace,
  taskDescription,
  taskLinks,
  taskOrganizer,
  taskComment,
  taskName,
} = MODAL_INFO_TEXT;

const ModalInfo = ({
  name = noInfo,
  week = noInfo,
  type = [],
  dateTime,
  deadline,
  estimatedTime = noInfo,
  place = noInfo,
  description = noInfo,
  descriptionUrl = null,
  links = {},
  organizer = [],
  comment = noInfo,
  displayModal,
  setDisplayModal,
  eventColors,
}) => {
  const { Link } = Typography;
  const getTypeTaskTags = () => <Type {...{ type, eventColors }} />;
  const getLinks = () => <Links {...{ links }} />;
  const getOrganizer = () => <Organizer {...{ organizer }} />;
  const getTopic = () => (
    <Link href={descriptionUrl} target="_blank">
      {name}
    </Link>
  );
  const startDate = getFormattedDate(dateTime) || noInfo;
  const deadlineDate = getFormattedDate(deadline) || noInfo;

  return (
    <Modal
      width={650}
      visible={displayModal}
      title={<Line title={taskName} text={getTopic()} />}
      style={{ top: 20 }}
      footer={null}
      onCancel={() => {
        setDisplayModal(false);
      }}
    >
      <Space direction="vertical">
        <Line title={estimatedWeek} text={week} />
        <Line title={taskType} text={getTypeTaskTags()} />
        <Line title={taskStart} text={startDate} />
        <Line title={taskDeadline} text={deadlineDate} />
        <Line title={estimatedStudyTime} text={estimatedTime} />
        <Line title={taskPlace} text={place} />
        <Line title={taskDescription} text={description} />
        <Line title={taskLinks} text={getLinks()} />
        <Line title={taskOrganizer} text={getOrganizer()} />
        <Line title={taskComment} text={comment} />
      </Space>
    </Modal>
  );
};

export default ModalInfo;

const Line = ({ title, text }) => {
  const { Text } = Typography;
  return (
    <>
      <Text strong>{title}</Text>
      <Text>{text}</Text>
    </>
  );
};
