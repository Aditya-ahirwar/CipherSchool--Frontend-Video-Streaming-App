import styled from 'styled-components';
import Comment from '../components/Comment'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Container = styled.div`
flex : 1;
display : flex;
flex-direction : column;
margin : 5px;
height : 85vh;
gap : 10px;
border-radius : 5px;
-webkit-box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
-moz-box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
padding : 10px;
overflow : scroll;
::-webkit-scrollbar {
    display: none;
  }
`

const AddComment = styled.div`
    display : flex;
    align-items : center;
    gap : 10px;
    margin-top : 10px;
    background-color : rgb(242, 242, 240);
`
const TypeComment = styled.input`
border : none;
border-bottom : 1px solid grey;
outline : none;
background-color : transparent;
width : 100%;
`
 

const CommentItems = styled.div``


const Comments = (prop) => {
  const videoId = prop.videoId;


  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`)
        .then((res) => {
          setComments(res.data);
        }).catch((err) => console.log(err));
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);


  return (
    <Container>
        <AddComment>
            <img src= {currentUser.img}
                width =" 50px" height = "50px" border-radius = "50%"/>
            <TypeComment placeholder='Add Comment'/>
        </AddComment>
        <CommentItems>
            {comments.map(comment=>(
            <Comment key={comment._id} comment={comment}/>
            ))}
            
        </CommentItems>
        
    </Container>
  )
}

export default Comments;