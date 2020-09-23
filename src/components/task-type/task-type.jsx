import React from 'react';
import { Tag } from 'antd';

import getEventColor from '../../utils/getEventColor';

const Type = ({ type, eventColors, tagsName, displayColorPicker, fontSize }) => (
  <>
    {type.map((task) => (
      <Tag
        color={getEventColor(eventColors, task)}
        className={tagsName}
        key={task}
        onClick={displayColorPicker}
        style={{ fontSize, display: 'inline-block', borderRadius: 4, paddingBottom: 2 }}
      >
        {task}
      </Tag>
    ))}
  </>
);

export default Type;
