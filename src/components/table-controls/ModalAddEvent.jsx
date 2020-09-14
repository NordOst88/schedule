import React from 'react';
import { Modal, Form, Input } from 'antd';

const ModalAddEvent = ({ setDisplayModal, displayModal }) => {
  const a = 'khooi';
  return (
    <Modal title="Add Event" visible={displayModal} onCancel={() => setDisplayModal(false)}>
      <Form>
        <Form.Item>{a}</Form.Item>
        <Form.Item
          label="Task Name"
          name="taskName"
          rules={[{ required: true, message: 'Please input your Task Name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddEvent;
