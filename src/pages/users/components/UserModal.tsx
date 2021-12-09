import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = (props) => {
  const { record, isVisible, handleClosed} = props

  const [form] = Form.useForm();

  useEffect( () => {
    form.setFieldsValue(record);
  }, [isVisible] )

  return (
    <div>
      <Modal
        visible={isVisible}
        onOk={handleClosed}
        onCancel={handleClosed}
        record={record}
        forceRender
      >
        <Form name="basic" initialValues={record} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Create Time" name="create_time">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
