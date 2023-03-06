import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import VideoPlayer from '../components/VideoPlayer'
import Comments from '../components/Comments'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";




const Container = styled.div`
    display : flex;
    flex-direction : row;
    padding : 5px;
    justify-content : space-between;
    flex-wrap : wrap;

`
const Player = () => {


  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const videoRes = await axios.get(`/videos/find/${path}`);
        // const channelRes = await axios.get(
        //   `/users/find/${videoRes.data.userId}`
        // );
        // setChannel(channelRes.data);
        // dispatch(fetchSuccess(videoRes.data));

        await axios.get(`/videos/find/${path}`)
        .then((res) => {
            axios.get(`/user/find/${res.data.userId}`)
            .then((channelRes) => {
              setChannel(channelRes.data);
            }).catch((err) =>console.log(err));
            dispatch(fetchSuccess(res.data));
          }).catch(err => console.log(err));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);



  return (
    <Container>
        <VideoPlayer currentUser = { currentUser} currentVideo = {currentVideo} currChannel = {channel}/>
        <Comments videoId = {currentVideo._id}/>
    </Container>
  )
}
export default Player;