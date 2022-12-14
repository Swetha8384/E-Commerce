import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AiFillShopping } from "react-icons/ai";
import { FcElectronics } from "react-icons/fc";
import { GiGemChain } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { GiLoincloth } from "react-icons/gi";
import { MdAccountBox } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet  } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { BsCart } from 'react-icons/bs';
import { FaBars} from "react-icons/fa";
import { MdElectricalServices} from "react-icons/md";
import { FaShoppingBag} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

function Menu() {

  const nav=useNavigate();

  const menuHandler=()=>{
    nav("/menu")
  }

  
  const electonicsHandler=()=>{
    nav("/menu/electronics");
  }

  const jewelleryHandler=()=>{
    nav("/menu/jewellery");
  }

  const menHandler=()=>{
    nav("/menu/men");
  }

  const womenHandler=()=>{
    nav("/menu/women");
  }

  const cartLogo=()=>{
    nav("/menu/cart")
  }

  const Myproducts=()=>{
    nav("/menu/Myproduct")
  }
    const[search,setSearch]=useState('')
    const[Myproduct,setMyproduct]=useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleSubmit=()=>{
      alert("updated successfully")
    }


  return (
    <>

<div>
   
<div>

<Navbar bg="dark" variant="dark"  className='navbarFixing' >
<Container >
  <Navbar.Brand onClick={menuHandler} className='navHeading'>
    <h1><strong><AiFillShopping/>Shoppy</strong></h1>
    </Navbar.Brand>

    <Button variant="dark" onClick={electonicsHandler} className='elecronicsButton'><FcElectronics/><h6 >Electronics</h6></Button><br></br>
    <Button variant="dark" onClick={jewelleryHandler} className='jewelleryButton'><GiGemChain/><h6>Jewellery</h6></Button>
    <Button variant="dark" onClick={menHandler} className='menButton'><GiClothes/><h6>Men</h6></Button>
    <Button variant="dark" onClick={womenHandler}  className='womenButton'><GiLoincloth/><h6>Women</h6></Button>
    {/* <Button variant="dark" onClick={Myproducts}  className='ProductsButton'><h6>Myproducts</h6></Button> */}
<div>
  <Form className="d-flex">
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      name="search"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />
    <Button type="submit" variant="success">Search</Button>
  </Form>
</div>
<div className='Myproducts'>
<Button variant="primary" onClick={Myproducts}>Myproduct <Badge bg="danger" ></Badge></Button>
</div>
  <div className='cart'>
  <Button variant="warning" onClick={cartLogo}><BsCart/>cart <Badge bg="danger" ></Badge></Button>
  </div>
  {/* <div className='account'>
  <Button variant="light" onClick={handleShow}><MdAccountBox/>My profile</Button>
  </div> */}

</Container>
 
</Navbar>
 <div className='navbar2' >
    <Container > 


 <Row>

<Col className='search'>
<Form className="d-flex">
<Form.Control
type="search"
placeholder="Search"
className="search1"
aria-label="Search"
name="search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</Form>
</Col>

</Row>
</Container>
</div>  
    </div>

    <Outlet/> 
</div>
    </>
  );
}

export default Menu;
