import axios from 'axios'

export const Login = async(data) => {
    let results = [];
    try{
        await axios({
            method: 'post',
            url: `http://localhost:8081/api/instafee/v1/login`,
            data: data
        })
        .then(response => results = response )
        .catch(error => results =  error.response )
    }
    catch(error){
        results = error.response.status
    }
    return results
}
export const Register = async(data) => {
    let results = [];
    try{
        await axios({
            method: 'post',
            url: `http://localhost:8081/api/instafee/v1/register`,
            data: data
        })
        .then(response => results = response )
        .catch(error => results =  error.response )
    }
    catch(error){
        results = error.response.status
    }
    return results
}

export const getPosts = async() => {
    let results = [];
    try{
        await axios({
            method: 'get',
            url: `http://localhost:8081/api/instafee/v1/posts/get-all` ,
        })
        .then(response => results = response )
        .catch(error => results =  error.response )
    }
    catch(error){
        results = error.response.status
    }
    return results
}
export const newPost = async(data, token) => {
    let results = [];
    try{
        await axios({
            method: 'post',
            url: `http://localhost:8081/api/instafee/v1/post/create`,
            data: data,
            headers: {
                "x-access-token": token
            }  

        })
        .then(response => results = response )
        .catch(error => results =  error.response )
    }
    catch(error){
        results = error.response.status
    }
    return results
}