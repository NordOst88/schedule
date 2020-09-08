import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Table from '../table';

import './content-container.scss';

const ContentContainer = ({ currentView, role }) => {
  const { Content } = Layout;

  return (
    <Content>
      <p className="text">
        Current View:
        {currentView}
      </p>
      <p className="text">
        Current Role:
        {role}
      </p>
      {currentView === 'Table' && <Table />}
    </Content>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(ContentContainer);
