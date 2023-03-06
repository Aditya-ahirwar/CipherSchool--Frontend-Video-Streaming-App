import {React, useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Container = styled.div`
    margin: 15px 5px;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    flex-wrap : wrap;
    width : 250px;
    padding : 10px;
    background-color : RGB(227, 232, 230);
    cursor : pointer;
    border-radius : 5px;
    box-sizing : border-box;
`
const Image = styled.img`
width: 100%;
height: 200px;
background-color: #999;
flex: 1;
`
const Info = styled.div`
    display : flex;
    flex-direction : row;
    gap : 15px;
    align-items : center;
    flex : 1;
    margin-top : 5px;

`

const ChannelImage = styled.img`
    height : 50px;
    widht : 50px;
    border-radius : 50%;
`

const Texts = styled.div`

`

const Title = styled.div`
    font-size : 15px;
    font-weight : bold;
    line-height : 80%;
`

const ChannelName = styled.div`
    font-size : 13px;

`

const Data = styled.div`
    font-size : 10px;

`

const Video = (prop) => {
    // console.log(prop)

    const [channel, setChannel] = useState({});

    useEffect(() => {
      const fetchChannel = async () => {
        axios.get(`/user/${prop.video.userId}`)
        .then((res) => { 
          setChannel(res.data);
        }).catch((err) => { console.log(err)})
        
      };
      fetchChannel();
    }, [prop.video.userId]);
  




  return (
    <Link to ={`/player/${prop.video._id}`} style={{textDecoration : 'none', color : "inherit"}}>
        <Container>
            <Image src={prop.video.imgUrl}/>
            <Info>
                <ChannelImage
                    src={channel.img}
                />
                <Texts>
                    <Title>{prop.video.title}</Title>
                    <ChannelName>{channel.name}</ChannelName>
                    <Data>{prop.video.views} views • 1 day ago</Data>
                </Texts>
            </Info>
        </Container>
    </Link>
  )
}
export default Video