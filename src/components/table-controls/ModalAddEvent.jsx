/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Typography } from 'antd';
import TagPicker from './TagsPicker';

const { Text } = Typography;

const useResetFormOnCloseModal = ({ form, displayModal }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = displayModal;
  }, [displayModal]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!displayModal && prevVisible) {
      form.resetFields();
    }
  }, [displayModal]);
};

const ModalAddEvent = ({ setDisplayModal, displayModal, addEventFromModal, eventColors }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    displayModal,
  });

  const config = {
    rules: [{ required: true, message: 'Please input your Task Name!' }],
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Add Event"
      visible={displayModal}
      onCancel={() => setDisplayModal(false)}
      onOk={onOk}
    >
      <Form onFinish={addEventFromModal} form={form} initialValues={{ week: 0 }} size="small">
        <Form.Item
          label={<Text strong>Week</Text>}
          name="week"
          rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="dateTime" label="Date">
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item name="deadline" label="DeadLine">
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label="Task Type" name="type">
          <TagPicker />
        </Form.Item>
        <Form.Item label="Task Name" name="name" {...config}>
          <Input />
        </Form.Item>
        <Form.Item label="Task URL" name="descriptionUrl">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Comment" name="comment">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddEvent;
