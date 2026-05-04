const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async ()=>{
    try{
        console.log('Connection string:', process.env.CONNECTION_STRING);
        const conectionString = process.env.CONNECTION_STRING;
        const connection = await mongoose.connect(conectionString);
        console.log(`MongoDB Connected : ${connection.connection.host}`);
    }
    catch(err){
        console.log(`Database connection error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;