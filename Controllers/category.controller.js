const category= require('../models/Category.model')
const catchError = require('../utils/catchError.utils');
const appError = require('../utils/AppError');
const AppError = require("../utils/AppError");
exports.createCategory= catchError(async(req,res,next) => {
     const newCategory= category(req.body)
     await newCategory.save()
     res.status(201).json({message: 'Category created'});
 })


exports.getCategoriesByName = catchError(async(req,res,next) => {
    const categories = await category.find({}, 'categoryName');

    res.status(200).json(categories);

})



exports.updateCategory = catchError(async(req,res,next) => {

    const id = req.params.id;
    const new_categoryName= req.body.categoryName;
    if (!new_categoryName) {
        // return res.status(400).json({ message: "New category name is required" });
        return next(new AppError("New category name is required",400));
    }
    const updatedCategory = await category.findByIdAndUpdate(
        id,
        { categoryName: new_categoryName },
        {
            new: true,
            runValidators: true
        }
    );
    if (!updatedCategory) {
        // return res.status(404).json({ message: "Category not found" });
    return next(new AppError("Category not found",404));
    }

    res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory
    });

})
exports.deleteCategory = catchError(async(req,res,next) => {

    const id = req.params.id;
    const deletedCategory = await category.findByIdAndDelete(id);

    if (!deletedCategory) {
        // return res.status(404).json({ message: "Category not found" });
    return next(new AppError("Category not found",404));
    }

    res.status(200).json({
        message: "Category deleted successfully"
    });

})