import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import Header from '../components/header/Header'
import CardPost from '../components/posts/card.post'
import * as fromActions from '../redux/actions'
import axios from 'axios'
import ClickOutside from '../components/widgets/clickOutside.widget'

const App =({GetPosts, posts, NewPost, authInfos}) =>{
  const [word, setWord] =useState("")
  const [search, setSearch] =useState([])
  const [show, setShow] =useState(false)
  const [tape, setTape] =useState(false)

  useEffect(()=>{
    if (search.length && tape) {
      setShow(true)
    }
  },[search,tape])

  useEffect(()=>{
    GetPosts()
  },[GetPosts])

  const onTape =(e) =>{
    setWord(e.target.value)
    setTape(true)
  }

  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        await axios({
          method: 'post',
          url: `http://localhost:8081/api/instafee/v1/search/posts?tosearch=${word}`,
        })
        .then(response => {
          setSearch(response.data)
        })
        .catch(error => {
          setSearch([])
        })
      }
      catch(error){
        setSearch([])
      }
    }
    if (tape) {
      fetchData()
    }
    
  },[word, tape])

  let data = []
  if (posts.status === 200) {
    data = posts.data
  }
  

  const [description, setDescription] = useState("")
  const [img, setImg] = useState([])
  let token = ""
  if (authInfos) {
    if (authInfos.status === 200) {
      token = authInfos.data.token
    }
  }

  const onFileChange =(e) => {
    setImg(e.target.files[0])
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const dataForm = new FormData() 
    dataForm.append('image_link',img )
    dataForm.set("text",description)
    NewPost(dataForm, token)
    window.location.reload(false);
  } 


  return (
    <>
      <Header/>
      <Row className="m-0">
        <Col lg="7" md="12"  className=" d-flex justify-content-lg-end justify-content-center">
          
          <div className="input-container">
            <Input
              value={word}
              onChange={onTape}
              placeholder="Tapez un mot pour lancer la recherche" 
              className="input-search" 
            />
            {
            (show) && (
              <ClickOutside setSearch={setSearch} setShow={setShow} setTape={setTape}>
                <div className="search-suggestions shadow">
                  
                  {
                    search.map(item =>(
                      <Row key={item.uuid} className="m-0 suggestion-container">
                        <Col xs="3" className="d-flex justify-content-center my-1">
                          <div>
                            <img src={item._source.image_link ? JSON.parse(item._source.image_link)["64x64"] : ""} alt="test" />
                          </div>
                        </Col>
                        <Col xs="9" className="my-1">
                          <div>{item._source.text}</div>
                          <div className="font-weigth-bold font-weight-bold">
                            @{item._source.user.first_name}  {item._source.user.last_name}
                          </div>
                        </Col>
                      </Row>
                    ))
                  }
                    
                  
                </div>
              </ClickOutside>
              )
            }
          </div>
            
          
          
        </Col>
        <Col lg="7" md="12" className="d-flex justify-content-lg-end justify-content-center">
          
          <div>
            {
              data.map(post =>(
                <CardPost
                key={post.uuid}
                pseudo={post.user.first_name + " " + post.user.last_name}
                avatar="https://d3g9pb5nvr3u7.cloudfront.net/authors/59a8352c7c10692ef40bb0c2/-1237364121/256.jpg" 
                image={JSON.parse(post.image_link)["676x400"]}
                description = {post.text}
                likes = {post.likes.length}
                comments= {post.comments}
                />    
              ))
            }
          </div>
            
        </Col>
        <Col lg="5" md="12" className="">
          <div>
            <Card>
              <CardTitle className="p-3 text-center border-bottom">
                <h3>
                  Ajouter une publication
                </h3>
              </CardTitle>
              <CardBody>
                <Form onSubmit={submitHandler} >
                  <FormGroup >
                      <Label>Description</Label>
                      <Input
                          type="textarea"
                          placeholder="ex: Très belle journée ... "
                          required
                          name="description"
                          onChange={(e)=>setDescription(e.target.value)}
                          className="round"
                      />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Image</Label>
                    <Input
                     type="file" 
                     name="file"
                     accept="image/png, image/gif, image/jpeg"
                     required
                     id="exampleFile" 
                     onChange={onFileChange}
                     />
                    <FormText color="muted">
                      Une image représentatif de votre journée
                    </FormText>
                  </FormGroup>
                  
                  <div className="d-flex justify-content-end">
                  <Button color="primary" className="round" type="submit" >
                    Publier
                  </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
      
    
    </>
  )

 
}

const mapStateToProps = (state) =>({
  posts : state.posts.list,
  authInfos : state.auth.login
})

const mapDispatchToProps = dispatch =>({
  GetPosts : () => dispatch(fromActions.getPostsSagas()),
  NewPost : (x,y) => dispatch(fromActions.newPostSagas(x,y)),
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
