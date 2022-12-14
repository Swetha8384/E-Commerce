var express=require('express');
var app=express();
var mongoose=require('mongoose')


const login=require('./routes/userrouter')
const allproducts=require('./routes/productroute')
const cartproducts=require('./routes/cartroute')
const orders=require('./routes/orderroute')

app.listen(3006,()=>{
    console.log("running at port 3006")
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
//login user
app.use('/api/login',login)

//products
app.use('/api',allproducts)

//cartproducts
app.use('/api/cart',cartproducts)

//order
app.use('/api/orders',orders)
console.log("running")