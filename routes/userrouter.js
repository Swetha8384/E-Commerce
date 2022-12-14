//const { application } = require('express');
const express=require('express')
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

    var details=new User(data)
    details.save(function (err, userdetails) {
        if (err){ 
            return console.error(err);
        } else {
            const token=details.getJwtToken();
            res.status(200).json({success:true,token,userdetails})
         }
      });
})



router.post('/login',async(req,res)=>
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
            const token=user.getJwtToken();
            res.status(200).json({success:true,token})
         
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
    const { email,password} =req.body;
    const user=await User.create({
        email,password
    }); 
    await user.save();
    res.status(200).json(user)
})
module.exports=router;


