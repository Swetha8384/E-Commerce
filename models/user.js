var mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const crypto=require('crypto');
//global.config = require('config');
const UserSchema=mongoose.Schema( {
	firstname:{
        type:String,
        
    },
    lastname:{
        type:String,

    },
    // username:{
    //     type:String
    // },
    role:{
         type:Number,
         default:0
        },
	email:{
        type: String,
	    required: true
	},
    // produ:{
    //     type:Array
    //     } ,
	password:{
         type:String,
		 required: true
	} ,
	mobile:{
        type:Number,
        required:true
    }
    ,
    resetPasswordToken:String

})

//register
UserSchema.pre("save",async function(next)
{
    this.password=await bcrypt.hash(this.password,10)
})

    //generating 
UserSchema.methods.getJwtToken=function(details){
    console.log(details)
     return jwt.sign({details},process.env.JWT_SECRET_KEY,
        {
            expiresIn:"6d"
        })
}

       //comparing entered password and db
// UserSchema.methods.comparePassword=async function(password)
// {
//     return await bcrypt.compare(password,this.password)
// }


//forgot password
// UserSchema.methods.getResetToken=function()
// {
//     const resetToken=crypto.randomBytes(20).toString("hex"); //generating token
//     this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
//     resetToken.json(resetToken);    
// }

module.exports=mongoose.model('user',UserSchema);