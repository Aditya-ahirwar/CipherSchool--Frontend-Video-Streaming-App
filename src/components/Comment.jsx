import styled from 'styled-components';
import axios from "axios";
import React, { useEffect, useState } from "react";

const Container = styled.div`
display : flex;
flex-direction : row;
gap : 10px;
padding : 5px;
margin-bottom : 10px;
background-color : rgb(242, 242, 240)
`
const Details  = styled.div``
const CommentBy = styled.h3``

const Comment = ({comment}) => {

    const [channel, setChannel] = useState({});
    useEffect(() => {
        const fetchComment = async () => {
          const res = await axios.get(`/user/find/${comment.userId}`);
          setChannel(res.data)
        };
        fetchComment();
      }, [comment.userId]);



    return(
        <Container>
            <img src={channel.img}
                width =" 50px" height = "50px" border-radius = "50%"/>
            <Details>
                <CommentBy>{channel.name}</CommentBy>
                {comment.desc}
            </Details>
        </Container>
    )
}
export default Comment;
