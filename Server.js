const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');


dotenv.config();


connectDB();

const app = express();


app.use(express.json());


app.use('/user',require('./Routers/user.router'));
app.use('/categories', require('./Routers/category.routers'));
app.use('/recipes',require('./Routers/recipe.router'));
app.use('/favorites',require('./Routers/favorite.router'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});