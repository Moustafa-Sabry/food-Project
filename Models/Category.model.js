const mongoose=require('mongoose')
const CategorySchema =new  mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique: true,
        trim: true
    }
})
module.exports=mongoose.model('Category',CategorySchema)