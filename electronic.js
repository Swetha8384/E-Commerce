var express=require('express');
var app=express();
var mongoose=require('mongoose');
const multer=require('multer');
const fs=require('fs');
//const user_data=require('./models/user');
const product=require('./models/product')
const cart=require('./models/cart');
//const routes = require('./routes/userrouter');


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
  app.post('/post_electronicproducts',upload.single('productimages'), async(req,res) => {
    // const newProduct = new product(req.body);
    // newProduct.save().then(item => res.json(item));
    const productdetails=new product({
      product_id:req.body.product_id,
      product_name: req.body.product_name,
      image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
      contentType:"image/jpg/jfif"},
      description:req.body.description,
      category:req.body.category,
      price:req.body.price,
      quantity:req.body.quantity
    })
    await productdetails.save();
    res.status(200).json({success:true})
  })

  app.post('/post_women_products',upload.single('productimages'), async(req,res) => {
    
    const productdetails=new product({
      product_id:req.body.product_id,
      product_name: req.body.product_name,
      image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
      contentType:"image/jpg/jfif"},
      description:req.body.description,
      category:req.body.category,
      price:req.body.price,
      quantity:req.body.quantity
    })
    await productdetails.save();
    res.status(200).json({success:true})
  })
  app.get('/get_electronicproducts',async(req,res)=>{
    const get_products=product.find();
    res.status(200).json({message:"success"});
 })
 
 app.get('/getelectronicproductby_id/:id',async(req,res)=>
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
 
 app.get('/get_womenproducts',async(req,res)=>{
    const get_products=product.find();
    res.status(200).json({message:"success"});
 })
 
 app.get('/getwomenproductby_id/:id',async(req,res)=>
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

 app.post('/post_jewellery_products',upload.single('productimages'), async(req,res) => {
    
    const productdetails=new product({
      product_id:req.body.product_id,
      product_name: req.body.product_name,
      image:{data:fs.readFileSync('Product_images/'+ req.file.filename),
      contentType:"image/jpg/jfif"},
      description:req.body.description,
      category:req.body.category,
      price:req.body.price,
      quantity:req.body.quantity
    })
    await productdetails.save();
    res.status(200).json({success:true})
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