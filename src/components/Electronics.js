import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsCartPlus } from "react-icons/bs";
import axios from 'axios'

function Electronics(props) {

  const[state,setState]=useState([]);
  const[bi,setbi]=useState([])
  const [wholedata,setwholedata]=useState([])
  useEffect(()=>{
   
    axios.get("http://localhost:3006/api/get_products").then((response) => {
      setwholedata(response.data);
      console.log(response.data)
    });
},[])
var temparr=[]
console.log(wholedata,'wholedata')
if(wholedata.length>=0)
{
for(var i=0;i<wholedata.length;i++)
{
  
  const b64Data = btoa(
    String.fromCharCode(...new Uint8Array(wholedata[i].image.data.data))
    );
    var userAvatarData = {
      key: 'userAvatar',
      value: `data:image/jpg/jfif/webp/png;base64,${b64Data}`
  };   
temparr.push(userAvatarData.value)

}
}

const [index, setindex] = useState(1);
const [show, setShow] = useState(false);
const [data1, setData1] = useState('');
const [cartdata,setcartdata]=useState();
  const handleClose = () => setShow(false);
  const handleShow = (item,index) => {
    setData1(item)
    setShow(true);
    setindex(index)
  }
  const ByHandler=()=>{
    alert("ok")
  }
  const cartHandler=(item,index)=>{



  var data={image:item,product:wholedata[index].product_name,price:wholedata[index].price,quantity:1}
  var data1={image:item,product:wholedata[index].product_name,price:wholedata[index].price,quantity:1}
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
// Adding body or contents to send
body: JSON.stringify( data),
 
// Adding headers to the request
headers: {
    "Content-type": "application/json; charset=UTF-8"
}
})
// Converting to JSON
.then(response => response.json())
// Displaying results to console
.then(json => console.log(json,'post cartdata'));
 }
//  axios.post("http://localhost:3001/cart",{data}).then((response) => {
//   setcartdata(response.data);
//   console.log(response.data,'cartdata')
// });
  
  return (
        
        <div className='categeoriesBackground'>
           
        {
temparr.map((item,index)=>
{
 
  return(<div className='Electronicproducts'>
    
  
   <Card className="electronicCard">
     <div className='content'>
      
       <div >
                <h5 className='titleEclipsis'>
                {wholedata[index].product_name}
                </h5>
                <h6><strong>Rs.{wholedata[index].price}</strong></h6>
                <h1>{<img src={item} className="imgSize"/>}</h1>
                </div>
                <div className="buttons">
                <Button variant="warning" className="addCart" onClick={()=>cartHandler(item,index)}><BsCartPlus/>AddToCart</Button>
                <Button variant="info" className="info" onClick={()=>handleShow(item,index)}>Info</Button>

                </div>

             
            </div>
                </Card>
    </div>)

    
})

        }
        
            
          {/* {
          indimg.length>0?<> {
            indimg.map((item)=>
            {
           
             return (<div><img src={item} width='200px'/>
             <br></br> </div>)
            })
           }</>:<></>
      
         } */}
              
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {wholedata.length>0?<>  <h6>{wholedata[index].description}</h6></>:<></>
      
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    <div>
        <div className='overal'>
        <div className='container1'>
            {state.map((e)=>{
                return(
                    <>
     {/* <Card className="electronicCard">
     <div className='content'>

                <div key={item.id}>
                <h5 className='titleEclipsis'>
                {item.title}
                </h5>
                <h6><strong>Rs.{item.price}</strong></h6>
                <h1>{<img src={item.image} className="imgSize"/>}</h1>
                </div>
                <div className="buttons">
                <Button variant="warning" className="addCart" onClick={()=>cartHandler(item)}><BsCartPlus/>AddToCart</Button>
                <Button variant="info" className="info" onClick={()=>handleShow(item)}>Info</Button>
                </div>
                </div>
                </Card> */}
                </>
                )
            })}              
          </div>
        </div>       
    </div>
    
    </div>
    // </>
  )
}

export default Electronics;