var express=require('express');
const jwt_decode=require('jwt-decode');
// import jwt_decode from "jwt-decode";
var app=express();
var mongoose=require('mongoose');
const Cart=require('./models/cartmodel')
const User=require('./models/user')
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const dotenv = require('dotenv');
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjp7ImVtYWlsIjoiamF5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIiwiX2lkIjoiNjM4NjE1NzNhODZkNGE2YmQ4NzY5YTA5In0sImlhdCI6MTY2OTczMTY5OSwiZXhwIjoxNjcwMjUwMDk5fQ.RDCiGy1bE6DRQJtr2AKaK8iCLZtCEVXEukjeASpU81Q"

var decoded = jwt_decode(token);
 
console.log(decoded.details._id);
app.listen(3002,()=>
{
    console.log("running at 3002")
})

var client=mongoose.connect("mongodb+srv://swetha:swetha10@e-com.7w5kcvb.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true},(err)=>
{
    if(!err) 
    {
        console.log('db connected');
    }
    else
    {
        console.log('db error');
    } 
})


app.post('/login_user',async(req,res)=>
{
   const {email,password}=req.body;
  

   var details=new User(req.body)
   const token=details.getJwtToken(details);
details.save(function (err, data) {
if (err){
return console.error(err);
} else {

res.status(200).json({success:true,data,token:token})

}
})
       
    await jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,
           {
               expiresIn:"6d"
           })

    // if(await bcrypt.compare(password,user.password)){
    //     // creating a JWT token
    //     token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
    //     res.json( {status:'ok',data:token}) }
          //  res.status(200).json({success:true,token})
         
})

app.use(express.json())
app.get('/addtoken',(req,res)=>
{
    res.json("success")
})
// const login_details=await User.find({_id:decoded.details._id})
// await res.send( login_details)
// console.log( login_details)
app.post('/addcart',async(req,res)=>

{
    //console.log(req.body)
   let login_details=await User.findOne({_id:decoded.details._id})
   if(login_details)
   {
    //const login_data = JSON.stringify(req.body.cartitems)
    //login_details.produ.push(login_data)
    // const product=[]
    // login=login_details.produ.push(req.body);
    // console.log(login,"cart")
    // cartdata=Object.entries(login)
    // await res.json(cartdata)
    //  console.log(cartdata,"cartdata")

   login_details.produ.push(req.body);
   console.log(login_details)
   await login_details.save();
      const carti=await User.findOne({product_id:req.body.product_id})
     console.log(carti,"cartitems")
    await res.send( login_details)

   }
   //console.log( login_details)
})

app.get('/getcart',async(req,res)=>
{
    const cartdetails=await User.find();
    res.status(200).json(cartdetails)
})

app.get('/cartbyid/:id',async(req,res)=>
{
    const id=req.params.id;
    const cartbyid=await User.find({_id:id})
    res.status(200).json(cartbyid)
})

app.delete('/deletecart/:id',(req,res)=>
{
    product.findByIdAndDelete({_id:req.params.id},function(err,item)
    {
      if(err)
      {
       res.status(404).json({msg:'not deleted'})
      }
      else
      {
       res.json({message:'deleted successfully'})
      }
    })
})
app.post('/addcartproducts',async(req,res)=>
    {
        const c_items=[]
    const c1= req.body;
    c_items.push(c1);
      res.json(c_items)
     console.log(c_items.cartitems,"c_items")
    // console.log(c_items.cartitems.product_id,"id")
     //const { product_id, Quantity,price } = req.body.cartitems;
    //  console.log(c_items.cartitems.product_id)
    let cartt = await Cart.findOne({product_id});
    
    if(cartt){
        let itemIndex = Cart.cartitems.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1)
        {
            let upd_product = Cart.cartitems[itemIndex];
            upd_product.Quantity += Quantity;
            Cart.cartitems[itemIndex] = upd_product;
        }
        else {
            Cart.cartitems.push({ product_id, Quantity, price });
        }
        cart.price += Quantity*price;
        cart = await cart.save();
        res.json(cart);
    }
      else{
        const c_items = req.body;
        console.log(c_items)
        var cart=new Cart(c_items)
        cart.save(function (err, cartdata) {
        if (err){ 
            return console.error(err);
        } 
          else {
        res.json({message:'success',c_data:cartdata})  
        }
       })
          }
        })
 
  
   



 

