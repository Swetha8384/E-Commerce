var express=require('express');
var app=express();
var mongoose=require('mongoose');
const Order=require('./models/order')
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

app.post('/order',async(req,res)=>{
    const {address,city,postalcode,state, product_id,Quantity,cost,shippingPrice,tax,totalprice,orderstatus}=req.body;
    const createorder= await Order.create({
        address,
        city,
        postalcode,
        state,
        product_id,
        Quantity,
        cost,
        shippingPrice,
        tax,
        totalprice,
        paidAt:Date.now(),
        orderstatus
    });
    console.log(createorder);
    await createorder.save();
    res.status(201).json({success: true,createorder })

    
})


app.get('/getorder_details',async(req,res)=>
{
    const orderdetails=await Order.find()
    res.status(200).json({success:true,orderdetails})
    let totalAmount = 0;

    orderdetails.forEach((order) =>{
        totalAmount += order.totalprice;
    });
   res.status(200).json({ success: true,orderdetails, totalAmount})

// app.get('/getOrder' ,async (req,res,next) =>{
//     const orders = await Order.find({user: req.user._id});
//     res.status(200).json({
//         success: true,
//         orders
//     });
});


app.delete('/deleteOrder/:id' ,async (req,res) =>{

    const order = await Order.findById({_id:req.params.id});
    
    if(!order){
      res.json("Order not found with this Id", 404);
    }
    await order.remove();
    res.status(200).json({success: true,message:"deleted successfully"});
})


app.put('/Update_orderstatus/:id',async(req,res)=>
{
    const order = await Order.findById({_id:req.params.id});
    if (!order) {
        res.json("Order not found with this Id");
      }
      if(order.orderStatus==="conformed")
      {
        res.json("your order is conformed")
      }
      if (order.orderStatus === "Processing") {
        res.json("Your order is processing");
      }

      if (order.orderStatus === "Delivered") {
        res.json("You have already delivered this order");
      }
      
      
})
