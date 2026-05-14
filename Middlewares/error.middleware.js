module.exports = (err, req, res, next) => {

    console.log("error:", err.message);

    res.status(500).json({

        status: "error",
        message: err.message || "Server Error"
    });
};