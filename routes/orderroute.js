const express=require('express')
const router=express.Router();
const Cart=require('../models/order')
var cors=require('cors')
router.use(cors());
router.use(express.json())

router.post('/order',async(req,res)=>{
    const {address,city,postalcode,state, product_id,Quantity,cost,shippingPrice,tax,orderStatus}=req.body;
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
        
        // paidAt:Date.now(),
         orderStatus
    });

    console.log(createorder);
    totalprice = cost*Quantity;
    totalnetamount = cost*Quantity+shippingPrice+tax;
    
    createorder.totalAmount.push(totalprice)
    createorder.Amount_to_pay.push(totalnetamount)
    await createorder.save();
    console.log(totalprice);
    //res.status(201).json({success: true,createorder })
    // console.log(createorder.shippingPrice,"shipping")
    // console.log(createorder.tax,"tax")
    res.status(200).json({ success: true,createorder,Amount_to_pay: totalnetamount})
    })


router.get('/getorder_details',async(req,res)=>
{
    const orderdetails=await Order.find()
    //res.status(200).json({success:true,orderdetails})
    let totalAmount = 0;

    orderdetails.forEach((order) =>{
        totalAmount += order.totalprice;
    });
    res.status(200).json({ success: true,orderdetails,totalamount: totalAmount})
})
router.get('/getOrder/:id' ,async (req,res) =>{
    //const  totalAmount=0;
    const orders = await Order.findById({_id: req.params.id});
         console.log(orders)
         console.log(orders.cost,"quantity")
         
        const totalAmount = orders.Quantity*orders.cost;
    
    res.status(200).json({success: true,orders,Totalamount:totalAmount});
});


router.delete('/deleteOrder/:id' ,async (req,res) =>{
  const order = await Order.findById({_id:req.params.id});
    if(!order){
      res.json("Order not found with this Id", 404);
    }
    await order.remove();
    res.status(200).json({success: true,message:"deleted successfully"});
})


router.put('/Update_orderstatus/:id',async(req,res)=>
{
    const order = await Order.findById({_id:req.params.id},{"orderStatus": req.body.orderStatus});
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
      if (order.orderStatus === "Out for delivery") {
        res.status(200).json("Your order is Out for delivery");
      }

      if (order.orderStatus === "Delivered") {
        res.json("You have already delivered this order");
      }
      
      
})

module.exports=router;