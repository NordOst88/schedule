import React, { useState } from 'react';

import { Modal, Input } from 'antd';

// import getFormattedDate from '../../utils/getFormattedDate';
import getTimeStamp from '../../utils/getTimeStamp';

const FeedbackContainer = ({ displayFeedbackModal, setDisplayFeedback, onFeedbackAdd }) => {
  const { TextArea } = Input;
  const [inputText, setInputText] = useState('');

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOk = () => {
    console.log(inputText);
    onFeedbackAdd(getTimeStamp(new Date()), inputText);
    setDisplayFeedback(false);
    setInputText('');
  };

  const handleCancel = () => {
    setDisplayFeedback(false);
    setInputText('');
  };

  return (
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
