const express = require('express');
const router = express.Router();
const {createRecipe,updateRecipe,deleteRecipe,getAllRecipes} = require('../controllers/recipe.controller');

router.post('/',createRecipe);
router.get('/',getAllRecipes);
router.delete('/:id',deleteRecipe);
router.put('/:id',updateRecipe);
module.exports=router;