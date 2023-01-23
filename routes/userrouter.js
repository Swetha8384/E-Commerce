//const { application } = require('express');
const express=require('express')
const jwt=require('jsonwebtoken')
const jwt_decode=require('jwt-decode');
const bcrypt=require('bcrypt');
//const profile=require('./middleware/auth')
//const app=express();
let nodemailer = require('nodemailer');
const router=express.Router();
var cors=require('cors')
 router.use(cors());
// var mongoose=require('mongoose');            
const bodyParser=require('body-parser')
const User=require('../models/user')
const otpverify=require('../models/otpverify');
//const { application } = require('express');
router.use(bodyParser.json())



//user register
router.use(express.json())
router.post('/register',(req,res)=>
{
  var data=req.body      
   console.log(data,'from ui')
    var details=new User(data)
     const token=details.getJwtToken(details);
     console.log(token)
    details.save(function (err, userdetails) {
        if (err){ 
            return console.error(err);
        } else {
            // const token=details.getJwtToken(details);
            // console.log(token)
             res.status(200).json({success:true,userdetails:userdetails,token:token})
           // generateToken(userdetails,res) ;
         }
      });
})



router.post('/loginn',async(req,res)=>
{
  // const {email,password}=req.body;
  
   console.log(req.body.email,req.body.password)
   if(!req.body.email ||!req.body.password)
   {
    res.json("please enter email and password")
   } 
 
   const userr= await User.findOne({email:req.body.email})
//    const token = jwt.sign({ _id: user._id },process.env.JWT_SECRET_KEY,{ expiresIn: "30d"})
   console.log(userr,"userrr")
   //const isPasswordCorrect = await bcrypt.compare( password,user.password);
   if(userr==null)
   {
    res.status(401).json({meassage:"user is not found"})
   }
   else
   {
     res.status(200).json({message:"login successfull"})
   }

    // const Passwordmatch=await user.comparePassword('+password');
    // console.log(Passwordmatch)
    // if(!Passwordmatch)
    // {
    //      res.json("user not found")
    // }  
        //     const token=user.getJwtToken();
        //     res.status(200).json({success:true,token})
        //  generateToken(user,res) ;
})

router.post('/login',(req,res)=>
{
    const {email,password}=req.body;
    console.log(email,'email')
    
    User.findOne({email:email},(err,user)=>
    {
        if(user)
        {
            res.send({message:"login successfull",user:user})
            console.log(user,user)
        }
        else
        {
            res.send({message:"enter correct email"})
            console.log(user,'user')
        }
       
    })
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
    const login_details=await User.find().populate("cart")
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

//req={_id,email}
router.post('/otpverify',async(req,res)=>
{
    const { email,password} =req.body;
    const userr=await User.create({
        email,password
    }); 
    await userr.save();
    console.log(email,'email')
    const user= await User.findOne({email:email})
   console.log(user)
   const user_id=user._id;
   console.log(user_id,'id')
//    if(!user)
//    {
//     res.json("user is not found")
//    }

    const otp=`${Math.floor(1000 + Math.random()*9000)}`;
    const transporter=nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure: true,
        auth: {
          user: email,
          pass: 'bbewyiastbihhwhi',
        
        },
        host:'smtp@gmail.com'
    })

    mailOptions = {
        from: email,
        to: email,
        subject: 'verify your email',
        text: `Enter otp ${otp} to verify email`
    };
    
    //const hashotp=await bcrypt.hash(otp,10);
    const otpverification=await new otpverify({
        userid:user_id,
        otp:otp,
        createdAt:Date.now(),
        expiresAt:Date.now()+ 360000
    })
    await otpverification.save();

    transporter.sendMail(mailOptions, function(error,info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent',info)
        }
    })
    res.status(200).json(otpverification)
})

router.post('/verifyotp',async(req,res)=>
{
    const {userid,otp}=req.body;
    if(!userid || !otp)
    {
        throw Error("Please enter otp")
    }
    else
    {
        const Userotpverification=await otpverify.find({userid})
        console.log( Userotpverification,'verify')
        console.log( Userotpverification[0],'length')
        if( Userotpverification.length<=0)
        {
            throw Error("Account doesnot exist please signup")
        }
        // User.findOne({email,otp}).exec(function(err,user){
        //     if(err) throw err
        //     if(!user){
        //         res.json({"error":"otp is Expired"})
        //     }
        else{
            const {expiresotptime}= Userotpverification[0].expiresAt;
            console.log('expiresotptime',expiresotptime)
            const hashedotp= Userotpverification[0].otp;
            console.log(hashedotp,'hashedotp')
            if(expiresotptime<Date.now)
            {
               //await otpverify.deleteMany({userid})
                throw Error("otp was expired.Please request again")

            }
            else{
            //    const validotp=await bcrypt.compare(otp,hashedotp) 

             // console.log(` ${hashedotp} bcrypt ${otp} otp`) 
              if(hashedotp !== otp)
               {
                 console.log("invalid otp")
               }
              else{
                const updatedUser = await User.updateOne({_id:userid}, {
                    $set: { verified: true },
                  });
                  console.log(updatedUser,'updatedUser')
                res.json({status:"verified",message:'Email verified successfully',updatedUser})
              }
            }
        }
    }
    
})

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join('');
};
module.exports=router;


