import React, { useState /*  useEffect */ } from 'react';
import { connect } from 'react-redux';

import { Modal, Input } from 'antd';

import { onFeedbackChange } from '../../actions/actions';

// import getFormattedDate from '../../utils/getFormattedDate';
// import getTimeStamp from '../../utils/getTimeStamp';

const FeedbackContainer = ({
  displayFeedbackModal,
  setDisplayFeedback,
  /* taskName,
  timeZone,
  feedbacks, */
  // onFeedbackAdd,
}) => {
  const { TextArea } = Input;
  const [inputText, setInputText] = useState('');
  // const [newFeedback, setNewFeedback] = useState({});
  // const [feedbacksArray, setFeedbackArray] = useState(feedbacks);

  /*   useEffect(() => {
      setFeedbackArray((prevState) => ([...prevState, newFeedback ]));
  }, [newFeedback]); */

  /*   const generateFeedback = () => {
    const timeStamp = getTimeStamp(new Date());
    const formattedDate = getFormattedDate(timeStamp, timeZone);
    const name = taskName;

    setNewFeedback({
      currentDate: formattedDate,
      name,
      inputText,
    });
  }; */

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOk = () => {
    // generateFeedback();

    setDisplayFeedback(false);
    setInputText('');
    // console.log(feedbacksArray)
    // console.log(feedbacks)
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
