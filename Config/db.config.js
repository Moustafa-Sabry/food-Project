const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../Models/user.model');

const createDefaultAdmin = async () => {

    const admin = await User.findOne({
        email: 'admin@foodproject.com'
    });

    if (admin) {
        return;
    }

    await User.create({

        name: process.env.ADMIN_NAME,

        email: process.env.ADMIN_EMAIL,

        password: process.env.ADMIN_PASSWORD,

        role: 'admin',

        isVerified: true
    });

    console.log('Default admin created');
};

const connectDB = async () => {

    try {

        console.log(
            'Connection string:',
            process.env.CONNECTION_STRING
        );

        const conectionString =
            process.env.CONNECTION_STRING;

        const connection =
            await mongoose.connect(
                conectionString
            );

        console.log(
            `MongoDB Connected : ${connection.connection.host}`
        );

        await createDefaultAdmin();

    } catch (err) {

        console.log(
            `Database connection error: ${err.message}`
        );

        process.exit(1);
    }
};

module.exports = connectDB;