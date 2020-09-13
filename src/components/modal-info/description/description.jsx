import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Description = ({ description }) => {
  const { Text } = Typography;
  const { taskDescription } = MODAL_INFO_TEXT;
  return (
    <>
      <Text strong>{taskDescription}</Text>
      <Text>{description}</Text>
    </>
  );
};

export default Description;
