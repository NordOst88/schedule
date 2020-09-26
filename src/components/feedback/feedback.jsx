import React, { useState } from 'react';

import { Modal, Input, Typography, Divider, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import getFormattedDate from '../../utils/getFormattedDate';
import getTimeStamp from '../../utils/getTimeStamp';

import {
  INPUT_PLACEHOLDER,
  MENTOR_MODAL_TITLE,
  STUDENT_MODAL_TITLE,
} from '../../constants/modalInfoConstants';

import './feedback.scss';

const FeedbackContainer = ({
  displayFeedbackModal,
  setDisplayFeedback,
  onFeedbackAdd,
  isMentor,
  allFeedbacks,
  currentTimezone,
  getDeletedFeedback,
}) => {
  const { TextArea } = Input;
  const { Text } = Typography;
  const [inputText, setInputText] = useState('');

  /**
   * Function handles onChange logic of the feedback modal
   * it set state for the input text
   *
   * @param {Object} event current event
   */

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  /**
   * Function get all feedback data, look through the data and return object with data needed for displaying in the feedback modal
   * @returns {Object} object of text, which is string, and timestamp
   */
  const getFeedbackData = () => {
    const entries = Object.entries(allFeedbacks);
    return entries.map((feedback) => {
      const dateTime = getFormattedDate(feedback[0], currentTimezone);
      return { text: `${dateTime}: ${feedback[1]}`, timeStamp: feedback[0] };
    });
  };

  /**
   * Function handles onOk logic of the feedback modal
   * If current mode is mentor, it sets the state to close feedback modal
   *
   * if current mode is student, it sets the state to close model and add feedback to global state and backend, as well as clears input area
   *
   */
  const handleOk = () => {
    if (isMentor) {
      setDisplayFeedback(false);
    } else {
      onFeedbackAdd(getTimeStamp(new Date()), inputText);
      setDisplayFeedback(false);
      setInputText('');
    }
  };

  /**
   * Function handles onCancel logic of the feedback modal
   * If current mode is student, it sets the state to clears input area and to close modal
   *
   */
  const handleCancel = () => {
    if (!isMentor) {
      setInputText('');
    }
    setDisplayFeedback(false);
  };

  return isMentor ? (
    <Modal
      title={MENTOR_MODAL_TITLE}
      visible={displayFeedbackModal}
      closable
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ maxHeight: 400 }}
      className="feedback__modal"
      footer={null}
    >
      {getFeedbackData().map((feedback) => (
        <div key={feedback.timeStamp}>
          <Text>{feedback.text}</Text>
          <Divider type="vertical" />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => getDeletedFeedback(feedback.timeStamp)}
          />
          <Divider style={{ margin: '10px 0' }} />
        </div>
      ))}
    </Modal>
  ) : (
    <Modal
      title={STUDENT_MODAL_TITLE}
      visible={displayFeedbackModal}
      closable={false}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <TextArea
        rows={4}
        placeholder={INPUT_PLACEHOLDER}
        allowClear
        onChange={handleOnChange}
        value={inputText}
      />
    </Modal>
  );
};

export default FeedbackContainer;
