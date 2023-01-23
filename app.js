var express=require('express');
var app=express();
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const login=require('./routes/userrouter')
const allproducts=require('./routes/productroute')
const cartproducts=require('./routes/cartroute')
const orders=require('./routes/orderroute')


app.listen(3006,()=>{
    console.log("running at port 3006")
})
var client=mongoose.connect(process.env.mongodb_connection,{useNewUrlParser:true},(err)=>
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

app.use(bodyParser.json());
app.use(cookieParser());
//login user,userprofile
app.use('/api/login',login)

//products
app.use('/api',allproducts)

//cartproducts
app.use('/api/cart',cartproducts)

//order
app.use('/api/orders',orders)

//userprofile
//app.use('/api/profiles',profile)
console.log("running")