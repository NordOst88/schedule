import React from 'react';
import { Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * Uncontrolled component for showing links titles and URL's in the inputs
 * of ModalEvent's form.
 * @component
 */
const LinksList = () => (
  <Form.List name="links">
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field) => (
          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
            <Form.Item
              {...field}
              name={[field.name, 'title']}
              fieldKey={[field.fieldKey, 'title']}
              rules={[{ required: true, message: 'Missing Title' }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, 'url']}
              fieldKey={[field.fieldKey, 'url']}
              rules={[{ required: true, message: 'Missing URL' }]}
            >
              <Input placeholder="URL" />
            </Form.Item>

            <MinusCircleOutlined
              onClick={() => {
                remove(field.name);
              }}
            />
          </Space>
        ))}

        <Form.Item>
          <Button
            type="dashed"
            onClick={() => {
              add();
            }}
            block
          >
            <PlusOutlined /> Add link
          </Button>
        </Form.Item>
      </div>
    )}
  </Form.List>
);

export default LinksList;
