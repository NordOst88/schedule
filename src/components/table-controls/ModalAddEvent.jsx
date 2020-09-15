import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, DatePicker, Typography, Select, Tag } from 'antd';

const { Text } = Typography;
const { Option } = Select;

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

  const taskTypes = Object.entries(eventColors);
  console.log(taskTypes);

  const config = {
    rules: [{ required: true, message: 'Please input your Task Name!' }],
  };

  const onOk = () => {
    form.submit();
  };

  function handleChange(value) {
    console.log(value);
  }

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
          <DatePicker />
        </Form.Item>
        <Form.Item label="Task Type">
          <Select name="type" onChange={handleChange}>
            {taskTypes.map((type) => (
              <Option key={type[0]}>
                <Tag color={type[1]}>{type[0]}</Tag>
              </Option>
            ))}
          </Select>
          <Input />
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

const mapStateToProps = ({ eventColors }) => ({
  eventColors,
});

export default connect(mapStateToProps)(ModalAddEvent);
