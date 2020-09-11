import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import Spinner from '../spinner/spinner';
import SwaggerService from '../../services/swagger-service';
import { onSetEvents } from '../../actions/actions';

import { LIST, TABLE, CALENDAR } from '../../constants/constants';
import List from '../list/list';

import sortByDateTime from '../../utils/sortByDateTime';

import './content-container.scss';

class ContentContainer extends PureComponent {
  api = new SwaggerService();

  state = {
    loading: true,
  };

  componentDidMount() {
    const { onFetch } = this.props;
    this.api.getAllEvents().then((events) => {
      const formattedData = sortByDateTime(events);
      onFetch(formattedData);
      this.setState({ loading: false });
    });
  }

  render() {
    const { currentView } = this.props;
    const { loading } = this.state;
    const { Content } = Layout;

    // todo: change List to your components in the second and third cases

    return (
      <Content style={{ padding: '15px 3%', backgroundColor: '#fff' }}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {currentView === LIST ? <List /> : null}
            {currentView === TABLE ? <List /> : null}
            {currentView === CALENDAR ? <List /> : null}
          </>
        )}
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, { onFetch: onSetEvents })(ContentContainer);
