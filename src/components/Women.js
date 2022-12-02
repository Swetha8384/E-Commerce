import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { BsCartPlus } from "react-icons/bs";
import {useNavigate} from 'react-router-dom';

function Women(props) {

    const[state,setState]=useState([]);
   const[count,Setcount]=useState(state.length)

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products/category/women's%20clothing").then(
            response=>response.json()
        ).then(json=>setState(json))
        .catch(err=>
          alert(err.message)
          )
    },[])

    const [show, setShow] = useState(false);
    const [data1, setData1] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setData1(e)
        setShow(true);
    }
    const cartHandler=(e)=>{
      e.quantity = 1;
        console.log(e);
        let a= localStorage.getItem("id");
        if (a==null){
            a=JSON.stringify([]);
        
        }
        let b= JSON.parse(a);
        b.push(e);
        localStorage.setItem("id",JSON.stringify(b))
        props.Setcount(b.length)
        console.log(b.length);
     }  
  return (
    <div className='categeoriesBackground'>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Description</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <h6>{data1.description}</h6> 
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>


    <div className='overal11'>
        <div >
        <div className='container1'>
            {state.map((e)=>{
                return(
                    <>

    <Card className='womenCard'>
     <div className='content'>
                <div key={e.id}>
                    <h5 className='titleEclipsis'>{e.title}</h5>
                    <h6><strong>Rs.{e.price}</strong></h6>
                <h1>{<img src={e.image} className="imgSize"/>}</h1>
                </div>
                <div className="buttons">
                <Button variant="warning" className="addCart" onClick={()=>cartHandler(e)}><BsCartPlus/>AddToCart</Button>
                <Button variant="info" className="info" onClick={()=>handleShow(e)}>Info</Button>
                </div>
                </div>
            </Card>
                </>
                )
            })}
            </div>

        </div>
            
    </div>
    </div>
  )
}

export default Women