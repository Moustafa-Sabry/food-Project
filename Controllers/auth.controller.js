const User = require('../Models/user.model');

exports.signUp = async (req, res, next) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return next(
                new Error('Email already exists')
            );
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        user.password = undefined;

        res.status(201).json({
            message: 'User created successfully',
            user
        });

    } catch (e) {

        next(e);
    }
};


exports.signIn = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({message: 'Invalid email or password'});
        }


        const correctPassword =
            await user.comparePassword(password);

        if (!correctPassword) {

            return res.status(400).json({message: 'Invalid email or password'});
        }

        user.password = undefined;


        res.status(200).json({message: 'Login successful'});

    } catch (e) {

        res.status(500).json({error: e.message});
    }
};