import React from 'react';

import { Spin, Space, Modal } from 'antd';

import './modal-spinner.scss';

const ModalSpinner = ({ displaySpinner, tip }) => (
  <Modal
    className="modal-spinner"
    width={0}
    visible={displaySpinner}
    footer={null}
    closable={false}
    closeIcon={false}
    keyboard={false}
  >
    <Space align="center" style={{ height: '70vh', justifyContent: 'center', width: '100%' }}>
      <Spin size="large" tip={tip} style={{ fontSize: '2rem', width: '100vw', color: '#fff' }} />
    </Space>
  </Modal>
);

export default ModalSpinner;
