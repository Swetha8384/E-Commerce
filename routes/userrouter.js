//const { application } = require('express');
const express=require('express')
const jwt=require('jsonwebtoken')
const jwt_decode=require('jwt-decode');
//const profile=require('./middleware/auth')
//const app=express();

const router=express.Router();
var cors=require('cors')
 router.use(cors());
// var mongoose=require('mongoose');            
const bodyParser=require('body-parser')
const User=require('../models/user')
router.use(bodyParser.json())



//user register
router.use(express.json())
router.post('/register',(req,res)=>
{
  var data=req.body      
   console.log(data,'from ui')
    var details=new User(data)
    details.save(function (err, userdetails) {
        if (err){ 
            return console.error(err);
        } else {
            // const token=details.getJwtToken(details);
            // console.log(token)
            // res.status(200).json({success:true,token:token,userdetails:userdetails})
            generateToken(userdetails,res) ;
         }
      });
})



router.post('/loginn',async(req,res)=>
{
   const {email,password}=req.body;
   if(!email ||!password)
   {
    res.json("please enter email and password")
   } 

   const user= await User.findOne({email}).select("+password");
   if(!user)
   {
    res.json("user is not found")
   }

    // const Passwordmatch=await user.comparePassword('+password');
    // console.log(Passwordmatch)
    // if(!Passwordmatch)
    // {
    //      res.json("user not found")
    // }  
        //     const token=user.getJwtToken();
        //     res.status(200).json({success:true,token})
         generateToken(user,res) ;
})

//storing token
const generateToken=async(userdetails,res)=>{
    const token=await userdetails.getJwtToken(userdetails);

    const storing_token={
        httpOnly:true,
        expire : new Date() + 9999
    }
    res.status(200).cookie('token',token,storing_token).json({sucess:true,token})
}

//decoding //displaying userprofile
router.get('/user_profile',(req,res)=>
{
    const {token}=req.cookies;
    if(!token)
    {
        res.status(401).json("please login")
    }
   // console.log(token)
    const decoded = jwt_decode(token);
    res.status(200).json({sucess:true,decoded})
     console.log(decoded,'decoded data')
})




router.get('/logout',async(req,res)=>
{
    res.clearCookie('token');
    res.status(200).json({success:true,message:'cleared cookie'})
})

router.get('/login_details',async(req,res)=>
{
    const login_details=await User.find()
    res.status(200).json({success:true,login_details})
})

router.get('/login_details/:id',async(req,res)=>
{
    const login_details=await User.findById({_id:req.params.id})
    res.status(200).json({success:true,login_details})
})

router.post('/userregister',async(req,res)=>
{
    const {firstname,lastname, email,password,mobile} =req.body;
    const user=await User.create({
        firstname,lastname, role,email,password,mobile
    }); 
    await user.save();
    
    res.status(200).json(user)
    console.log(user,'register')
})
module.exports=router;


