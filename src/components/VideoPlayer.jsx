import React from 'react'
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";


const Container = styled.div`
flex : 2;
display : flex;
flex-direction : column;
margin : 5px;
height : 85vh;
gap : 10px;
// background-color : grey;
border-radius : 5px;
-webkit-box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
-moz-box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
padding : 5px;

`
const Wrapper = styled.div`
    flex : 9;
`
const ChannelName = styled.div`
display : flex;
gap : 10px;
align-items : center;
padding : 3px;
`
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.div`
`
const Details = styled.div`
    flex : 1;
    display : flex;
    flex-direction : row;
    // justify-content : space-between;
    gap : 30px;
`
const Buttons = styled.div`
display : flex;
flex-direction : row;
align-items : center;
gap : 10px;
// border : 2px solid red;
`
const Button = styled.button`
display : flex;
flex-direction : row;
align-items : center;
// border : 2px solid red;

`

const  VideoPlayer = (prop) => {

  
  // console.log(prop.currentUser)
  // console.log(prop.currentVideo)
  // console.log(prop.currChannel)

  const dispatch = useDispatch();


  const handleLike = async () => {
    await axios.put(`/user/like/${prop.currentVideo._id}`);
    dispatch(like(prop.currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`/user/dislike/${prop.currentVideo._id}`);
    dispatch(dislike(prop.currentUser._id));
  };

  return (
    <Container>
        <Wrapper>
          <VideoFrame src={prop.currentVideo.videoUrl} controls />
        </Wrapper>
            <Title>
              {prop.currentVideo.title}
            </Title>

        <Details>
            <ChannelName>
                <img src={prop.currChannel.img}
                width =" 50px" height = "50px"/>
                {prop.currChannel.name}
            </ChannelName>
          <Buttons>
            <Button onClick={handleLike}>
                {prop.currentVideo.likes?.includes(prop.currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {prop.currentVideo.likes?.length}
              </Button>
              <Button onClick={handleDislike}>
                {prop.currentVideo.dislikes?.includes(prop.currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{" "}
                Dislike
              </Button>

            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>

              <AddTaskOutlinedIcon /> Save
            </Button>
            <Button>
                <VisibilityIcon/>
                {prop.currentVideo.views} views</Button>
          </Buttons>
        </Details>
    </Container>
  )
}

export default VideoPlayer;