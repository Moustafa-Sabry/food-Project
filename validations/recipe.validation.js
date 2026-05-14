const Joi = require('joi');

exports.recipeSchema = Joi.object({

    recipeName: Joi.string()
        .min(3)
        .required(),

    description: Joi.string()
        .required(),

    size: Joi.string()
        .valid('small', 'medium', 'large')
        .required(),

    createdBy: Joi.string()
        .required(),

    categoryId: Joi.string()
        .required()
});