import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
let navigate = useNavigate();
//const [data,setData]=useState([]);
const [firstname,setFirstname]=useState("");
const [lastname,setLastname]=useState("");
const [email,setEmail]=useState(" ");
const [password,setPasswd]=useState(" ");
const [mobile,setMobile]=useState("");
const submit=(e)=>{
e.preventDefault();
// setData({
// firstname:firstname,
// lastname:lastname,
// mail:email,
// password: password,
// mobile:mobile
// })
const a=[];
const data={firstname:firstname,
lastname:lastname,
mail:email,
password: password,
mobile:mobile}


a.push(data)
console.log(a)
localStorage.setItem("details",JSON.stringify(a))
// localStorage.setItem("details",JSON.stringify({
// firstname:firstname,
// lastname:lastname,
// mail:email,
// password: password,
// mobile:mobile}));
localStorage.getItem(JSON.parse('details'))
console.log(firstname,"firstname")
if(firstname==='')
{
alert("enter firstname")
console.log(firstname,"firstname")
}
else if(lastname==='')
{
alert("enter lastname")
}
else
{
alert("success")
console.log(data,"success")
}
}
// console.log(a,"newdata ");
// console.log(data.firstname,"firstname")

const Click=()=>
{


alert("success")
}
return (
<div>

<center>
<h2>Registrationform</h2>
<form action="" onSubmit={submit}>
<div>
<label>Firstname</label>
<input type="text" name="email" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/><br></br><br></br>
</div>
<div>
<label>Lastname</label>
<input type="text" name="email" value={lastname} onChange={(e)=>setLastname(e.target.value)}/><br></br><br></br>
</div>
<div>
<label>Email</label>
<input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br><br></br>
</div>
<div>
<label>Password</label>
<input type="text" name="password" value={password} onChange={(e)=>setPasswd(e.target.value)}/><br></br><br></br>
</div>
<div>
<label>Mobile</label>
<input type="number" name="number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
</div>

<button type="submit" onClick={Click}>submit</button>

<button onClick={()=>navigate('/Student/Login')}>gotologin</button>
</form>
</center>

</div>

)
}

export default Register