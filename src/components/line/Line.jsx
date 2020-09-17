import React from 'react';
import { Typography } from 'antd';

const TextLine = ({ title, text }) => {
  const { Text } = Typography;
  return (
    <>
      <Text strong>{title}</Text>
      {text && <Text>{text}</Text>}
    </>
  );
};

export default TextLine;
