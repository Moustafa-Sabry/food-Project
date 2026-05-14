const express = require('express');
const router = express.Router();
const {createCategory,getCategoriesByName,deleteCategory,updateCategory} = require('../controllers/category.controller');
const validate=require('../Middlewares/validation.middleware');
const {categorySchema} = require('../validations/category.validation');


router.post('/',validate(categorySchema),createCategory);
router.get('/',getCategoriesByName);
router.delete('/:id',deleteCategory)
router.put('/:id',validate(categorySchema),updateCategory);
module.exports=router;