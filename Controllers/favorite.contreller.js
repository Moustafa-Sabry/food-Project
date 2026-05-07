const favorite= require('../models/Favorite.model')
const Favorite = require('../models/favorite.model');

exports.addToFavorite = async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        const favorite = await Favorite.create({userId, recipeId});

        res.status(201).json({message: 'Added to favorites', favorite});

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.removeFromFavorite = async (req, res) => {
    try {
        console.log("in")
        const { userId, recipeId } = req.body;
console.log(recipeId);
        if (!userId || !recipeId) {
            return res.status(400).json({message: "userId and recipeId are required"});}

        const deleted = await Favorite.findOneAndDelete({
            userId,
            recipeId
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Favorite not found"
            });
        }

        return res.status(200).json({
            message: "Removed from favorites"
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
};
exports.getUserFavorites = async (req, res) => {
    try {
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

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};