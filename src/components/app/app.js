import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import HeaderContainer from '../haeder-container/header-container';

export default class App extends PureComponent {
  render() {
    const { Content } = Layout;
    return (
      <Layout>
        <HeaderContainer />
        <Content />
      </Layout>
    );
  }
}
