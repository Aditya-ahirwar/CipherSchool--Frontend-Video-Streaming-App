import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import YoutubeLogo from '../images/logo.png'
import {Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import Upload from './Upload'
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";

const Container = styled.div`
    margin : 5px;
    display : flex;
    justify-content : space-between;
    padding: 10px;
    align-items : center;
    background-color : grey;
    color : white;
    position  : sticky;
    flex-wrap : wrap;
`
const Logo = styled.div`
    flex 2;
    display : flex;
    align-items : center;
    font-size : 20px;
    gap : 10px
    cursor : pointer;
`
const Img = styled.img`
    height: 50px;
    width : 50px;
    border-radius : 50%;
    object-fit : cover;
`
const Search = styled.div`
    flex : 5;
`
const Input = styled.input`
    width : 90%;
    // widht : 500px;
    align-self : center;
    height : 30px;
    border-radius : 3px;
    border : none;
    outline : none;
`
const User = styled.div`
    flex 1.5;
    justify-content : center;
    gap : 15px;
    display : flex;
    align-items : center;
    font-size : 20px;
    cursor : pointer;
`


const Navbar  = () => {
    const [open, setOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);


  return (
    <>
        <Container>
            <Link  to= '/' style={{textDecoration : 'none', color : "inherit"}}>
            <Logo>
                <Img src={YoutubeLogo}/>
                VStream
            </Logo>
            </Link>
            <Search>
                <Input/>
            </Search>
            {
                currentUser ? 
                ( 
                    <User>
                        <VideoCallOutlinedIcon onClick={() => setOpen(true)}/> 
                        <div> {currentUser.name} </div>
                        <div>{currentUser.role}</div>
                    </User>
                )
                : 
                (<div> Sign In </div>)
            }
        </Container>
        {open && <Upload setOpen={setOpen} />}
    </>
  )
}
export default Navbar