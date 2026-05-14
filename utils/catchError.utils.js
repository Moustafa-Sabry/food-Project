module.exports = (fn) => {

    return (req, res, next) => {"from error util handler",Promise.resolve(fn(req, res, next)).catch(next);};
};