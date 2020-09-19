/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import TagPicker from './TagsPicker';
import OrganizersPicker from './OrganizersPicker';
import LinksList from './LinksList';
import { MODAL_ADD_EVENT_TEXT } from '../../constants/constants';
import Line from '../line';

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

const useResetFormOnCloseModal = ({ form, displayModal, selectedEvent }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = displayModal;
  }, [displayModal]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (displayModal && !prevVisible && selectedEvent) {
      form.setFieldsValue({
        id: selectedEvent.id,
        week: selectedEvent.week,
        dateTime: selectedEvent.dateTime && moment(selectedEvent.dateTime * 1000),
        deadline: selectedEvent.deadline && moment(selectedEvent.deadline * 1000),
        type: selectedEvent.type,
        place: selectedEvent.place,
        estimatedTime: selectedEvent.estimatedTime,
        name: selectedEvent.name,
        description: selectedEvent.description,
        // links: selectedEvent.links,
        selectedOrganizers: selectedEvent.organizer,
        comment: selectedEvent.comment,
      });
    }
    if (!displayModal && prevVisible) {
      form.resetFields();
    }
  }, [displayModal]);
};

const ModalAddEvent = ({
  setDisplayModal,
  displayModal,
  createNewEvent,
  selectedEvent,
  updateEvent,
  api,
}) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    displayModal,
    selectedEvent,
  });

  const onOk = () => {
    form.submit();
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  console.log(selectedEvent);

  return (
    <Modal
      title="Add Event"
      visible={displayModal}
      onCancel={() => setDisplayModal(false)}
      onOk={onOk}
    >
      <Form
        {...layout}
        onFinish={createNewEvent || updateEvent}
        form={form}
        initialValues={{ week: 0 }}
        size="small"
      >
        <Form.Item
          label={<Line title={week} />}
          name="week"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="dateTime"
          label={<Line title={date} />}
          rules={[{ required: true, message: `Please select Date` }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item name="deadline" label={<Line title={deadline} />}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label={<Line title={taskType} />} name="type">
          <TagPicker />
        </Form.Item>
        <Form.Item name="place" label={<Line title={place} />}>
          <Input />
        </Form.Item>
        <Form.Item name="estimatedTime" label={<Line title={estimatedTime} />}>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label={<Line title={taskName} />}
          rules={[{ required: true, message: `Please input your task name` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="descriptionUrl" label={<Line title={taskURL} />}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label={<Line title={description} />}>
          <Input />
        </Form.Item>
        <Form.Item
          name="selectedOrganizers"
          label={<Line title={organizers} />}
          rules={[{ required: true, message: `Please select orginizer` }]}
        >
          <OrganizersPicker {...{ api }} />
        </Form.Item>
        <Form.Item name="comment" label={<Line title={comment} />}>
          <Input />
        </Form.Item>
        <Form.Item label={<Line title={links} />}>
          <LinksList />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddEvent;
