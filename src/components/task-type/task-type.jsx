import React from 'react';
import { Tag } from 'antd';

import getEventColor from '../../utils/getEventColor';

const Type = ({ type, eventColors, tagsName, displayColorPicker }) => (
  <>
    {type.map((task) => (
      <Tag
        color={getEventColor(eventColors, task)}
        className={tagsName}
        key={task}
        onClick={displayColorPicker}
      >
        {task}
      </Tag>
    ))}
  </>
);

export default Type;
