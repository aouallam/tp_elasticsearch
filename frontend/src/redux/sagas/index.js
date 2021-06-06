import { fork } from 'redux-saga/effects';
import postsSagas from './posts.sagas'
import authSagas from './auth.sagas'


function* rootSaga(){
    yield fork(postsSagas)
    yield fork(authSagas)
}

export default rootSaga
