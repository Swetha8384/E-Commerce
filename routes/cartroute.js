const express=require('express')
const router=express.Router();
const cartcontroller=require('../controllers/cartcontrollers');
router.post('/cart',cartcontroller. add_product_cart);


module.exports=router;