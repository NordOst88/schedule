import React, { useState } from 'react';

import { Modal, Input, Typography, Divider, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import getFormattedDate from '../../utils/getFormattedDate';
import getTimeStamp from '../../utils/getTimeStamp';

import './feedback.scss';

const FeedbackContainer = ({
  displayFeedbackModal,
  setDisplayFeedback,
  onFeedbackAdd,
  isMentor,
  feedbacks,
  currentTimezone,
}) => {
  const { TextArea } = Input;
  const { Text } = Typography;
  const [inputText, setInputText] = useState('');

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const getFeedbackData = () => {
    const entries = Object.entries(feedbacks);
    return entries.map((feedback) => {
      const dateTime = getFormattedDate(feedback[0], currentTimezone);
      return `${dateTime}: ${feedback[1]}`;
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
      title="All feedbacks"
      visible={displayFeedbackModal}
      closable
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ maxHeight: 400 }}
      className="feedback__modal"
      footer={null}
    >
      {getFeedbackData().map((feedback) => (
        <>
          <Text>{feedback}</Text>
          <Divider type="vertical" />
          <Button icon={<DeleteOutlined />} onClick={() => console.log(feedback)} />
          <Divider style={{ margin: '10px 0' }} />
        </>
      ))}
    </Modal>
  ) : (
    <Modal
      title="Feedback"
      visible={displayFeedbackModal}
      closable={false}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <TextArea
        rows={4}
        placeholder="Write your feedback of the task"
        allowClear
        onChange={handleOnChange}
        value={inputText}
      />
    </Modal>
  );
};

export default FeedbackContainer;
