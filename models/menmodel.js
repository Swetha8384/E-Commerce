var mongoose = require('mongoose');
const Product=mongoose.Schema( {
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
module.exports =  mongoose.model('menproducts', Product);