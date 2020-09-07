import React from 'react';
import './heading.scss';

const Heading = ({ children }) => {
  return <h1 className="title">{children}</h1>;
};

export default Heading;
