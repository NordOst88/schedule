import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../constants/constants';

const Links = ({ links }) => {
  const { Text, Link } = Typography;
  const { noInfo } = MODAL_INFO_TEXT;
  const linksArray = Object.entries(links);

  return (
    <>
      {linksArray.length ? (
        linksArray.map((link) => (
          <Link href={link[1]} target="_blank" key={link[0]}>
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
