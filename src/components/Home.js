import React from 'react'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import  electro from './electro.jpeg';
import electro2 from './electro2.jpeg';
import jewellery from './Jewlleryimages.jpg';
import menfashion from './menfashon_img.jpg';
import womenfashion from './womenfashion.jpg';
//import jewellery from '.components/Jewlleryimages';
import Navbar from 'react-bootstrap/Navbar';

function Home() {
    const nav=useNavigate();
 const[state,setState]=useState([]);
 //const [wholedata,setwholedata]=useState([])
    // useEffect(()=>{
    //     fetch('http://localhost:3001/get_products').then(
    //         response=>response.json()
    //     ).then(json=>setState(json))
    // },[])

//   const[state1,setState1]=useState([]);
//   useEffect(()=>{
//       fetch('http://localhost:3001/get_jewllery').then(
//           response=>response.json()
//       ).then(json=>setState1(json))
//   },[])


//   const[state2,setState2]=useState([]);
//   useEffect(()=>{
//       fetch("http://localhost:3001/get_men_products").then(
//           response=>response.json()
//       ).then(json=>setState2(json))
//   },[])

//   const[state3,setState3]=useState([]);
//     useEffect(()=>{
//         fetch("http://localhost:3001/get_women_products").then(
//             response=>response.json()
//         ).then(json=>setState3(json))
//     },[])


const navigateHome=()=>
{
    nav("/menu/electronics")
}
const navigatejewellery=()=>
{
    nav("/menu/Jewellery")
}
const navigatemen=()=>
{
    nav("/menu/Men")
}
const navigateWomen=()=>
{
    nav("/menu/Women")
}
    return (
    <div className='homebackground'>
<div className='cardArranged'>

<Card className='mainCard'>
<h1 style={{color:"black"}}><strong>Electronics</strong></h1>
    <div className='menuStyle'>
    <img src={electro} onClick={navigateHome} className="imgSize1"/>
  
                {/* {state.map((e)=>{
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
                })}               */}
              </div>
  <div style={{}}>
{/* <Button variant="primary"  className="showMore" >ShowMore</Button> */}
</div>
  </Card>


 <Card className='mainCard'>
 <h1 style={{color:"black"}}><strong>Jewellery</strong></h1>
             <div className='menuStyle'>
             <img src={jewellery} onClick={navigatejewellery} className="imgSize1"/>
            {/* {state1.map((e)=>{
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
            })}               */}
          </div>
{/* <Button variant="primary"  className="showMore" >ShowMore</Button> */}
        </Card>
  </div>       
<div className='cardArranged'>
<Card className='mainCard'>
<h1 style={{color:"black"}}><strong>Men</strong></h1>
    <div className='menuStyle'>
    <img src={menfashion} onClick={navigatemen} className="imgSize1"/>
                {/* {state2.map((e)=>{
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
                })}               */}
              </div>
{/* <Button variant="primary" className="showMore" >ShowMore</Button> */}
              </Card>


 <Card className='mainCard'>
 <h1 style={{color:"black"}}><strong>Women</strong></h1>
             <div className='menuStyle'>
             <img src={womenfashion} onClick={navigateWomen} className="imgSize1"/>
            {/* {state3.map((e)=>{
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
            })}               */}
          </div>
 {/* <Button variant="primary" className="showMore" >ShowMore</Button> */}
        </Card>
</div>       

    </div>
  )
}

export default Home