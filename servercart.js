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
app.get('/',(req,res)=>
{
    res.send("ok")
})
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
await cartData.remove();
res.status(200).json({success: true,message: "Item removed from cart"});
})

app.post('/post_products',async(req,res)=>
{
    const c_items=req.body;
    console.log(c_items)
     //const { product_id, Quantity,price } = req.body.cartitems;
    console.log(c_items.cartitems[0].product_id)
    //let cart = await Cart.cartitems.findOne({product_id});
    //let product = await Cart.items.findOne({product_id});
    if(cart){
        let itemIndex = Cart.cartitems.findIndex(p => p.product_id == c_items.cartitems[0].product_id);
        if(itemIndex > -1)
        {
            let upd_product = cart.cartitems[itemIndex];
            upd_product.Quantity += Quantity;
            cart.cartitems[itemIndex] = upd_product;
        }
        else {
            cart.cartitems.push({ product_id, Quantity, price });
        }
        cart.price += Quantity*price;
        cart = await cart.save();
        res.json(cart);
    }
    else{
        const cart_products = req.body;
        var cartdetails=new Cart(cart_products)
        cartdetails.save(function (err, cartdata) {
        if (err){ 
            return console.error(err);
        } 
          else {
        res.json(cartdata)  
        }
    });
    }
})

//adding products to cart
app.post('/addcart',async(req,res)=>
{
//   const prod_id=req.body.product_id;
//   
// const { product_id,Quantity} =req.body;
// const Cart= await cart.cart_products();


// const { items:[],subTotal} =req.body;
// const cart=await Cart.create({
//     items:[{user_id,product_id, productname,Quantity,price,stock}],subTotal
// });     
// res.status(200).json({success: true,cart})

// })


// const product_details=await Product.findById(product_id);
//   if(!product_details)
//   {
//     res.json("not found");
//   }
//   else{
//     res.json("found");
//   }
// })

const  productid = req.body.product_id;
await res.status(200).json("success")
console.log(productid);
})

const { product_id,Quantity} =req.body.cartitems
//      const cart=await Cart.create({
//             product_id,Quantity
//      }); 
//      await cart.save();
//      //let cart = await Cart.findOne({product_id});
//      res.status(200).json(cart)
//      console.log(cart,"product_id")
  