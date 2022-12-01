const user_data=require('../models/user');
// app.use(express.json())
const userdata=(req,res)=>
{
    var data=req.body      
    var details=new user_data(data)
    details.save(function (err, docs) {
        if (err){ 
            return console.error(err);
        } else {
            res.json(docs)  
        }
      });
}

const getdata=async(req,res)=>
{
    try{
        const udetails=await user_data.find()
         res.json(udetails)
       }
     catch(err)
     {
       res.send('Error'+err)
     }
}

module.export={
    userdata,
    getdata
}