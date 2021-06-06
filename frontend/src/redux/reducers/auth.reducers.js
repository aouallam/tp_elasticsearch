let initialState = {
    login : [],
    register : [],
}

const Login = (state = initialState, action) =>{
    switch(action.type)
    {
        case 'LOGIN_RETURN':
            return Object.assign({},state,{login: action.payload})
        case 'REGISTER_RETURN':
            return Object.assign({},state,{register: action.payload})
        
        default:
            return state

    }
}

export default Login