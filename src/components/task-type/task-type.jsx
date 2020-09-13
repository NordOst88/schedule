import React from 'react';
import { Tag } from 'antd';

import getEventColor from '../../utils/getEventColor';

const Type = ({ type, eventColors }) => (
  <>
    {type.map((task) => (
      <Tag color={getEventColor(eventColors, task)} key={task}>
        {task}
      </Tag>
    ))}
  </>
);
export default Type;
