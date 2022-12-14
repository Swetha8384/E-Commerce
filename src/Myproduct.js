import React from 'react'
import {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';


function Myproduct() {
    const[productname,setProductname]=useState('');
    const[productprice,setProductprice]=useState('');
    const[productimage,setProductimage]=useState('');
    const[productinfo,setProductinfo]=useState('');
    const addproduct=()=>{

        console.log(productname,productprice,productimage,productinfo)
    }
    const submitButton=()=>{
        alert("submit")
    }
  return (
    <div>
          <center>
        {/* <Card className="product1" >
      <Card.Body> */}
           <Form>
        <center>
            <input type="text" value={productname}   placeholder="Enter productname" onChange={(e)=>setProductname(e.target.value)}    classname='inputBox' />
            <input type="text" value={productprice}   placeholder="Enter productprice" onChange={(e)=>setProductprice(e.target.value)}  classname='inputBox'/>
            <input type="text"  value={productimage}  placeholder="Enter productimage" onChange={(e)=>setProductimage(e.target.value)}  classname='inputBox'/>
            <input type="text"  value={productinfo}  placeholder="Enter productinfo" onChange={(e)=>setProductinfo(e.target.value)}    classname='inputBox'/>
           {/* <button onClick={addproduct}>addproduct</button> */}
          </center>
          <Button variant="secondary" onClick={submitButton}>Submit</Button>
          </Form>
      {/* </Card.Body>
    </Card> */}
    </center>
    </div>
  )
}

export default Myproduct;
