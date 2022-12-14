var express=require('express');
var app=express();
var mongoose=require('mongoose');
const multer=require('multer');
const fs=require('fs');
//const user_data=require('./models/user');
const product=require('./models/electronicsmodel')
const womenproduct=require('./models/womenmodel')
const menproduct=require('./models/menmodel')
const jewelleryproduct=require('./models/jewellerymodel')
const cart=require('./models/cart');
//const routes = require('./routes/userrouter');
const cors = require('cors');
app.use(cors());

app.listen(3001,()=>{
    console.log("running at port 3001")
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
//app.use('/user',routes);


//const router=express.Router();
const usercontroller= require('./controllers/usercontroller')



// app.use(express.json())
// app.post('/login_user', function(req,res)
// {
//   usercontroller.userdata
// } )
// app.get('/get_data',function(req,res)
// {
//   usercontroller.getdata
// })






var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Product_images')
  },
  filename:(req,file,cb)=>
  {
     cb(null,file.originalname)
  }
})
const upload=multer({storage:storage})

app.use(express.json())

//storing product
app.post('/post_products',upload.single('productimages'), async(req,res) => {
  // const newProduct = new product(req.body);
  // newProduct.save().then(item => res.json(item));
  const productdetails=new product({
    product_id:req.body.product_id,
    product_name: req.body.product_name,
    image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
    contentType:"image/jpg"},
    description:req.body.description,
   // category:req.body.category,
    price:req.body.price,
    quantity:req.body.quantity
  })
  await productdetails.save();
  res.status(200).json({success:true,data:productdetails})
})

app.get('/get_products',async(req,res)=>{
   const get_products=product.find();
   res.json(await get_products);
})

app.get('/getproductby_id/:id',async(req,res)=>
{
   const id=req.params.id;
   product.findOne({_id:id},(function(err,item)
   {
    if(err)
    {
        console.log(err)
    }
    else{
        res.send(item)
    }
   }))
})

app.delete('/delete_product/:id',(req,res)=>
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

app.put('/update_id/:id',(req,res)=>
{
   product.findByIdAndUpdate({_id:req.params.id},{updated_data:req.body},{useFindAndModify:true,new:true}), function(err,data)
   {
    if(err)
    {
      res.status(404).json({msg:'not updated '})
    }
    else
    {
      res.status(200).json(updated_data)
    }
   }
})

app.post('/post_women_products',upload.single('productimages'), async(req,res) => {
  const productdetails=new womenproduct({
    product_id:req.body.product_id,
    product_name: req.body.product_name,
    image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
    contentType:"image/jpg/webp"},
    description:req.body.description,
    //category:req.body.category,
    price:req.body.price,
    quantity:req.body.quantity
  })
  await productdetails.save();
  res.status(200).json({success:true,data:productdetails})
})

app.get('/get_women_products',async(req,res)=>{
  const get_womenproducts=womenproduct.find();
  res.json(await get_womenproducts);
})


app.post('/post_men_products',upload.single('productimages'), async(req,res) => {
  const productdetails=new menproduct({
    product_id:req.body.product_id,
    product_name: req.body.product_name,
    image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
    contentType:"image/jpg"},
    description:req.body.description,
    category:req.body.category,
    price:req.body.price,
    quantity:req.body.quantity
  })
  await productdetails.save();
  res.status(200).json({success:true,data:productdetails})
})

app.get('/get_men_products',async(req,res)=>{
  const get_menproducts=menproduct.find();
  res.json(await get_menproducts);
})

app.post('/post_jewellery_products',upload.single('productimages'), async(req,res) => {
  const productdetails=new jewelleryproduct({
    product_id:req.body.product_id,
    product_name: req.body.product_name,
    image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
    contentType:"image/jpg"},
    description:req.body.description,
    category:req.body.category,
    price:req.body.price,
    quantity:req.body.quantity
  })
  await productdetails.save();
  res.status(200).json({success:true,data:productdetails})
})

app.get('/get_jewllery',async(req,res)=>{
  const get_jewellery_products=jewelleryproduct.find();
  res.json(await get_jewellery_products);
})
// app.post('/login',async(req,res)=>
// {
//     const login_data = new user_data(req.body);
//     console.log(login_data,"details")
    
//     await  login_data.save();
//     res.json(await login_data.find());
    
//     // catch(e)
//     // {
//     //     res.status(500).send(e);
//     // }
  
//     }
  
// )

// app.post('/login',(req,res)=>
// {
//   var data=req.body      

//     var details=new user_data(data)
//     details.save(function (err, docs) {
//         if (err){ 
//             return console.error(err);
//         } else {
//             res.json(docs)
         
//         }
//       });
// })
// app.get('/data',async(req,res)=>
// {
//  try{
//      const udetails=await user_data.find()
//       res.json(udetails)
//     }
//   catch(err)
//   {
//     res.send('Error'+err)
//   }
// })

// app.use(express.json())
// app.post('/login_user',(req,res)=>
// {
//     var data=req.body      
//     var details=new user_data(data)
//     details.save(function (err, docs) {
//         if (err){ 
//             return console.error(err);
//         } else {
//             res.json(docs)  
//         }
//       });
// })


