import React from 'react';
import { Typography } from 'antd';
import { MODAL_INFO_TEXT } from '../../constants/constants';

const { noInfo } = MODAL_INFO_TEXT;

const Line = ({ title, text, styles }) => {
  const { Text } = Typography;
  const mode = styles && text !== noInfo;
  return (
    <>
      <Text strong>{title}</Text>
      {text && (
        <Text type={mode && styles} strong={mode}>
          {text}
        </Text>
      )}
    </>
  );
};

export default Line;
