const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const generateToken = (id) => {

    return jwt.sign(

        { id },

        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};
exports.signUp = async (req, res, next) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return next(new AppError('Email already exists', 400));
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const token = generateToken(user._id);
        user.password = undefined;

        res.status(201).json({

            message: 'User created successfully',

            token,

            user
        });

    } catch (e) {

        next(e);
    }
};

exports.signIn = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return next(
                new AppError('Invalid email or password', 401));
        }

        const correctPassword = await user.comparePassword(password);

        if (!correctPassword) {

            return next(
                new AppError(
                    'Invalid email or password',
                    401
                )
            );
        }
        const token = generateToken(user._id);

        user.password = undefined;

        res.status(200).json({message: 'Login successful', token});

    } catch (e) {

        next(e);
    }
};