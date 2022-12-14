import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from "react-bootstrap/Table";
import { MdSecurityUpdateGood } from 'react-icons/md';


function Cart() {
 
     const [items, setItems] = useState(JSON.parse(localStorage.getItem("cartdata"))); 

     console.log(items,'items')
  const [number, setNumber] = useState(1); //number of item
  const [price, setprice] = useState(1);
  const [quantity,setquantity]=useState(1);
  const totalprice = price * quantity;
const updateQuantityminus=(index)=>
{
// totalprice > 1 ? setTotalprice(totalprice-1) : setTotalprice(1);
  var c;
var temp=[]
    setpage(true)
      temp=items;
        var c=temp[index].quantity
  --c
  temp[index].quantity=c
  console.log(temp[index].quantity)
 
 setItems(temp)
}
const updateQuantityplus=(index)=>
{
  // totalprice < items ? setTotalprice(totalprice +1) : setTotalprice(items);
  var temp=[]
  setpage(true)
  temp=items;
  var c=temp[index].quantity
  ++c
  temp[index].quantity=c
  console.log(temp[index].quantity)
 setItems(temp)
  
}
  const [page,setpage]=useState(false)
  const removefunc=(index)=>
  {
 
    var temp=[]
    setpage(true)
    temp=items;

    temp.splice(index,1)
    console.log(temp)
    setItems(temp)
console.log(index)
  }
  useEffect(()=>
{
  setpage(false)
console.log(items)
},[page,items])
    return ( 
<div className='cartBackBackground'>
  {page===false?<>
    <div>
    <Table striped bordered hover variant="light">   
    <thead className=''>     
        <tr className='tableHead'>
          <th>Image</th>
          <th className='productName'>Product</th>
          <th>Price</th>
          <th>quantity</th>
          <th>Total Price</th>
         <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {items.map((e,index) => (   
        <tr  key={e.id}>
          <td>{<img src={e.image} className="cartimgSize" />}</td>
          <td> <p className='titleEclipsis1'>{e.product}</p></td>
          <td>RS. {e.price}</td>
          
          <td>
            <td>{e.remove}</td>
            <ButtonGroup aria-label="Basic example" className='buttonGroup'>
            <Button variant="info" onClick={()=>updateQuantityminus(index)}>-</Button>
            <Button variant="info">{e.quantity}</Button>
            <Button variant="info"   onClick={() => updateQuantityplus(index)}>+</Button>
            </ButtonGroup>
          </td>
          <td>{e.quantity*e.price}</td>
          <td>
        
          <Button variant="danger" onClick={()=>removefunc(index)} > Remove </Button>   
          </td>
        </tr>
        ))}
      </tbody>
  </Table>
  </div></>:<>
  <div>
    <Table striped bordered hover variant="light">   
    <thead className=''>     
        <tr className='tableHead'>
          <th>Image</th>
          <th className='productName'>Product</th>
          <th>Price</th>
          <th>quantity</th>
          <th>Total Price</th>
         <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {items.map((e,index) => (   
        <tr  key={e.id}>
          <td>{<img src={e.image} className="cartimgSize" />}</td>
          <td> <p className='titleEclipsis1'>{e.product}</p></td>
          <td>RS. {e.price}</td>
          <td>
            <td>{e.remove}</td>
            <ButtonGroup aria-label="Basic example" className='buttonGroup'>
            <Button variant="info" onClick={()=>updateQuantityminus}>-</Button>
            <Button variant="info">{items[index].quantity}</Button>
            <Button variant="info"   onClick={() =>{ updateQuantityplus()}}>+</Button>
            </ButtonGroup>
          </td>
          {/* <td>Rs.1000</td> */}
          <td>
        
          <Button variant="danger" onClick={()=>removefunc(index)} > Remove </Button>   
          </td>
        </tr>
        ))}
      </tbody>
  </Table>
  </div></>}
   
  <br/><br/>
  </div>
    )
}
export default Cart


