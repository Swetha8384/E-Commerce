const mongoose=require('mongoose')
const otpverify=mongoose.Schema(
    {
        // userid:{
        //     type:String
        // },
        otp:{
            type:String,
          //  expires:'10m'
        },
        createdAt:Date,
        expiresAt:Date
    }
)

module.exports=mongoose.model('otp',otpverify)