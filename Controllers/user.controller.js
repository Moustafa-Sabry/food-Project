const user= require('../models/user.model')
const Favorite = require('../models/favorite.model');
const catchError = require('../utils/catchError.utils');
const AppError=require('../utils/AppError');
exports.createUser= catchError(async(req,res,next) => {

    const   {name,email,password,role}=req.body;
    if(req.body.role!=='user'&&req.body.role!=='admin'){
        // return res.status(403).json({ message: 'Invalid role' });
        return next(new AppError("Invalid role ",403))
    }
    else {
        const existing= await user.findOne({ email });
        if(existing){
            return res.status(403).json({ message: 'E-mail already exists' });
        }
        else{
            const newuser = await user.create({
                name,
                email,
                password,
                role,
            });
            return res.status(201).json({ message: 'User created', newuser });
        }
    }

})
exports.getAllUsers =catchError(async(req,res,next) => {

    const users = await user.find();

    res.status(200).json(users);

})

exports.deleteUser =catchError(async(req,res,next) => {
    const { id } = req.params;

    const User = await user.findById(id);

    if (!User) {
        // return res.status(404).json({ message: "User not found" });
        return next(new AppError("User not found",404));
    }

    await Favorite.deleteMany({ userId: id });

    await user.findByIdAndDelete(id);

    res.status(200).json({
        message: "User deleted successfully"
    });


})

exports.updateUser = catchError(async(req,res,next) => {

    const { id } = req.params;

    const updatedUser = await user.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedUser) {
        // return res.status(404).json({ message: "User not found" });
        return next(new AppError("User not found",404));
    }

    res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
    });


})
exports.getUserById =catchError(async(req,res,next) => {
    const { id } = req.params;

    const User = await user.findById(id);

    if (!User) {
        // return res.status(404).json({ message: "User not found" });
        return next(new AppError("User not found",404));
    }

    res.status(200).json(User);

})
