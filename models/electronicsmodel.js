var mongoose = require('mongoose');

const Electronics=mongoose.Schema( {
    product_id:
    {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String  
    },
    
    description: {
        type: String,
        required: true
    },
    // category:{
    //     type: String,
    //     required: true
    // },
    price: {
        type: Number,
        required: true
    },
    quantity:
    {
        type:Number
    }

 })
// const Cart=mongoose.Schema({
//     items:[Cart_items], 
//     subTotal: {
//         default: 0,
//         type: Number
//     }
//  })

 module.exports =  mongoose.model('product', Electronics);