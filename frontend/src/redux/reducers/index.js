import {combineReducers} from 'redux'
import posts from './posts.reducers'
import auth from './auth.reducers'


const rootReducer = combineReducers({
    posts: posts,
    auth: auth
})

export default rootReducer
