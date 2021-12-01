
// test controller
exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Hos hierdie route wys al die produckte in die db"
    });
};