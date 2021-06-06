import React from 'react';
import {
  Card, CardBody, CardHeader
} from 'reactstrap';
import PostButton from '../posts/button-post'

const Index = ({avatar, pseudo, image, description, likes, comments}) => {
  return (
    <div>
        <Card className="mb-3" style={{maxWidth:"614px"}}>
            <CardHeader>
            <div className="Post-user d-flex align-items-center">
                <div className="Post-user-avatar">
                    <img src={avatar} alt={pseudo} />
                </div>
                <div className="Post-user-nickname">
                    <span>{pseudo}</span>
                </div>
            </div>
            </CardHeader>
            <CardBody className="p-0">
                <div className="Post-image">
                    <div className="Post-image-bg">
                        <img className="img-fluid" alt="img" src={image} />
                    </div>
                </div>
                <PostButton />
                <div className="ml-3 mt-1 font-weight-bold">{likes} J'aime</div>
                <div className="ml-3"> <span className="mr-1 font-weight-bold">{pseudo}</span> {description} </div>
                {
                    comments.lenth!== 0 && (
                        <div className="ml-3 mt-1">
                            {
                                comments.map((comment)=>(
                                    <div key={comment.uuid} className="mt-1">
                                        <span className="h6 mr-1 font-weight-bold">
                                            {
                                                comment.user.first_name[0].toLowerCase()+comment.user.last_name.toLowerCase()
                                            }
                                        </span>
                                        
                                        <span className="" >
                                            {
                                                comment.content
                                            }
                                        </span>
                                    </div>
                                ))
                            }
                            
                        </div>
                    )
                }
            </CardBody>
        </Card>
    </div>
  );
};

export default Index;