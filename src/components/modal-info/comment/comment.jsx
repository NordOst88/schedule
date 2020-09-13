import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Comment = ({ comment }) => {
  const { Text } = Typography;
  const { taskComment } = MODAL_INFO_TEXT;
  return (
    <>
      <Text strong>{taskComment}</Text>
      <Text>{comment}</Text>
    </>
  );
};

export default Comment;
