const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
 recipeId:{
        type:mongoose.Schema.Types.ObjectId,
     ref:'Recipe'
 }

})
module.exports =
    mongoose.models.Favorite ||
    mongoose.model('Favorite', FavoriteSchema);
