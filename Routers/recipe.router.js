const express = require('express');
const router = express.Router();
const {upload}=require('../utils/uploads.utils')
const {createRecipe,updateRecipe,deleteRecipe,getAllRecipes} = require('../controllers/recipe.controller');
const validate=require('../Middlewares/validation.middleware');
const {categorySchema} = require('../validations/category.validation');
router.post('/',validate(categorySchema),upload.single('imageUrl'),createRecipe);
router.get('/',getAllRecipes);
router.delete('/:id',deleteRecipe);
router.put('/:id',validate(categorySchema),upload.single('imageUrl'),updateRecipe);
module.exports=router;