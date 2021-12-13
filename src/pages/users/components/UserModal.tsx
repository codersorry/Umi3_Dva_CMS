import React, { useEffect, FC } from 'react';
import { Modal, Form, Input, message } from 'antd';
import {DataType} from '../data'

interface UserModalProps {
  record: DataType | undefined;
  isVisible: boolean;
  handleClosed: ()=>void
  onFinish: (data: DataType)=>void
}

const UserModal: FC<UserModalProps>= (props) => {
  const { record, isVisible, handleClosed, onFinish } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    //新增弹窗清空
    if(!record){
      form.resetFields();
    }else{
      form.setFieldsValue(record);
    }
  }, [isVisible]);

  const onOK = () => {
    form.submit();
  };

  const onFinishFailed = (errorinfo: any) => {
    // message.error(errorinfo.errorFields[0].errors[0])
    console.log('Failed:', errorinfo);
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
          onFinish={ (data)=>{ onFinish(data) } }
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
