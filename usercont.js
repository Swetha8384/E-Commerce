var express=require('express');
var app=express();
var cors=require('cors')
app.use(cors());
var mongoose=require('mongoose');            
const bodyParser=require('body-parser')
const User=require('./models/user')
app.use(bodyParser.json())
app.listen(3001,()=>
{
    console.log("running at 3001")
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

//user register
app.use(express.json())
app.post('/register',(req,res)=>
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



app.post('/login',async(req,res)=>
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
app.get('/login_details',async(req,res)=>
{
    const login_details=await User.find()
    res.status(200).json({success:true,login_details})
})

app.get('/login_details/:id',async(req,res)=>
{
    const login_details=await User.findById({_id:req.params.id})
    res.status(200).json({success:true,login_details})
})

app.post('/userregister',async(req,res)=>
{
    const { email,password} =req.body;
    const user=await User.create({
        email,password
    }); 
    await user.save();
    res.status(200).json(user)
})
//resetpassword
// app.post('/forgotpwd',async(req,res)=>
// {
//     const user=await User.findOne({email:req.body.email})
//     if(!user)
//     {
//         res.status(404).json("user not found");

//     }

// })


