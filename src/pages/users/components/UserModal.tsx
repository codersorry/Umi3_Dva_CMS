import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = (props) => {
  const { record, isVisible, handleClosed, onFinish } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [isVisible]);

  const onOK = () => {
    form.submit();
  };

  const onFinishFailed = errorinfo => {
    console.log('Failed', errorinfo);  
  }

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={isVisible}
        onOk={onOK}
        onCancel={handleClosed}
        forceRender
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          onFinish={ (data)=>{ onFinish(record.id, data) } }
          onFinishFailed={onFinishFailed}
        >
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
