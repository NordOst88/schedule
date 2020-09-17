/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import TagPicker from './TagsPicker';
import OrganizersPicker from './OrganizersPicker';
import LinksList from './LinksList';
import { MODAL_ADD_EVENT_TEXT } from '../../constants/constants';
import TextLine from '../line';

const {
  week,
  date,
  deadline,
  taskType,
  place,
  estimatedTime,
  taskName,
  taskURL,
  description,
  organizers,
  comment,
  links,
} = MODAL_ADD_EVENT_TEXT;

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

const ModalAddEvent = ({ setDisplayModal, displayModal, createNewEvent, api }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    displayModal,
  });

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
      <Form onFinish={createNewEvent} form={form} initialValues={{ week: 0 }} size="small">
        <Form.Item
          label={<TextLine title={week} />}
          name="week"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="dateTime"
          label={<TextLine title={date} />}
          rules={[{ required: true, message: `Please select Date` }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item name="deadline" label={<TextLine title={deadline} />}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label={<TextLine title={taskType} />} name="type">
          <TagPicker />
        </Form.Item>
        <Form.Item name="place" label={<TextLine title={place} />}>
          <Input />
        </Form.Item>
        <Form.Item name="estimatedTime" label={<TextLine title={estimatedTime} />}>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label={<TextLine title={taskName} />}
          rules={[{ required: true, message: `Please input your Task Name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="descriptionUrl" label={<TextLine title={taskURL} />}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label={<TextLine title={description} />}>
          <Input />
        </Form.Item>
        <Form.Item
          name="organizers"
          label={<TextLine title={organizers} />}
          rules={[{ required: true, message: `Please input Organizer` }]}
        >
          <OrganizersPicker {...{ api }} />
        </Form.Item>
        <Form.Item name="comment" label={<TextLine title={comment} />}>
          <Input />
        </Form.Item>
        <Form.Item label={<TextLine title={links} />}>
          <LinksList />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddEvent;
