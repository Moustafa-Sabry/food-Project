const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');
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
        const otp =
            Math.floor(
                100000 +
                Math.random() * 900000
            ).toString();
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

            role: 'user',

            otp,

            otpExpire:
                new Date(
                    Date.now() +
                    10 * 60 * 1000
                )
        });
        await sendEmail(

            email,

            'Food Project Verification',

            `Your OTP is: ${otp}`
        );
        // const token = generateToken(user._id);
        user.password = undefined;

        res.status(201).json({

            message: 'OTP sent to your email'

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

        if (!user.isVerified) {

            return next(
                new AppError(
                    'Please verify your account first',
                    401
                )
            );
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

        // res.status(200).json({message: 'Login successful', token});
        user.password = undefined;

        res.status(200).json({
            message:'Login successful',
            token,
            user
        });

    } catch (e) {

        next(e);
    }
};

exports.verifyOtp =
    async (req, res, next) => {

        try {

            const {
                email,
                otp
            } = req.body;

            const user =
                await User.findOne({
                    email
                });

            if (!user) {

                return next(
                    new AppError(
                        'User not found',
                        404
                    )
                );
            }

            if (
                user.otp !== otp
            ) {

                return next(
                    new AppError(
                        'Invalid OTP',
                        400
                    )
                );
            }

            if (
                user.otpExpire <
                Date.now()
            ) {

                return next(
                    new AppError(
                        'OTP expired',
                        400
                    )
                );
            }

            user.isVerified = true;

            user.otp = undefined;

            user.otpExpire = undefined;

            await user.save();

            res.status(200).json({

                message:
                    'Account verified successfully'
            });

        } catch (e) {

            next(e);
        }
    };