//const { application } = require('express');
const express=require('express')
const router=express.Router();
const usercontroller= require('../controllers/usercontroller')

router.use(express.json())
router.post('/login_user',function(req,res)
{
  usercontroller.userdata
});
router.get('/get_data',function(req,res)
{
    usercontroller.getdata
});
module.exports=router;


