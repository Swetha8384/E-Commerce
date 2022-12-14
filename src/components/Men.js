import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { BsCartPlus } from "react-icons/bs";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Men(props) {

    const[state,setState]=useState([]);
    const [wholemenproduct,setwholemenproduct]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3006/api/get_men_products").then((response) => {
        setwholemenproduct(response.data)
      });
    },[])

    var menprodarr=[]
console.log(wholemenproduct,'wholemenproduct')
if(wholemenproduct.length>0)
{
for(var i=1;i<wholemenproduct.length;i++)
{
  const b64Data = btoa(
    String.fromCharCode(...new Uint8Array(wholemenproduct[i].image.data.data))
    );
    var userAvatarData = {
      //key: 'userAvatar',
      value: `data:image/jpg/jfif/webp/png;base64,${b64Data}`
  };   
  menprodarr.push(userAvatarData.value)
}
}

const [index, setindex] = useState(1);
const [show, setShow] = useState(false);
const [data1, setData1] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (item,index) => {
    setData1(item)
    setShow(true);
    setindex(index)
  }
    const cartHandler=(item)=>{
      var data={image:item,product:wholemenproduct[index].product_name,price:wholemenproduct[index].price,quantity:1}
      var ab=localStorage.getItem('cartdata')
      let abc=JSON.parse(ab);
    
     if(abc===null)
     {
      let tempe=[]
      tempe.push(data)
      localStorage.setItem('cartdata',JSON.stringify(tempe))
     }
     else{
     
      abc.push(data)
      localStorage.setItem('cartdata',JSON.stringify(abc))
     }
    
      
      fetch("http://localhost:3006/api/cart/cart", {
       method: "POST", 
      body: JSON.stringify( data),
      headers: {
       "Content-type": "application/json; charset=UTF-8"
      }
      })
     .then(response => response.json())
     .then(json => console.log(json,'post cartdata'));
 }
  return (
    <div className='categeoriesBackground'>
               {
menprodarr.map((item,index)=>
{
 
  return(<div className='Menproducts'>
    
  
   <Card className="MenCard">
     <div className='content'>
      
       <div >
                <h5 className='titleEclipsis'>
                {wholemenproduct[index].product_name}
                </h5>
                <h6><strong>Rs.{wholemenproduct[index].price}</strong></h6>
                <h1>{<img src={item} className="imgSize"/>}</h1>
                </div>
                <div className="buttons">
                <Button variant="warning" className="addCart" onClick={()=>cartHandler(item)}><BsCartPlus/>AddToCart</Button>
                <Button variant="info" className="info" onClick={()=>handleShow(item,index)}>Info</Button>
                </div>
             
            </div>
                </Card>
    </div>)
})
 }
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h6>{data1.description}</h6> 
        {wholemenproduct.length>0?<>  <h6>{wholemenproduct[index].description}</h6></>:<></>
         }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    {/* <div>
        <div className='overal'>
        <div className='container1'>
            {state.map((e)=>{
                return(
                    <>
    <Card className="menCard">
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
            
    </div> */}
    </div>
  )
}

export default Men