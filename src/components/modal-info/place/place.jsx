import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Place = ({ place }) => {
  const { Text } = Typography;
  const { taskPlace } = MODAL_INFO_TEXT;
  return (
    <>
      <Text strong>{taskPlace}</Text>
      <Text>{place}</Text>
    </>
  );
};

export default Place;
