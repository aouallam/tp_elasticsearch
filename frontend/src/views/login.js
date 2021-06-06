import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as fromActions from '../redux/actions'

const Login =({LoginUser, resultLogin}) =>{
    const history = useHistory()
    const [state, setState] = useState({
      email:"",
      password:""
    })
    const [send, setSend] = useState(false)

    const handleChange = (e) =>{
        setState((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    
    const handleSubite = (e) =>{
        e.preventDefault()
        LoginUser(state)
        setSend(true)
    }

    useEffect(()=>{
        if (send) {
            if (resultLogin.status === 200) {
                history.push('/')
            }
        }

    },[resultLogin, send,history])

    return (
        <>
            <Row 
            className="m-0" 
            style={{
                minHeight:"100vh", 
                backgroundImage:"url('https://images.pexels.com/photos/1770775/pexels-photo-1770775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920'", 
                backgroundPosition:"center center", 
                backgroundSize:"cover"
                }}
            >
                <Col md="3" sm="12" className="">
                </Col>
                <Col md="6" sm="12"className="d-flex align-items-center ">
                    <Card className="w-100 shadow">
                        <CardTitle className="h2 text-center border-bottom py-2">
                            Se connecter
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubite} >
                                <FormGroup >
                                    <Label>Email:</Label>
                                    <Input
                                        type="email"
                                        placeholder="ex: jpp@gmail.com"
                                        required
                                        name="email"
                                        value={state.email}
                                        onChange={handleChange}
                                        className="round"
                                    />
                                </FormGroup>
                                <FormGroup >
                                    <Label>Mot de passe:</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="entrer un mot de passe!"
                                        required
                                        value={state.password}
                                        onChange={handleChange}
                                        className="round"
                                    />
                                </FormGroup>
                                <div className='text-danger'>
                                    {
                                        send && resultLogin.status !== 200 ? "*** Informations éronnée"  : null
                                    }
                                     
                                </div>
                                <Link to="/register">
                                    Je n'ai pas de compte je souhaite m'inscrire
                                </Link>
                                <div className="d-flex justify-content-end">
                                <Button color="primary" className="round" type="submit" >
                                    Connexion
                                </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3" sm="12"className="">
                
                </Col>
                
            </Row>
        </>
    )
}

const mapStateToProps = (state) =>({
    resultLogin : state.auth.login
})

const mapDispatchToProps = dispatch =>({
    LoginUser : (x) => dispatch(fromActions.loginSagas(x)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Login);
