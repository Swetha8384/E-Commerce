var mongoose=require('mongoose')
const CartSchema = new mongoose.Schema(
    {
      userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
        type:String
      },
      products: [
        {
          productId: Number,
          productname:String,
          quantity: Number,
          price: Number
        }
      ],
    },
    { timestamps: true }
  );

module.exports=mongoose.model('carts',CartSchema)



// const Cart_items= mongoose.Schema({
//     user_id:{type:String},
//     product_id:{ type: String,},
//     products:{type:Array},
 //      productname: {type:String},
 //        Quantity: {  type:Number },
//         price:
//        {type:Number},
//        stock:
//        {type:Number},
//     }
// )

// const Cart=mongoose.Schema({
//     items:[Cart_items], 
//     subTotal: {
//         default: 0,
//         type: Number
//     }
//  })
// module.exports=mongoose.model('cart_items',Cart_items)
//module.exports=mongoose.model('cart_products',Cart)

