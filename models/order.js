var mongoose=require('mongoose')
const Ordered_items= mongoose.Schema({

        address: { 
            type: String, 
        
         },
        city: {
             type: String, 
             required: true
             },
        postalCode: {
             type: String, 
        
             },
        state: { 
            type: String,
         required: true },
      
        user_id:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        product_id:
        {
            type:Number,
            required:true
        },
        Quantity:
        {
            type:Number,
            required:true
        },
        cost:
       {
           type:Number,
           required:true
       }
    ,
    
    shippingprice:
    {
      type:Number,
    },
    tax:
    {
      type:Number
    },
    totalprice:
    {
        type:Number,
        required:true,
        default:0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
      },
    //   deliveredAt: Date,
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    }

    
)
module.exports=mongoose.model('ordered_items',Ordered_items)