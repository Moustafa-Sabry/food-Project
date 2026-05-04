const category= require('../models/Category.model')
exports.createCategory=async(req, res) => {
    try{
    const newCategory= category(req.body)
        await newCategory.save()
        res.status(201).json({message: 'Category created'});
    }catch(e){
        res.status(500).json({error: e});
    }
}
exports.getCategoriesByName = async (req, res) => {
    try {
        const categories = await category.find({}, 'categoryName');

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories by name:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateCategory = async (req, res) => {
    try{
       const id = req.params.id;
       const new_categoryName= req.body.categoryName;
        if (!new_categoryName) {
            return res.status(400).json({ message: "New category name is required" });
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
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    }catch(e){
        res.status(500).json({
            message: "Error updating category",
            error: e.message
        });

    }
}
exports.deleteCategory = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedCategory = await category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category deleted successfully"
        });
    }catch (e) {
        res.status(500).json({
            message: "Error deleting category",
            error: e.message
        });
    }
}