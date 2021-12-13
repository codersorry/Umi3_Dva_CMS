import { Effect, Reducer, Subscription } from 'umi';
import { getRemoteList, editRecord, deleteMsg, addUser } from './service';
import { message } from 'antd';
import { DataType } from './data';

export interface UserState {
    data: DataType[];
    meta: {
        total: number;
        per_page: number;
        page: number
    }
}

interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
    add: Effect
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {
      data: [],
      meta: {
        total: 0,
        per_page: 5,
        page: 1
      }
  },
  reducers: {
    getList(preState, action) {
      return action.payload;
    },
  },
  effects: {
    *getRemote(action, { call, put }) {
      const result = yield call(getRemoteList);
      if (result) {
        yield put({
          type: 'getList',
          payload: result,
        });
      } else {
        // message.error('列表加载失败');
      }
    },
    *edit(action, { call, put }) {
      const { id, data } = action.payload;
      const result = yield call(editRecord, { id, data });
      if (result) {
        message.success('编辑成功');
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('编辑失败');
      }
    },
    *delete(action, { call, put }) {
      const result = yield call(deleteMsg, { id: action.payload.id });
      if (result) {
        message.success('删除成功');
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('删除失败');
      }
    },
    *add(action, { call, put }) {
      const result = yield call(addUser, { data: action.payload.data });
      if (result) {
        message.success('新增成功');
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('新增失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default UserModel;
