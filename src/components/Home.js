import React from 'react'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import  electro from './electro.jpeg';
import electro2 from './electro2.jpeg';
import Navbar from 'react-bootstrap/Navbar';

function Home() {
    const nav=useNavigate();
 const[state,setState]=useState([]);
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products/category/electronics').then(
            response=>response.json()
        ).then(json=>setState(json))
    },[])
  const[state1,setState1]=useState([]);
  useEffect(()=>{
      fetch('https://fakestoreapi.com/products/category/jewelery').then(
          response=>response.json()
      ).then(json=>setState1(json))
  },[])

  const[state2,setState2]=useState([]);
  useEffect(()=>{
      fetch("https://fakestoreapi.com/products/category/men's%20clothing").then(
          response=>response.json()
      ).then(json=>setState2(json))
  },[])

  const[state3,setState3]=useState([]);
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products/category/women's%20clothing").then(
            response=>response.json()
        ).then(json=>setState3(json))
    },[])


const navigateHome=()=>
{
    nav("/menu/electronics")
}
    return (
    <div className='homebackground'>
<div className='cardArranged'>

<Card className='mainCard'>
<h1 style={{color:"black"}}><strong>Electronics</strong></h1>
    <div className='menuStyle'>
    <img src={electro} onClick={navigateHome} className="imgSize1"/>
  
                {state.map((e)=>{
                 return(
                         <>
               <Card className='menuCard'>
               <div className='content'>
                   <div key={e.id}>
                     <h1>{<img src={e.image} className="imgSize1"/>}</h1>
                     </div>
                     </div>
                 </Card>
                
                     </>
                   )
                })}              
              </div>
  <div style={{}}>
<Button variant="primary"  className="showMore" >ShowMore</Button>
</div>
  </Card>


 <Card className='mainCard'>
 <h1 style={{color:"black"}}><strong>Jewellery</strong></h1>
             <div className='menuStyle'>
            {state1.map((e)=>{
                return(
                    <>
     <Card className="menuCard">
     <div className='content'>
        <div key={e.id}>
                <h1>{<img src={e.image} className="imgSize1"/>}</h1>
                </div>
                </div>
                </Card>
                </> 
                )
            })}              
          </div>
<Button variant="primary"  className="showMore" >ShowMore</Button>
        </Card>
  </div>       
<div className='cardArranged'>
<Card className='mainCard'>
<h1 style={{color:"black"}}><strong>Men</strong></h1>
    <div className='menuStyle'>
                {state2.map((e)=>{
                 return(
                         <>
               <Card className='menuCard'>
               <div className='content'>
                   <div key={e.id}>
                     <h1>{<img src={e.image} className="imgSize1"/>}</h1>
                     </div>
                     </div>
                 </Card>
                
                     </>
                   )
                })}              
              </div>
<Button variant="primary" className="showMore" >ShowMore</Button>
              </Card>


 <Card className='mainCard'>
 <h1 style={{color:"black"}}><strong>Women</strong></h1>
             <div className='menuStyle'>
            {state3.map((e)=>{
                return(
                    <>
     <Card className="menuCard">
     <div className='content'>

                <div key={e.id}>
                <h1>{<img src={e.image} className="imgSize1"/>}</h1>
                </div>
                </div>
                </Card>
                </> 
                )
            })}              
          </div>
 <Button variant="primary" className="showMore" >ShowMore</Button>
        </Card>
</div>       

    </div>
  )
}

export default Home