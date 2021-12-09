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
