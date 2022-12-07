var express=require('express');
var app=express();
var mongoose=require('mongoose');
const Cart=require('./models/cart')
const Product=require('./models/product')
// const multer=require('multer');
// const fs=require('fs');
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
app.use(express.json())
app.post('/post_cart',async(req,res)=>
{
    
    const { user_id,product_id, productname,Quantity,price,stock} =req.body;
    const cart=await Cart.create({
        user_id,product_id, productname,Quantity,price,stock
    });     
    res.status(200).json({success: true,cart})
    
})

app.post("/cart", async (req, res) => {
    const { productId,name, quantity,  price } = req.body;
    console.log(quantity,"quantity")
    const userId = "6385e2624bb1a01060f60920"; 
  
    try {
      let cart = await Cart.findOne({ userId });
      console.log(cart,"cart")
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
         console.log(itemIndex,"index")
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          console.log(productItem,"prod")
          productItem.quantity += quantity;
          console.log(productItem.quantity,"quan");
          cart.products[itemIndex] = productItem;
          
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, name,quantity, price });
        }
        cart1 = await cart.save();
       
         res.status(201).send(cart1);
         console.log(cart1,"cart1")
      } else {
        const cart_products = {
             userId, products: [{ productId, name,quantity, price }]
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


app.get('/get_cart_products',async(req,res)=>
{
  const get_cart_products=await Cart.find()
  res.status(200).json({success:true,get_cart_products})
})

app.put('/update_cart/:id',async(req,res)=>
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




app.delete('/delete_pro_cart/:id',async(req,res)=>
{
const cartData = await Cart.findById({_id:req.params.id});
if (!cartData) {
  res.json("Items is not found with this id", 404);
}
await cartData.remove({"productId": 1});
res.status(200).json({success: true,message: "Item removed from cart"});
})



//adding products to cart
app.post('/addcart',async(req,res)=>
{


const  productid = req.body.product_id;
await res.status(200).json("success")
console.log(productid);
})

//const { product_id,Quantity} =req.body.cartitems
//      const cart=await Cart.create({
//             product_id,Quantity
//      }); 
//      await cart.save();
//      //let cart = await Cart.findOne({product_id});
//      res.status(200).json(cart)
//      console.log(cart,"product_id")
  