const express = require('express');
const router = express.Router();
const {addToFavorite,removeFromFavorite,getUserFavorites} = require('../controllers/favorite.contreller');

router.post('/',addToFavorite);
router.get('/:userId',getUserFavorites);
router.delete('/', removeFromFavorite);
module.exports=router;