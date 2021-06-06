import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as fromActions from '../redux/actions'

const Register =({RegisterUser, resultRegister}) =>{
    const history = useHistory()
    const [state, setState] = useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        email:"",
        password:""
    })
    const [send, setSend] = useState(false)

    const handleChange = (e) =>{
        setState((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    
    const handleSubite = (e) =>{
        e.preventDefault()
        RegisterUser(state)
        setSend(true)
    }

    useEffect(()=>{
        if (send) {
            if (resultRegister.status === 201) {
                setTimeout(function(){ 
                    history.push('/login')
                }, 3000)
                
            }
        }

    },[resultRegister, send,history])

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
                            Inscription
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubite} >
                                <Row className="m-0">
                                    <Col xs="6" >
                                        <FormGroup >
                                            <Label>Prénom:</Label>
                                            <Input
                                                type="text"
                                                placeholder="ex: Nedjma"
                                                required
                                                name="first_name"
                                                value={state.first_name}
                                                onChange={handleChange}
                                                className="round"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6" >
                                        <FormGroup >
                                            <Label>Nom:</Label>
                                            <Input
                                                type="text"
                                                placeholder="ex: LAOUFI"
                                                required
                                                name="last_name"
                                                value={state.last_name}
                                                onChange={handleChange}
                                                className="round"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
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
                                    </Col>
                                    <Col xs="12">
                                        <FormGroup >
                                            <Label>Téléphone:</Label>
                                            <Input
                                                type="text"
                                                placeholder="ex: 0732564789"
                                                required
                                                name="phone_number"
                                                value={state.phone_number}
                                                onChange={handleChange}
                                                className="round"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12">
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
                                    </Col>
                                </Row>
                                
                                
                                
                                
                                <div className='text-success'>
                                    {
                                        send && resultRegister.status === 201 ? "Votre compte est bien créé vous allez être redirigés dans 3 secondes" : null
                                    }
                                     
                                </div>
                                <div className='text-danger'>
                                    {
                                        send && resultRegister.status !== 201 ? "***" + resultRegister.data.error : null
                                    }
                                     
                                </div>
                                <div className="d-flex justify-content-end">
                                <Button color="primary" className="round" type="submit" >
                                    Je m'inscris
                                </Button>
                                <Button color="danger" className="ml-2 round" type="submit" >
                                    Retour à la connexion
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
    resultRegister : state.auth.register
})

const mapDispatchToProps = dispatch =>({
    RegisterUser : (x) => dispatch(fromActions.registerSagas(x)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Register);
