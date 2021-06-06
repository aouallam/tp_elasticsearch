import React, { useState } from 'react';
import { Button } from 'reactstrap';
import {
  Heart,
} from 'react-feather'
import './Post.css'
import ButtonComment from '../modals/comment.modal'

const Index = (props) => {
  const [like, setLike] = useState(false)
  const handleLike = (e) =>{
    setLike(!like)
  }
  return (
    <div className="d-flex justify-content-start">
      <Button outline className="like border-0" onClick={handleLike} color="primary">
        <Heart size={30} color={like ? "red" : "grey"} />
      </Button>{' '}
      <ButtonComment />
    </div>
  );

}

export default Index;