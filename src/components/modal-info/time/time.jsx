import React from 'react';
import { Typography, Row, Col } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';
import getFormattedDate from '../../../utils/getFormattedDate';

const Topic = ({ dateTime, deadline }) => {
  const { Text } = Typography;
  const { noInfo, taskStart, taskDeadline } = MODAL_INFO_TEXT;
  const startDate = getFormattedDate(dateTime) || noInfo;
  const deadlineDate = getFormattedDate(deadline) || noInfo;

  return (
    <>
      <Row>
        <Col>
          <Text strong>{taskStart}</Text>
          <Text>{startDate}</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text strong>{taskDeadline}</Text>
          <Text>{deadlineDate}</Text>
        </Col>
      </Row>
    </>
  );
};

export default Topic;
