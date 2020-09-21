import React, { useEffect } from 'react';

import { Modal, Space, Typography } from 'antd';

import getEventColor from '../../utils/getEventColor';

import Type from '../task-type';
import Links from '../links';
import Organizer from '../organizer/organizer';

import getFormattedDate from '../../utils/getFormattedDate';
import { MODAL_INFO_TEXT } from '../../constants/constants';

import fetchGeopositionBySearch from '../map/getCoordinatesFromAddress';

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
  currentTimezone,
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
  const startDate = getFormattedDate(dateTime, currentTimezone) || noInfo;
  const deadlineDate = getFormattedDate(deadline, currentTimezone) || noInfo;

  fetchGeopositionBySearch('Minsk');

  // todo: think about refactor

  useEffect(() => {
    const css = `.ant-modal-header { background-color: ${getEventColor(eventColors, type)}5e; }`;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.querySelector('.modal-info').appendChild(style);
  }, []);

  return (
    <div className="modal-info">
      <Modal
        width={650}
        visible={displayModal}
        title={<Line title={taskName} text={getTopic()} />}
        centered
        footer={null}
        onCancel={() => {
          setDisplayModal(false);
        }}
      >
        <Space direction="vertical">
          <Line title={estimatedWeek} text={week} />
          <Line title={taskType} text={getTypeTaskTags()} />
          <Line title={taskStart} text={startDate} styles="success" />
          <Line title={taskDeadline} text={deadlineDate} styles="danger" />
          <Line title={estimatedStudyTime} text={estimatedTime} />
          <Line title={taskPlace} text={place} />
          <Line title={taskDescription} text={description} />
          <Line title={taskLinks} text={getLinks()} />
          <Line title={taskOrganizer} text={getOrganizer()} />
          <Line title={taskComment} text={comment} />
        </Space>
      </Modal>
    </div>
  );
};

export default ModalInfo;

const Line = ({ title, text, styles }) => {
  const { Text } = Typography;
  const mode = styles && text !== noInfo;
  return (
    <>
      <Text strong>{title}</Text>
      <Text type={mode && styles} strong={mode}>
        {text}
      </Text>
    </>
  );
};
