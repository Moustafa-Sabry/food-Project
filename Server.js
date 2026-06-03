const express = require('express');
const dotenv = require('dotenv');
// const connectDB = require('./config/db.config');
const connectDB = require('./Config/db.config');
const errorMiddleware = require('./Middlewares/error.middleware');
const AppError = require('./utils/AppError');
const cors = require('cors');

dotenv.config();
process.on('uncaughtException', (err) => {

    console.log('UNCAUGHT EXCEPTION!');
    console.log(err.name, err.message);

    process.exit(1);
});

connectDB();

const app = express();


app.use(express.json());
app.use(cors())
app.use('/auth',require('./Routers/auth.router'));
app.use('/user',require('./Routers/user.router'));
app.use('/categories', require('./Routers/category.routers'));
app.use('/recipes',require('./Routers/recipe.router'));
app.use('/favorites',require('./Routers/favorite.router'));


app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {

    console.log('UNHANDLED REJECTION!');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});
// versel deploy
// module.exports = app;