import React from 'react';
import { Typography, Image } from 'antd';

import { MODAL_INFO_TEXT } from '../../constants/constants';

import './organizer.scss';

const Organizer = ({ organizer }) => {
  const { Text, Link } = Typography;
  const { noInfo } = MODAL_INFO_TEXT;
  return (
    <>
      {organizer.length ? (
        organizer.map((person) => {
          const { name = noInfo, url = null, id } = person;
          const imageUrl = url ? `${url}.png` : null;
          return (
            <Link href={url} target="_blank" key={id}>
              <Image
                className="modal__organizer"
                width={24}
                src={imageUrl}
                alt={name}
                style={{
                  margin: '0 5px',
                }}
              />
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
