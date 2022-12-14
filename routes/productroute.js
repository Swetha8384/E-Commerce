const express=require('express');
const app=express();
const router=express.Router();
const multer=require('multer');
const fs=require('fs');
const cors=require('cors')
router.use(cors());
router.use(express.json())
const product=require('../models/electronicsmodel')
const womenproduct=require('../models/womenmodel')
const menproduct=require('../models/menmodel')
const jewelleryproduct=require('../models/jewellerymodel')
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

//app.use(express.json())

//storing product
router.post('/post_products',upload.single('productimages'), async(req,res) => {
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

router.get('/get_products',async(req,res)=>{
    const get_products=product.find();
    res.json(await get_products);
 })
// const productController=require('../controllers/productcontrollers');
// const app=express();
// app.get('/products', productController.get_items);

router.get('/getproductby_id/:id',async(req,res)=>
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

router.delete('/delete_product/:id',(req,res)=>
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

router.put('/update_id/:id',(req,res)=>
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

router.post('/post_women_products',upload.single('productimages'), async(req,res) => {
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

router.get('/get_women_products',async(req,res)=>{
  const get_womenproducts=womenproduct.find();
  res.json(await get_womenproducts);
})


router.post('/post_men_products',upload.single('productimages'), async(req,res) => {
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

router.get('/get_men_products',async(req,res)=>{
  const get_menproducts=menproduct.find();
  res.json(await get_menproducts);
})

router.post('/post_jewellery_products',upload.single('productimages'), async(req,res) => {
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

router.get('/get_jewllery',async(req,res)=>{
  const get_jewellery_products=jewelleryproduct.find();
  res.json(await get_jewellery_products);
})
module.exports=router;