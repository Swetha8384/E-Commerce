import React ,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { RiLoginCircleFill } from "react-icons/ri";
import axios from "axios";
const Login = ()=>{
  const nav=useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const submitButton=()=>{
  console.log(email,password)  
  nav("/menu")
  var ab={"email":email,"password":password}
  localStorage.setItem('logindata',JSON.stringify(ab))
  fetch("http://localhost:3006/api/login/register", {
      method: "POST", 
    // Adding body or contents to send
    body: JSON.stringify({
      email: email,
    password:password
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 // Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));
}
    return(
        <>
        <div className='loginBackground'>
        <div className='loginCard'>
          <center>
        <Card className="image1" >
        <Card.Header  className="loginCardHeader"> <strong><RiLoginCircleFill/>LogIn Form</strong></Card.Header>
      <Card.Body>
           <Form>
        <center>
           <Form.Group className="emailLabel" controlId="formBasicEmail" >
            <Form.Control type="email" name="email" value={email}  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>
        
          <Form.Group className="passwordLabel" controlId="formBasicPassword" >
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          </center>
          <label className="loginButton">
          <Button variant="secondary" onClick={submitButton}>SignIn</Button>
          </label>
          </Form>
      </Card.Body>
    </Card>
    </center>
    </div>
      </div>
      </>        
    )
    };
    export default Login;