import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Modal, Space, Typography, Button, Switch, Tooltip } from 'antd';
import { FormOutlined, ReadOutlined, EditOutlined } from '@ant-design/icons';

import getEventColor from '../../utils/getEventColor';
import sortByDateTime from '../../utils/sortByDateTime';
import getFormattedDate from '../../utils/getFormattedDate';
import getFontSize from '../../utils/getFontSize';
import {
  feedbackButtonStyles,
  getOrganizerID,
  feedbackSwitchStyles,
} from '../../utils/modalInfoHelpers';
import { formatEventForFetch } from '../../utils/tableHelpers';

import { onSetEvents } from '../../actions/actions';

import Type from '../task-type';
import Links from '../links';
import Organizer from '../organizer/organizer';
import FeedbackContainer from '../feedback/feedback';
import ModalEvent from '../modal-event';
import popupMessage from '../popup-message';
import MapContainer from '../map/map';

import { MODAL_INFO_TEXT, MENTOR } from '../../constants/constants';
import { ONLINE_TEXT, NO_PLACE } from '../../constants/mapConstants';
import {
  MENTOR_SHOW_FEEDBACKS_TEXT,
  STUDENT_ADD_FEEDBACK_TEXT,
} from '../../constants/modalInfoConstants';
import {
  SUCCESS_FETCH_MSG,
  SUCCESS_UPDATE_EVENT,
  SUCCESS_DELETE_EVENT,
  ERROR_FETCH_MSG,
} from '../../constants/tableConstants';

import SwaggerService from '../../services/swagger-service';

import './modal-info.scss';

const api = new SwaggerService();

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
  eventDescription,
  displayModal,
  setDisplayModal,
  eventColors,
  currentTimezone,
  textSize,
  titleTextSize,
  role,
  onFetch,
}) => {
  const {
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
    allowFeedback = true,
    feedbacks = {},
  } = eventDescription;
  const { Link } = Typography;
  const fontSize = getFontSize(textSize, 1.6);
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
  const isOfflineEvent = place !== ONLINE_TEXT && place !== NO_PLACE && place;

  const isMentor = role === MENTOR;

  const [displayFeedbackModal, setDisplayFeedback] = useState(false);
  const [displayEditor, setDisplayEditor] = useState(false);
  const [updatedEvent, setUpdateEvents] = useState(eventDescription);
  const [isNeedToUpdate, setNeedToUpdate] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState(feedbacks);

  const onFeedbackBtnClick = () => {
    setDisplayFeedback(true);
  };

  const onEditBtnClick = () => {
    setDisplayEditor(true);
  };

  const updateEvent = (event) => {
    const updatableEvent = formatEventForFetch(event);
    api
      .updateEventById(updatableEvent.id, updatableEvent)
      .then(() => {
        api.getAllEvents().then((events) => {
          onFetch(events);
          popupMessage({ ...SUCCESS_FETCH_MSG, ...SUCCESS_UPDATE_EVENT });
        });
      })
      .catch((error) => {
        popupMessage({
          ...ERROR_FETCH_MSG,
          message: error.name,
          description: error.message,
          callbacksArg: event,
          callback: updateEvent,
        });
      });
    setDisplayModal(false);
  };

  const fetchDeleteEvent = async (id) => {
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
    setDisplayModal(false);
  };

  const toggleAllowFeedback = () => {
    setUpdateEvents((prevState) => ({
      ...prevState,
      allowFeedback: !prevState.allowFeedback,
      organizer: getOrganizerID(prevState),
    }));
    setNeedToUpdate(true);
  };

  const onFeedbackAdd = (timeStamp, feedbackText) => {
    setUpdateEvents((prevState) => ({
      ...prevState,
      feedbacks: { ...prevState.feedbacks, [timeStamp]: feedbackText },
      organizer: getOrganizerID(prevState),
    }));
    setNeedToUpdate(true);
  };

  const fetchUpdateEvent = async (event) => {
    await api.updateEventById(event.id, event);
    const events = await api.getAllEvents();
    const formattedEvents = sortByDateTime(events);
    onFetch(formattedEvents);
  };

  const deleteFeedback = (feedback, timeStamp) => {
    delete feedback[timeStamp];
    setAllFeedbacks({ ...feedback });
    return { ...feedback };
  };

  const getDeletedFeedback = (timeStamp) => {
    setUpdateEvents((prevState) => ({
      ...prevState,
      feedbacks: deleteFeedback(prevState.feedbacks, timeStamp),
      organizer: getOrganizerID(prevState),
    }));
    setNeedToUpdate(true);
  };

  // todo: think about refactor

  useEffect(() => {
    const css = `.ant-modal-header { background-color: ${getEventColor(eventColors, type)}5e; }`;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.querySelector('.modal-info').appendChild(style);
  }, []);
  const titleWidth = isMentor ? 340 : null;

  const feedBackSwitch = isMentor && (
    <Switch
      className="c"
      checkedChildren="ON Feedback "
      unCheckedChildren="OFF Feedback "
      defaultChecked={allowFeedback}
      style={feedbackSwitchStyles()}
      onChange={toggleAllowFeedback}
    />
  );

  return (
    <div className="modal-info">
      <Modal
        width={650}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
        }}
        bodyStyle={{ padding: 24, paddingTop: 10 }}
        visible={displayModal}
        title={
          <div className="modal__title__container">
            <div style={{ width: titleWidth }}>
              <Line title={taskName} text={getTopic()} styles={{ fontSize: titleTextSize }} />
            </div>
            {feedBackSwitch}
          </div>
        }
        footer={null}
        onCancel={() => {
          if (isNeedToUpdate && isMentor) {
            fetchUpdateEvent(updatedEvent);
            setNeedToUpdate(false);
          }
          if (isNeedToUpdate) {
            fetchUpdateEvent(updatedEvent);
            setNeedToUpdate(false);
          }
          setDisplayModal(false);
        }}
      >
        <FeedbackContainer
          {...{
            displayFeedbackModal,
            setDisplayFeedback,
            onFeedbackAdd,
            isMentor,
            allFeedbacks,
            currentTimezone,
            getDeletedFeedback,
          }}
        />
        {isMentor && (
          <ModalEvent
            {...{
              displayModal: displayEditor,
              setDisplayModal: setDisplayEditor,
              selectedEvent: eventDescription,
              api,
              updateEvent,
              fetchDeleteEvent,
            }}
          />
        )}
        <div style={{ display: 'flex', float: 'right' }}>
          {allowFeedback && !isMentor && (
            <Tooltip placement="left" title={STUDENT_ADD_FEEDBACK_TEXT}>
              <Button icon={<FormOutlined />} onClick={onFeedbackBtnClick} />
            </Tooltip>
          )}
          {isMentor && (
            <>
              <Tooltip placement="left" title={MENTOR_SHOW_FEEDBACKS_TEXT}>
                <Button icon={<ReadOutlined />} onClick={onFeedbackBtnClick} />
              </Tooltip>
              <Button
                icon={<EditOutlined />}
                style={feedbackButtonStyles()}
                onClick={onEditBtnClick}
              />
            </>
          )}
        </div>
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
const mapStateToProps = ({
  eventColors,
  currentTimezone,
  fontSize,
  titleTextSize,
  role,
  feedbackMode,
  onFetch,
}) => ({
  eventColors,
  currentTimezone,
  textSize: fontSize,
  titleTextSize,
  role,
  feedbackMode,
  onFetch,
});
export default connect(mapStateToProps, {
  onFetch: onSetEvents,
})(ModalInfo);
