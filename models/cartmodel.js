var mongoose=require('mongoose')
const User=require('./models/user')
const Cartt= mongoose.Schema({
     user_id:
     {
        type:Number
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'user',
        
     },
    
    cartitems:[{
        product_id:{
            type: String,
            // type:mongoose.Schema.Types.ObjectId,
            // ref:'product'
        },
        // productname:
        // {
        //     type:String
        // },
        
        Quantity:
        {
            type:Number,
            default:1
        },
        price:
       {
           type:Number
       }
       
     }]
   // timestamps:true
    }
)

// const CartSchema = new mongoose.Schema(
//     {
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//       },
//       products: [
//         {
//           productId: Number,
//           quantity: Number,
//           price: Number
//         }
//       ],
    
//     },
//     { timestamps: true }
//   );

module.exports=mongoose.model('cart_items',Cartt)