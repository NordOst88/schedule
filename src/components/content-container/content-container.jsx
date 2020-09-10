import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';

import { LIST } from '../../constants/constants';
import List from '../list/list';

import sortByDateTime from '../../utils/sortByDateTime';

import './content-container.scss';

class ContentContainer extends PureComponent {
  api = new SwaggerService();

  componentDidMount() {
    const { onFetch } = this.props;
    this.api.getAllEvents().then((events) => {
      const formattedData = sortByDateTime(events);
      onFetch(formattedData);
    });
  }

  render() {
    const { currentView } = this.props;
    const { Content } = Layout;
    return (
      <Content style={{ padding: '15px 3%', backgroundColor: '#fff' }}>
        {currentView === LIST ? <List /> : null}
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(ContentContainer);
