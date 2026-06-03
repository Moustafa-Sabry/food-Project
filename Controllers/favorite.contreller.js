const Favorite = require('../Models/Favorite.model');
const catchError = require('../utils/catchError.utils');
const AppError = require("../utils/AppError");
exports.addToFavorite = catchError(async(req,res,next) => {
    const { userId, recipeId } = req.body;

    const favorite = await Favorite.create({userId, recipeId});

    res.status(201).json({message: 'Added to favorites', favorite});

})


exports.removeFromFavorite = catchError(async(req,res,next) => {

    console.log("in")
    const { userId, recipeId } = req.body;
    console.log(recipeId);
    if (!userId || !recipeId) {

        // return res.status(400).json({message: "userId and recipeId are required"});
        return next(new AppError("userId and recipeId are required",400));
    }

    const deleted = await Favorite.findOneAndDelete({
        userId,
        recipeId
    });

    if (!deleted) {
        // return res.status(404).json({
        //     message: "Favorite not found"
        // });
    return next(new AppError("Favorite not found",404));
    }

    return res.status(200).json({
        message: "Removed from favorites"
    });


})
exports.getUserFavorites =catchError(async(req,res,next) => {
    const { userId } = req.params;

    const favorites = await Favorite.find({ userId })
        .populate({
            path: 'recipeId',
            populate: [
                { path: 'createdBy', select: 'name email' },
                { path: 'categoryId', select: 'categoryName' }
            ]
        });

    res.status(200).json(favorites);


})
