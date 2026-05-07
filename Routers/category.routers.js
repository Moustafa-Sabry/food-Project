const express = require('express');
const router = express.Router();
const {createCategory,getCategoriesByName,deleteCategory,updateCategory} = require('../controllers/category.controller');

router.post('/',createCategory);
router.get('/',getCategoriesByName);
router.delete('/:id',deleteCategory)
router.put('/:id',updateCategory);
module.exports=router;