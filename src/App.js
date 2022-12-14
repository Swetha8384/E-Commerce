import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Menu from './components/Navbar';
import Electronics from './components/Electronics';
import Jewellery from './Jewellery';
import Men from './components/Men';
import Myprofile from './components/Myprofile';
import Women from './components/Women';
import Cart from './components/Cart';
import Myproduct from './Myproduct';
import {Routes,Route,Navigate, Link, Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="App">
         {/* <Login/>  */}
      {/* <Home/>  */}
      {/* <Menu/> */}
      {/* <Electronics/>
      <Jewellery/>
      <Men/>
      <Women/>
      <Cart/> */}
      <Link to="/"/>
     
 <Routes>
 <Route path='/' element={<Login/>} />   

 <Route path="/menu" element={<Menu />}  >
 <Route path='/menu'  element={<Navigate to="/menu/home" replace />}/>
 <Route path="/menu/home" element={<Home/>}/>

 <Route path="/menu/electronics" element={<Electronics  />}/>
 <Route path="/menu/jewellery" element={<Jewellery />}/>
 <Route path="/menu/men" element={<Men />}/>
 <Route path="/menu/Myprofile" element={<Myprofile/>}/>
 <Route path="/menu/Women" element={<Women />}/>
 <Route path="/menu/cart" element={<Cart  />}/>
 <Route path="/menu/Myproduct" element={<Myproduct  />}/>
 </Route>
 </Routes>
</div>
  );
}

export default App;
