const mongoose=require('mongoose')
const payment=mongoose.Schema({
    userid:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    },
    amount:
    {
        type:Number
    },
    gst:
    {
        type:Number
    }
})
module.exports=mongoose.model('payment',payment)