var mongoose=require('mongoose')
const Product=require('./product')
const Cart_items= mongoose.Schema({
    user_id:
    {
        type:String
    },
    product_id:{
    type: String,
    },
    
        productname:
        {
            type:String
        },
        
        Quantity:
        {
            type:Number
        },
        price:
       {
           type:Number
       },
       stock:
       {
        type:Number
       },
    }
)

const Cart=mongoose.Schema({
    items:[Cart_items], 
    subTotal: {
        default: 0,
        type: Number
    }
 })
module.exports=mongoose.model('cart_items',Cart_items)
//module.exports=mongoose.model('cart_products',Cart)