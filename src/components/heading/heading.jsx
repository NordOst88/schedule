import React from 'react';

import { connect } from 'react-redux';

import getFontSize from '../../utils/getFontSize';
import './heading.scss';

const Heading = ({ fontSize, children }) => (
  <h1 className="title" style={{ fontSize: `${getFontSize(fontSize, 2)}` }}>
    {children}
  </h1>
);

const mapStateToProps = ({ fontSize }) => ({
  fontSize,
});

export default connect(mapStateToProps)(Heading);
