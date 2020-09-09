import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';

import './content-container.scss';

class ContentContainer extends PureComponent {
  api = new SwaggerService();

  componentDidMount() {
    const { onFetch } = this.props;
    this.api.getAllEvents().then((events) => onFetch(events));
  }

  render() {
    const { currentView, role } = this.props;
    const { Content } = Layout;
    return (
      <Content>
        <p className="text">Current View: {currentView}</p>
        <p className="text">Current Role: {role}</p>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(ContentContainer);
