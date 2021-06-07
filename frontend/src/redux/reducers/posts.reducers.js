let initialState = {
    list : [],
    add:[]
}

const Posts = (state = initialState, action) =>{
    switch(action.type)
    {
        case 'GET_POSTS_RETURN':
            return Object.assign({},state,{list: action.payload})
        case 'NEW_POST_RETURN':
            const array = [action.payload.data]
            let newStateAdd
            console.log(action.payload)
            if (action.payload.status === 201) {

                newStateAdd = {...state.list, data:state.list.data.concat(array)}
                
                
            } else{ 
                newStateAdd = state.list
            }


            return Object.assign({},state,{
                add: action.payload,
            })
        
        default:
            return state

    }
}

export default Posts