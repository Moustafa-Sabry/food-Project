const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        required:true,
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    otp:{
        type:String,
    },
    otpExpire:String,

})

module.exports=mongoose.model('User',userSchema);