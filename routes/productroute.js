const express=require('express');
const productController=require('../controllers/productcontrollers');
const app=express();
app.get('/products', productController.get_items);