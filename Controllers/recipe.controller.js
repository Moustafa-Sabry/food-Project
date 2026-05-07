const recipe= require('../models/Recipe.model')
const Favorite = require('../models/favorite.model');
const fs = require('fs');
const path = require('path');
// exports.createRecipe = async (req, res) => {
//     try{
//         const newrecipe = recipe(req.body)
//         await newrecipe.save()
//         res.status(201).json({message: 'Recipe created'});
//     }catch(e){
//         res.status(500).json({error: e});
//     }
//
// };
// exports.createRecipe = async (req, res) => {
//     try {
//
//         console.log(req.file);
//
//         const Recipe = await recipe.create({
//             recipeName: req.body.recipeName,
//             description: req.body.description,
//             size: req.body.size,
//             createdBy: req.body.createdBy,
//             categoryId: req.body.categoryId,
//
//             imageUrl: req.file.filename
//         });
//
//         res.status(201).json(Recipe);
//
//     } catch (e) {
//         res.status(500).json({
//             error: e.message
//         });
//     }
// };
exports.createRecipe = async (req, res) => {
    try {

        const Recipe = await recipe.create({
            recipeName: req.body.recipeName,
            description: req.body.description,
            size: req.body.size,
            createdBy: req.body.createdBy,
            categoryId: req.body.categoryId,

            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        });

        res.status(201).json(Recipe);

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
};
exports.updateRecipe = async (req, res) => {
    try {

        const { id } = req.params;

        const Recipe = await recipe.findById(id);

        if (!Recipe) {
            return res.status(404).json({
                message: 'Recipe not found'
            });
        }

        if (req.file && Recipe.imageUrl) {

            const oldImageName = Recipe.imageUrl.split('/uploads/')[1];

            const oldImagePath = path.join(
                __dirname,
                '..',
                'uploads',
                oldImageName
            );

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        Recipe.recipeName =
            req.body.recipeName || Recipe.recipeName;

        Recipe.description =
            req.body.description || Recipe.description;

        Recipe.size =
            req.body.size || Recipe.size;

        Recipe.categoryId =
            req.body.categoryId || Recipe.categoryId;

        if (req.file) {

            Recipe.imageUrl =
                `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        await Recipe.save();

        return res.status(200).json({
            message: 'Recipe updated successfully',
            Recipe
        });

    } catch (e) {

        return res.status(500).json({
            error: e.message
        });
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