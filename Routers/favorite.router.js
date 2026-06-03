const express = require('express');
const router = express.Router();
const {addToFavorite,removeFromFavorite,getUserFavorites} = require('../Controllers/favorite.contreller');
const validate=require('../Middlewares/validation.middleware');
const {favoriteSchema} = require('../validations/favorite.validation');
const protect = require('../Middlewares/auth.middleware');
const allowTo = require('../Middlewares/role.middelwar');


router.post('/',protect,validate(favoriteSchema),addToFavorite);
router.get('/', protect, getUserFavorites);
router.delete('/',protect, removeFromFavorite);
module.exports=router;