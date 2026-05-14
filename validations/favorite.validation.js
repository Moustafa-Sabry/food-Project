const Joi = require('joi');

exports.favoriteSchema = Joi.object({

    userId: Joi.string()
        .required(),

    recipeId: Joi.string()
        .required()
});