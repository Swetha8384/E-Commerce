var express=require('express');
var app=express();
const bodyparser=require(body-parser)
const carts=require('./models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
app.use(bodyparser.json())
app.post('/register',(req,res)=>
{
    const {email,password}=req.body;
    console.log(bcrypt.hash(password,10))    
})