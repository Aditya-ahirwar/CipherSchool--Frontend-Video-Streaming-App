import React from 'react';
import { useEffect, useState } from 'react';
import Video from '../components/Video';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display : flex;
  flex-wrap : wrap;
`

const Home = (prop) => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      axios.get(`/videos/random`)
      .then((res) => { 
        setVideos(res.data);
      }).catch((err) => { console.log(err)})
      
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if(!currentUser){
      nav('/signin')
    }
  }, []);

  return (
    <Container>
      {videos.map((video) => (
        <Video key={video._id} video={video}/>
      ))}
      
    </Container>
  )
}

export default Home;