import React from 'react';
import { Typography, Divider } from 'antd';

import { MODAL_INFO_TEXT } from '../../constants/constants';

/**
 * Component for showing links to materials of event with divider between them.
 * @component
 * @param {Object} wrapper - Arguments wrapper.
 * @param {Object} wrapper.links - Object with links.
 */
const Links = ({ links }) => {
  const { Text, Link } = Typography;
  const { noInfo } = MODAL_INFO_TEXT;
  const linksArray = Object.entries(links);
  return (
    <>
      {linksArray.length ? (
        linksArray.map((link, idx) => (
          <Link
            href={link[1]}
            target="_blank"
            style={{
              whiteSpace: 'nowrap',
            }}
            key={link[0]}
          >
            {link[0] || noInfo}
            {idx !== link.length - 1 && linksArray.length > 1 && (
              <Divider style={{ backgroundColor: '#757575' }} type="vertical" />
            )}
          </Link>
        ))
      ) : (
        <Text>{noInfo}</Text>
      )}
    </>
  );
};

export default Links;
