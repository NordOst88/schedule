import React, { useState } from 'react';

import { Modal, Input, Typography, Divider, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import getFormattedDate from '../../utils/getFormattedDate';
import getTimeStamp from '../../utils/getTimeStamp';

import {
  INPUT_PLACEHOLDER,
  MENTOR_MODAL_TITLE,
  STUDENT_MODAL_TITLE,
  NO_FEEDBACK_TEXT,
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

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const getFeedbackData = () => {
    const entries = Object.entries(allFeedbacks);
    return entries.map((feedback) => {
      const dateTime = getFormattedDate(feedback[0], currentTimezone);
      return { text: `${dateTime}: ${feedback[1]}`, timeStamp: feedback[0] };
    });
  };

  const handleOk = () => {
    if (isMentor) {
      setDisplayFeedback(false);
    } else {
      onFeedbackAdd(getTimeStamp(new Date()), inputText);
      setDisplayFeedback(false);
      setInputText('');
    }
  };

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
      {getFeedbackData().length ? null : <Text>{NO_FEEDBACK_TEXT}</Text>}
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
