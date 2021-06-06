import {
    takeLatest,
    put,
    all,
   
} from 'redux-saga/effects';
import * as fromApi from '../../libs/api/instafee.api';

function* watchGetLogin(action) {
    try{
        const result = yield fromApi.Login(action.data).then((result) => {return result})
        yield put({type : 'LOGIN_RETURN', payload: result})
        
    }catch(error){
        yield put({
            type : 'ERROR',
            error : true,
            payload : error
        })
    }
}

function* watchGetRegister(action) {
    try{
        const result = yield fromApi.Register(action.data).then((result) => {return result})
        yield put({type : 'REGISTER_RETURN', payload: result})
        
    }catch(error){
        yield put({
            type : 'ERROR',
            error : true,
            payload : error
        })
    }
}



function* Posts(){
    yield takeLatest('LOGIN_SAGAS',watchGetLogin)
    yield takeLatest('REGISTER_SAGAS',watchGetRegister)

}

export default function* rootSaga() {
    yield all([Posts()]);
}

