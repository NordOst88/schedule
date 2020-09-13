import React from 'react';
import { Typography } from 'antd';

import { MODAL_INFO_TEXT } from '../../../constants/constants';

const Organizer = ({ organizer }) => {
  const { Text, Link } = Typography;
  const { taskOrganizer, noInfo } = MODAL_INFO_TEXT;
  return (
    <>
      <Text strong>{taskOrganizer}</Text>
      {organizer.length ? (
        organizer.map((person) => {
          const { name = noInfo, url = null, id } = person;
          return (
            <Link href={url} target="_blank" key={id}>
              {name}
            </Link>
          );
        })
      ) : (
        <Text>{noInfo}</Text>
      )}
    </>
  );
};

export default Organizer;
