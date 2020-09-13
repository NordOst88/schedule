import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Links = ({ links }) => {
  const { Text, Link } = Typography;
  const { taskLinks, noInfo } = MODAL_INFO_TEXT;
  const linksArray = Object.entries(links);

  return (
    <>
      <Text strong>{taskLinks}</Text>
      {linksArray.length ? (
        linksArray.map((link) => (
          <Link href={link[1]} target="_blank">
            {link[0] || noInfo}
          </Link>
        ))
      ) : (
        <Text>{noInfo}</Text>
      )}
    </>
  );
};

export default Links;
