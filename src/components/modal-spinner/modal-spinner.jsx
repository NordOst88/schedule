import React from 'react';

import { Spin, Space, Modal } from 'antd';
import { VIEW_SPINNER_TIP } from '../../constants/constants';

import './modal-spinner.scss';

const ModalSpinner = ({ displaySpinner, tip }) => {
  const backgroundColor = tip === VIEW_SPINNER_TIP ? '#070707f2' : '#00000099';

  return (
    <Modal
      className="modal-spinner"
      width={0}
      visible={displaySpinner}
      footer={null}
      closable={false}
      closeIcon={false}
      keyboard={false}
      maskStyle={{ backgroundColor }}
    >
      <Space align="center" style={{ height: '70vh', justifyContent: 'center', width: '100%' }}>
        <Spin
          size="large"
          tip={tip}
          style={{ fontSize: '2.5rem', width: '100vw', color: '#fff' }}
        />
      </Space>
    </Modal>
  );
};

export default ModalSpinner;
