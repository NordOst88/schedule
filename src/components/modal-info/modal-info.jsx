import React, { useEffect, useState } from 'react';

import { Modal, Space, Typography, Button, Switch } from 'antd';
import { FormOutlined, ReadOutlined } from '@ant-design/icons';

import getEventColor from '../../utils/getEventColor';

import Type from '../task-type';
import Links from '../links';
import Organizer from '../organizer/organizer';
import FeedbackContainer from '../feedback/feedback';
import MapContainer from '../map/map';

import getFormattedDate from '../../utils/getFormattedDate';
import { MODAL_INFO_TEXT, MENTOR } from '../../constants/constants';
import { ONLINE_TEXT } from '../../constants/mapConstants';

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
  allowFeedback,
  displayModal,
  setDisplayModal,
  eventColors,
  currentTimezone,
  fontSize,
  titleTextSize,
  role,
}) => {
  const { Link } = Typography;
  const getTypeTaskTags = () => <Type {...{ type, eventColors, fontSize }} />;
  const getLinks = () => <Links {...{ links }} />;
  const getOrganizer = () => <Organizer {...{ organizer }} />;
  const getTopic = () => (
    <Link href={descriptionUrl} target="_blank">
      {name}
    </Link>
  );
  const startDate = getFormattedDate(dateTime, currentTimezone) || noInfo;
  const deadlineDate = getFormattedDate(deadline, currentTimezone) || noInfo;
  const isOfflineEvent = place !== ONLINE_TEXT && place;

  const isMentor = role === MENTOR;

  const [displayFeedbackModal, setDisplayFeedback] = useState(false);

  const onFeedbackBtnClick = () => {
    setDisplayFeedback(true);
  };

  // todo: think about refactor

  useEffect(() => {
    const css = `.ant-modal-header { background-color: ${getEventColor(eventColors, type)}5e; }`;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.querySelector('.modal-info').appendChild(style);
    console.log(role);
  }, []);

  return (
    <div className="modal-info">
      <Modal
        width={650}
        visible={displayModal}
        title={<Line title={taskName} text={getTopic()} styles={{ fontSize: titleTextSize }} />}
        centered
        footer={null}
        onCancel={() => {
          setDisplayModal(false);
        }}
      >
        {allowFeedback && !isMentor && (
          <Button
            icon={<FeedbackIcon />}
            style={{ position: 'absolute', top: 67, right: 20 }}
            onClick={onFeedbackBtnClick}
          />
        )}
        {isMentor && (
          <>
            <Button
              icon={<ReadOutlined />}
              style={{ position: 'absolute', top: 67, right: 20 }}
              onClick={onFeedbackBtnClick}
            />
            <Switch
              checkedChildren="Feedback ON"
              unCheckedChildren="Feedback OFF"
              defaultChecked
              style={{ position: 'absolute', top: 18, right: 50 }}
            />
          </>
        )}
        <FeedbackContainer
          displayFeedbackModal={displayFeedbackModal}
          setDisplayFeedback={setDisplayFeedback}
          taskName={name}
          timeZone={currentTimezone}
        />
        <Space direction="vertical">
          <Line title={estimatedWeek} text={week} styles={{ fontSize }} />
          <Line title={taskType} text={getTypeTaskTags()} styles={{ fontSize }} />
          <Line title={taskStart} text={startDate} type="success" styles={{ fontSize }} />
          <Line title={taskDeadline} text={deadlineDate} type="danger" styles={{ fontSize }} />
          <Line title={estimatedStudyTime} text={estimatedTime} styles={{ fontSize }} />
          <Line title={taskPlace} text={place} styles={{ fontSize }} />
          <Line
            title={taskDescription}
            text={description}
            styles={{ fontSize, display: 'flex', textAlign: 'justify' }}
          />
          <Line title={taskLinks} text={getLinks()} styles={{ fontSize }} />
          <Line title={taskOrganizer} text={getOrganizer()} styles={{ fontSize }} />
          <Line
            title={taskComment}
            text={comment}
            styles={{ fontSize, display: 'flex', textAlign: 'justify' }}
          />
        </Space>
        {isOfflineEvent && <MapContainer place={place} />}
      </Modal>
    </div>
  );
};

export default ModalInfo;

const Line = ({ title, text, type, styles }) => {
  const { Text } = Typography;
  const mode = type && text !== noInfo;
  return (
    <>
      <Text strong style={styles}>
        {title}
      </Text>
      <Text type={mode && type} strong={mode} style={styles}>
        {text}
      </Text>
    </>
  );
};

const FeedbackIcon = () => <FormOutlined style={{ fontSize: '1.8rem', marginRight: 0 }} />;
