import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const EstimatedTime = ({ estimatedTime }) => {
  const { Text } = Typography;
  const { estimatedStudyTime } = MODAL_INFO_TEXT;
  return (
    <>
      <Text strong>{estimatedStudyTime}</Text>
      <Text>{estimatedTime}</Text>
    </>
  );
};

export default EstimatedTime;
