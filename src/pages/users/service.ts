import request, { extend } from 'umi-request';
import {message} from 'antd'
import { DataType } from './data';

const errorHandler = function(error: any) {
  if(error.response) {
    if(error.response.status >= 400) {
      message.error(error.data.message ? error.data.message : error.data)
    }
  }else{
    message.error('Network Error.')
  }
}

const extendRequest = extend({ errorHandler })

export const getRemoteList = async () => {
  return extendRequest('/api/users', {
    method: 'get',
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return false
    });
};

export const editRecord = async (values: {id:number, data: DataType}) => {
  return request(`/api/users/${values.id}`, {
    method: 'put',
    data: values.data
  })
    .then((response) => {
      // message.success('编辑成功');
      return true
    })
    .catch((error) => {
      // message.error('编辑失败');
      return false
    });
};

export const deleteMsg = async (values: DataType) => {
  return request(`/api/users/${values.id}`, {
    method: 'delete',
  })
    .then((response) => {
      // message.success('删除成功');
      return true
    })
    .catch((error) => {
      // message.error('删除失败');
      return false
    });
};

export const addUser = async (values: {data: DataType}) => {
  return request(`/api/users`, {
    method: 'post',
    data: values.data
  })
    .then((response) => {
      // message.success('新增成功');
      return true
    })
    .catch((error) => {
      // message.error('新增失败');
      return false
    });
};
