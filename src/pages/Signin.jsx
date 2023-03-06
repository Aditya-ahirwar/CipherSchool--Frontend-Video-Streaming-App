import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth, provider} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  gap : 30px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  // justify-content : flex-start;
  flex-direction: column;
  padding: 20px 50px;
  gap: 10px;
  // border : 2px solid black;
  background-color : RGB(238, 240, 237);
  border-radius : 5px;
-webkit-box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
-moz-box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
box-shadow: -1px 2px 13px 3px rgba(145,134,145,1);
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Roles = styled.div`
display : flex;
flex-direction : row;
width : 100%;
justify-content : space-between;
align-items : center;


`
const Input = styled.input`
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  outline : none;
  border : none;
  border-bottom : 1px solid black;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color : blue;
  color : white;
`;

const SignIn = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const nav = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser){
      nav('/')
    }
  });

  

  const handleSignin = async (e) =>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      
      const res = await axios.post('/auth/signin', 
        JSON.stringify({ name : name, password : password }),
        {headers:{"Content-Type" : "application/json"}});
        dispatch(loginSuccess(res.data));
      console.log("success");
      console.log(res);
      nav('/')
    } catch (err) {
      dispatch(loginFailure());
    }
  }

  const googleSignIn = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
            role : "student",
            password : "googleAuth"
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            nav("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const handleSignup = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.post('/auth/signup', {name, password, email, role});
      console.log("success");
      console.log(res);
    } catch(err){
      console.log(err);
    }
    

  }



  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleSignin} >Sign in</Button>
        </Wrapper>
        <Wrapper>
          <Button onClick={googleSignIn}> Sign In with Google</Button>
        </Wrapper>
        <Wrapper>
        <Title>Sign up</Title>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <Roles>
          <div>
            <input type="radio" name="role" value="student" onChange={(e) => setRole(e.target.value)}/> Student
            </div>
            <div>
            <input type="radio" name="role" value="creator" onChange={(e) => setRole(e.target.value)}/> Creator
            </div>
        </Roles>
        {/* <Input placeholder="role" onChange={(e) => setRole(e.target.value)}/> */}
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>

    </Container>
  );
};

export default SignIn;