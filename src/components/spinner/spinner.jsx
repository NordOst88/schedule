import React from 'react';
import { Spin, Space } from 'antd';
import './spinner.scss';

const Spinner = () => (
  <Space align="center" style={{ height: '85vh', justifyContent: 'center', width: '100%' }}>
    <Spin size="large" tip="Loading..." style={{ fontSize: '1.9rem' }} />
  </Space>
);

export default Spinner;
