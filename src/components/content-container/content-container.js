import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import CalendarContainer from '../calendar/calendar';

import './content-container.scss';

const ContentContainer = ({ currentView, role }) => {
  const { Content } = Layout;

  return (
    <Content>
      <CalendarContainer />
      <p className="text">Current View: {currentView}</p>
      <p className="text">Current Role: {role}</p>
    </Content>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ContentContainer);
