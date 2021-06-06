import React, {useEffect, useState } from "react";
import {
  Route,
  Redirect,
 
} from "react-router-dom";
import {useSelector, shallowEqual, connect} from 'react-redux'
import axios from 'axios'

function PrivateRoute({ children, ...rest }) {
    const [isAuth, setIsAuth] = useState(true)


    const {login} = useSelector(
        state => ({
            login: state.auth.login,
        }),
        shallowEqual
    )
    let token = ""
    if (login) {
        if (login.status === 200) {
            token = login.data.token
        }
    }
    
    useEffect(()=>{
        const fetchApi =async () =>{
            try{
                await axios({method: 'get',
                    url: 'http://localhost:8081/check-token/'+token,
                  
                })
                .catch(function (error){
                    setIsAuth(false)
                })
            }
            catch(error){
                setIsAuth(false)
            }
        }
        fetchApi()
    },[token])


    return (
        <Route
        {...rest}
        render={({ location }) =>
        isAuth ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            ) }
        
        />
    );
}

const mapStateToProps = (state) =>({
})

const mapDispatchToProps = dispatch =>({
})


export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute)
