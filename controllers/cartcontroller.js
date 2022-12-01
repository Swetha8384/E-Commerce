var express=require('express');
var app=express();
const carts=require('./models/cart')
//const product=require('./models/product')

const add_product_cart=async(req,res)=>
{
   try{ 
    const {user_id, product_id, Quantity } = req.body;

    
        let cart = await carts.findOne({user_id});
        let product = await product.findOne({_id: product_id});
        
        const newCart = await carts.create({
            user_id,
            item: [{ product_id, name, Quantity, price }],
            bill: Quantity*price
        });
        res.json(newCart);
        const price = item.price;
        const name =  item.name;

        if(cart){
            
            let itemIndex = cart.item.findIndex(p => p.product_id == product_id);

            if(itemIndex > -1)
            {
                let productItem = cart.items[itemIndex];
                productItem.Quantity += Quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                cart.items.push({ product_id, name, Quantity, price });
            }
            cart.bill += Quantity*price;
            cart = await cart.save();
            res.json(cart);
        }
    }
    catch(err)
    {
       console.log(err)
    }
    }
 
module.export={add_product_cart}

