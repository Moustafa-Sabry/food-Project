const express = require('express');
const router = express.Router();
const {addToFavorite,removeFromFavorite,getUserFavorites} = require('../controllers/favorite.contreller');
const validate=require('../Middlewares/validation.middleware');
const {favoriteSchema} = require('../validations/favorite.validation');
router.post('/',validate(favoriteSchema),addToFavorite);
router.get('/:userId',getUserFavorites);
router.delete('/', removeFromFavorite);
module.exports=router;