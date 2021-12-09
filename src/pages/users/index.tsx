import React,{useState} from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { connect } from 'umi';

import UserModel from './components/UserModal';

const Index = (props) => {



  const [isVisible, setIsVisible] = useState(false) 
  const [record, setRecord] = useState()

  const handleEdit = (record) => {
    setIsVisible(true)
    setRecord(record)
  }

  const handleClosed = () => {
    setIsVisible(false)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Create_Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={ ()=>{handleEdit(record)} } type="primary">Edit</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];


  return <div className="list-table">
      <Table columns={columns} dataSource={props.users.data} rowKey="id" />
      <UserModel isVisible={isVisible} handleClosed={handleClosed} record={record}></UserModel>
  </div>;
};

const mapStateToProps = users => users


export default connect(mapStateToProps)(Index)
