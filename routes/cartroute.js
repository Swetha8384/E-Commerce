const express=require('express')
const router=express.Router();
const bodyParser = require('body-parser');
//var mongoose=require('mongoose');
const Cart=require('../models/cart')
var cors=require('cors')
router.use(cors());
router.use(express.json())
router.post('/post_cart',async(req,res)=>
{
    
    const { user_id,product_id, productname,Quantity,price,} =req.body;
    const cart=await Cart.create({
        user_id,product_id, productname,Quantity,price
    });     
    res.status(200).json({success: true,cart})
    
})
// const userId=req.userId._id
router.use(express.json({limit: '50mb'}));
router.use(bodyParser.json({ limit: "200mb" }))
const userId = "638e2546bdfe9210f4ac820b"; 
router.post("/cart", async (req, res) => {
    const {image, price,product, quantity  } = req.body;
      
    console.log(quantity,"quantityyyyyyyyyyyyyyyyyyy")
    Totalprice=quantity*price;
    
    try {
      let cart = await Cart.findOne({ userId });
      console.log(cart,"cart")
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.product == product);
         console.log(itemIndex,"index")
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity += quantity;
          productItem.Totalprice=productItem.quantity*price;
          cart.products[itemIndex] = productItem;
          // console.log(productItem,"prod")
          // console.log(productItem.quantity,"quan");
        } else {
          //product does not exists in cart add new item
          cart.products.push({ image, product,quantity, price , Totalprice});
        }
        cart1 = await cart.save();
       
         res.status(201).send(cart1);
         console.log(cart1,"cart1")
      } else {
        const cart_products = {
             userId, products: [{ image, product,quantity, price, Totalprice }]
            };
        console.log(cart_products)
        var cartdetails=new Cart(cart_products)
        cartdetails.save(function (err, cartdata) {
        if (err){ 
            return console.error(err);
        } 
          else {
        res.json(cartdata)  
        console.log(cartdata,"c_data")

        }
    });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });


router.get('/get_cart_products',async(req,res)=>
{
  const get_cart_products=await Cart.find()
  res.status(200).json({success:true,get_cart_products})
})

router.put('/update_cart/:id',async(req,res)=>
{
    const Quantity  = req.body;
    console.log()
    const updated_cart=await Cart.findByIdAndUpdate({_id:req.params.id});
    console.log(updated_cart)
    
  if (!updated_cart) {
    res.json("No cart found with this id");
  }
 await updated_cart.updateOne(Quantity);
  res.status(200).json({success:true,updated_cart})
})




router.delete('/delete_pro_cart/:id',async(req,res)=>
{
     let cart = await Cart.findOne({ userId });
      //console.log(cart,"cart")
     let cartData = cart.products.pull({_id:req.params.id });
     await cart.save();
    //  if (!cartData) {
    //      res.status(404).json("Items is not found with this id");
    //  }
     res.status(200).json({success: true,message: "Item removed from cart",cartData});

})

module.exports=router;