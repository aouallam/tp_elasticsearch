import {
    takeLatest,
    put,
    all,
   
} from 'redux-saga/effects';
import * as fromApi from '../../libs/api/instafee.api';

function* watchGetPosts(action) {
    try{
        const result = yield fromApi.getPosts().then((result) => {return result})
        yield put({type : 'GET_POSTS_RETURN', payload: result})
        
    }catch(error){
        yield put({
            type : 'ERROR',
            error : true,
            payload : error
        })
    }
}
function* watchNewPost(action) {
    try{
        const result = yield fromApi.newPost(action.data, action.token).then((result) => {return result})
        yield put({type : 'NEW_POST_RETURN', payload: result})
        
    }catch(error){
        yield put({
            type : 'ERROR',
            error : true,
            payload : error
        })
    }
}



function* Posts(){
    yield takeLatest('GET_POSTS_SAGAS',watchGetPosts)
    yield takeLatest('NEW_POST_SAGAS',watchNewPost)

}

export default function* rootSaga() {
    yield all([Posts()]);
}

