import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, DatePicker, Button, Space } from 'antd';
import TagPicker from './TagsPicker';
import OrganizersPicker from './OrganizersPicker';
import LinksList from './LinksList';
import Line from '../line';
import { MODAL_ADD_EVENT_TEXT, EDIT_EVENT_TEXT } from '../../constants/constants';
import { formatEventForModal } from '../../utils/tableHelpers';
import './ModalEvent.scss';

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
      const formattedEvent = formatEventForModal(selectedEvent);
      form.setFieldsValue(formattedEvent);
    }
    if (!displayModal && prevVisible) {
      form.resetFields();
    }
  }, [displayModal]);
};

const ModalEvent = ({
  setDisplayModal,
  displayModal,
  createNewEvent,
  selectedEvent,
  updateEvent,
  fetchDeleteEvent,
  api,
  title,
  fontSize,
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

  const { btnOk, btnSave, btnCancel, btnDelete } = EDIT_EVENT_TEXT;
  const onDelete = (id) => {
    fetchDeleteEvent(id);
  };

  return (
    <Modal
      title={title}
      visible={displayModal}
      onCancel={() => setDisplayModal(false)}
      className={fontSize === 10 ? 'modal-event-sm' : 'modal-event-df'}
      footer={[
        <Space key="space" style={{ width: 'calc(100% - 145px)' }}>
          {createNewEvent ? null : (
            <Button
              key={btnDelete}
              onClick={() => onDelete(selectedEvent.id)}
              type="primary"
              danger
            >
              {btnDelete}
            </Button>
          )}
        </Space>,
        <Button key={btnCancel} onClick={() => setDisplayModal(false)}>
          {btnCancel}
        </Button>,
        <Button key={btnOk} type="primary" onClick={onOk}>
          {createNewEvent ? btnOk : btnSave}
        </Button>,
      ]}
    >
      <Form
        layout={layout}
        onFinish={createNewEvent || updateEvent}
        form={form}
        initialValues={{ week: 0, feedbacks: {}, allowFeedback: true }}
        size={fontSize === 10 ? 'small' : 'default'}
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
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="links" label={<Line title={links} />}>
          <LinksList />
        </Form.Item>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="feedbacks" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="allowFeedback" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ fontSize }) => ({ fontSize });

export default connect(mapStateToProps)(ModalEvent);
