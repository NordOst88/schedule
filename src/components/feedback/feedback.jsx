import React, { useState /*  useEffect */ } from 'react';
import { connect } from 'react-redux';

import { Modal, Input } from 'antd';

import { onFeedbackChange } from '../../actions/actions';

// import getFormattedDate from '../../utils/getFormattedDate';
// import getTimeStamp from '../../utils/getTimeStamp';

const FeedbackContainer = ({ displayFeedbackModal, setDisplayFeedback }) => {
  const { TextArea } = Input;
  const [inputText, setInputText] = useState('');

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOk = () => {
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

const mapStateToProps = ({ feedbacks }) => ({
  feedbacks,
});

export default connect(mapStateToProps, { onFeedbackAdd: onFeedbackChange })(FeedbackContainer);
