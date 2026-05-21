const Joi = require('joi');
exports.signUpSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),
    role: Joi.string()
        .valid('admin', 'user')
});
exports.signInSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});