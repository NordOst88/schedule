import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import HeaderContainer from '../header-container/header-container';
import Controls from '../controls/controls';
import ContentContainer from '../content-container/content-container';

export default class App extends PureComponent {
  render() {
    return (
      <Layout>
        <HeaderContainer />
        <Controls />
        <ContentContainer />
      </Layout>
    );
  }
}
