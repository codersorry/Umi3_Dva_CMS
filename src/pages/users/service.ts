import { request } from 'umi';

export const getRemoteList = async () => {
  return request('/api/users', {
    method: 'get',
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editRecord = async (values) => {
  return request(`/api/users/${values.id}`, {
    method: 'put',
    data: values.data
  })
    .then((response) => {
      return '编辑成功';
    })
    .catch((error) => {
      return '编辑失败'
    });
};
