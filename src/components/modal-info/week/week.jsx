import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Week = ({ week }) => {
  const { Text } = Typography;
  const { estimatedWeek } = MODAL_INFO_TEXT;

  return (
    <>
      <Text strong>{estimatedWeek}</Text>
      <Text>{week}</Text>
    </>
  );
};

export default Week;
