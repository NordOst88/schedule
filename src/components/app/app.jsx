import React from 'react';
import { Layout } from 'antd';
import HeaderContainer from '../header-container/header-container';
import Controls from '../controls/controls';
import ContentContainer from '../content-container/content-container';

const App = () => (
  <Layout>
    <HeaderContainer />
    <Controls />
    <ContentContainer />
  </Layout>
);

export default App;
