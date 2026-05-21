const AppError = require('../utils/AppError');

module.exports = (...roles) => {

    return (req, res, next) => {


        if (!roles.includes(req.user.role)) {

            return next(new AppError('You do not have permission', 403));
        }

        next();
    };
};