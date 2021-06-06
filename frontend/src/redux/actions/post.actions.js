export const GET_POSTS_SAGAS = "GET_POSTS_SAGAS";

export const getPostsSagas = () =>({
    type: GET_POSTS_SAGAS,
})

export const NEW_POST_SAGAS = "NEW_POST_SAGAS";

export const newPostSagas = (data, token) =>({
    type: NEW_POST_SAGAS,
    data, token
})
