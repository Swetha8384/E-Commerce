var express=require('express');
var app=express();
const { application } = require('express')
const product=require('./models/product')
app.listen(3001,()=>{
    console.log("running at port 3001")
})

app.post('/post_products', (req,res) => {
    const newProduct = new product(req.body);
    newProduct.save().then(item => res.json(item));
})
