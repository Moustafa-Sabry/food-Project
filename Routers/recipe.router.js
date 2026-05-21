const express = require('express');
const router = express.Router();
const {upload}=require('../utils/uploads.utils')
const {createRecipe,updateRecipe,deleteRecipe,getAllRecipes} = require('../controllers/recipe.controller');
const validate=require('../Middlewares/validation.middleware');
const {recipeSchema} = require('../validations/recipe.validation');
const allowTo =
    require('../Middlewares/role.middelwar');
const protect =
    require('../Middlewares/auth.middleware');

router.post('/',protect,validate(recipeSchema),upload.single('imageUrl'),createRecipe);
router.get('/',getAllRecipes);

router.delete('/:id', protect, allowTo('admin'), deleteRecipe);

router.put('/:id',protect,validate(recipeSchema),upload.single('imageUrl'),updateRecipe);
module.exports=router;