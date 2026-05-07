const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true,
        trim: true
    },
    imageUrl:{
            type:String,
        required: false,
    },
    size:{
        type:String,
        required: true,
        enum:['small','medium','large'],
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }


})
module.exports =
    mongoose.models.Recipe ||
    mongoose.model('Recipe', RecipeSchema);
