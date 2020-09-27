import React from 'react';
import { Typography } from 'antd';
import { MODAL_INFO_TEXT } from '../../constants/constants';

const { noInfo } = MODAL_INFO_TEXT;

/**
 * Component for showing text line with some title and text.
 * @component
 * @param {Object} line - Text line with title, text and optional styles.
 * @param {string} line.title - Title of text line.
 * @param {string} line.text - Text of line.
 * @param {Object} line.styles - CSSProperties.
 */
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
