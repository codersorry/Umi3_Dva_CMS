import { Effect, Reducer, Subscription } from 'umi';
import {getRemoteList, editRecord} from './service'

interface UserModelType {
    namespace: 'users';
    state: {};
    reducers: {
        getList: Reducer,
    };
    effects: {
        getRemote: Effect
    };
    subscriptions: {
        setup: Subscription
    }
}

const UserModel: UserModelType = {
    namespace: 'users',
    state: {},
    reducers: {
        getList(preState, action) {
           return action.payload
        }
    },
    effects: {
        *getRemote(action, {call, put}) {
            const data = yield call(getRemoteList);
            yield put({
                type: 'getList',
                payload: data
            })
        },
        *edit(action, {call, put}) {
            const { id, data } = action.payload
           const editMsg = yield call(editRecord, {id, data})
           alert(editMsg)
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen( (location, action) => {
                if(location.pathname === '/users') {
                    dispatch({
                        type: 'getRemote',
                    })
                }
            } )
        }
    }
}

export default UserModel