const Joi = require('joi');

exports.createUserSchema = Joi.object({

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
        .valid('admin', 'user'),

    status: Joi.string()
        .valid('active', 'inactive')
});
exports.updateUserSchema = Joi.object({

    name: Joi.string().min(3),

    email: Joi.string().email(),

    password: Joi.string().min(6),

    role: Joi.string().valid('admin', 'user'),

    status: Joi.string().valid('active', 'inactive'),

});