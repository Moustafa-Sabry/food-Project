const recipe= require('../models/Recipe.model')
const Favorite = require('../models/favorite.model');
exports.createRecipe = async (req, res) => {
    try{
        const newrecipe = recipe(req.body)
        await newrecipe.save()
        res.status(201).json({message: 'Recipe created'});
    }catch(e){
        res.status(500).json({error: e});
    }

};
exports.updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedRecipe = await recipe.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({
            message: 'Recipe updated successfully',
            recipe: updatedRecipe
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecipe = await recipe.findByIdAndDelete(id);
        await Favorite.deleteMany({ recipeId: id });

        res.status(200).json({
            message: "Recipe and related favorites deleted"
        });
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({
            message: 'Recipe deleted successfully'
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipe
            .find()
            .populate('createdBy', 'name email')
            .populate('categoryId', 'categoryName');

        res.status(200).json(recipes);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};