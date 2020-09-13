import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Topic = ({ descriptionUrl, name }) => {
  const { Text, Link } = Typography;
  const { taskName } = MODAL_INFO_TEXT;

  return (
    <>
      <Text strong>{taskName}</Text>
      <Link href={descriptionUrl} target="_blank">
        {name}
      </Link>
    </>
  );
};

export default Topic;
