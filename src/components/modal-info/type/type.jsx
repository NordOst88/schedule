import React from 'react';
import { Typography, Tag } from 'antd';

import getEventColor from '../../../utils/getEventColor';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Type = ({ type, eventColors }) => {
  const { Text } = Typography;
  const { taskType } = MODAL_INFO_TEXT;

  return (
    <>
      <Text strong>{taskType}</Text>
      {type.map((task) => (
        <Tag color={getEventColor(eventColors, task)} key={task}>
          {task}
        </Tag>
      ))}
    </>
  );
};

export default Type;
