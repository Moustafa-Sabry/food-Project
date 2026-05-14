const Joi = require('joi');

exports.categorySchema = Joi.object({

    categoryName: Joi.string()
        .min(2)
        .required()
});