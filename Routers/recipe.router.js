const express = require('express');
const router = express.Router();
const {upload}=require('../utils/uploads.utils')
const {createRecipe,updateRecipe,deleteRecipe,getAllRecipes} = require('../controllers/recipe.controller');

router.post('/',upload.single('imageUrl'),createRecipe);
router.get('/',getAllRecipes);
router.delete('/:id',deleteRecipe);
router.put('/:id',upload.single('imageUrl'),updateRecipe);
module.exports=router;