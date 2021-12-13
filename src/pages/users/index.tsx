import React, { useState, FC } from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { connect, Loading, UserState, Dispatch } from 'umi';
import { DataType } from './data';

import UserModel from './components/UserModal';

interface UserPageProps {
  users: UserState[];
  dispatch: Dispatch;
  loading: boolean
}

const UserListPage: FC<UserPageProps> = (props) => {
  console.log(props);

  const [isVisible, setIsVisible] = useState(false);
  const [record, setRecord] = useState<DataType | undefined>();

  const handleEdit = (record: DataType) => {
    setIsVisible(true);
    setRecord(record);
  };

  const handleClosed = () => {
    setIsVisible(false);
  };

  const onFinish = (data: DataType) => {
    if (record) {
      //编辑
      props.dispatch({
        type: 'users/edit',
        payload: {
          id: record.id,
          data,
        },
      });
    } else {
      //增加
      props.dispatch({
        type: 'users/add',
        payload: {
          data,
        },
      });
    }
    setIsVisible(false);
  };

  //删除确认
  function confirm(id: number) {
    props.dispatch({
      type: 'users/delete',
      payload: {
        id,
      },
    });
  }

  //新增打开弹窗
  function addUser() {
    setIsVisible(true);
    //把record置空
    setRecord(undefined);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: any) => <a>{text}</a>,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
      align: 'center',
    },
    {
      title: 'Create_Time',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: DataType) => (
        <Space size="middle">
          <Button
            onClick={() => {
              handleEdit(record);
            }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="你确认要删除吗？"
            onConfirm={() => {
              confirm(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      align: 'center',
    },
  ];

  return (
    <div className="list-table">
      <Button onClick={addUser} type="primary">
        Add
      </Button>
      <Table
        loading={props.loading.models.users}
        columns={columns}
        dataSource={props.users.data}
        rowKey="id"
      />
      <UserModel
        isVisible={isVisible}
        handleClosed={handleClosed}
        record={record}
        onFinish={onFinish}
      ></UserModel>
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState[];
  loading: Loading;
}) => ({ users, loading });

export default connect(mapStateToProps)(UserListPage);
