const recipe= require('../models/Recipe.model')
const Favorite = require('../models/favorite.model');
const fs = require('fs');
const path = require('path');
const catchError = require('../utils/catchError.utils');
const AppError = require('../utils/AppError');


exports.createRecipe = catchError(async (req, res,next) => {
        const Recipe = await recipe.create({
            recipeName: req.body.recipeName,
            description: req.body.description,
            size: req.body.size,
            createdBy: req.body.createdBy,
            categoryId: req.body.categoryId,

            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        });
        res.status(201).json(Recipe);
    });

exports.updateRecipe = catchError(async(req,res,next) => {
        const { id } = req.params;

        const Recipe = await recipe.findById(id);

        if (!Recipe) {
            // return res.status(404).json({
            //     message: 'Recipe not found'
            // });
            return next(new AppError("Recipe not found",404));
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

        return res.status(200).json({message: 'Recipe updated successfully', Recipe});

    });




exports.deleteRecipe = catchError(async(req,res,next) => {
        const { id } = req.params;

        const deletedRecipe = await recipe.findByIdAndDelete(id);
        await Favorite.deleteMany({ recipeId: id });

        res.status(200).json({
            message: "Recipe and related favorites deleted"
        });
        if (!deletedRecipe) {
            // return res.status(404).json({ message: 'Recipe not found' });
        return next(new AppError("Recipe not found",404));
        }

        res.status(200).json({
            message: 'Recipe deleted successfully'
        });
    });




exports.getAllRecipes = catchError(async(req,res,next) => {
        const recipes = await recipe
            .find()
            .populate('createdBy', 'name email')
            .populate('categoryId', 'categoryName');

        res.status(200).json(recipes);

    });


