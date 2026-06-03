const express = require('express');
const router = express.Router();
const {createCategory,getCategoriesByName,deleteCategory,updateCategory} = require('../Controllers/category.controller');
const validate=require('../Middlewares/validation.middleware');
const {categorySchema} = require('../validations/category.validation');
const protect = require('../Middlewares/auth.middleware');
const allowTo = require('../Middlewares/role.middelwar');



router.post('/',protect, allowTo('admin'),validate(categorySchema),createCategory);
router.get('/',getCategoriesByName);

router.delete('/:id',protect, allowTo('admin'),deleteCategory)

router.put('/:id',protect, allowTo('admin'),validate(categorySchema),updateCategory);


module.exports=router;