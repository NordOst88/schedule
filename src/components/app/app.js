import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import HeaderContainer from '../header-container/header-container';
import Controls from '../controls/controls';
import ModalInfo from '../modal/modal';
import ContentContainer from '../content-container/content-container';
import data from '../../services/dummy';

export default class App extends PureComponent {
  render() {
    return (
      <Layout>
        <HeaderContainer />
        <Controls />
        <ContentContainer />
        <ModalInfo data={data} />
      </Layout>
    );
  }
}
