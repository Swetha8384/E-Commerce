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
            // type: mongoose.Schema.Types.ObjectId,
            //     ref: "user"
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
       },
    
       shippingPrice:
    {
      type:Number,
    },
    tax:
    {
      type:Number
    },
    // totalprice:
    // {
    //     type:Number,
    //     required:true,
    //     default:0
    // },
    orderStatus: {
        type: String,
        required: true,
    
      },
    //   deliveredAt: Date,
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    totalAmount:
    {
      type:Array
    },
    Amount_to_pay:
    {
        type:Array
    }
    },
 
    { timestamps: true }
    
)
module.exports=mongoose.model('ordered_items',Ordered_items)