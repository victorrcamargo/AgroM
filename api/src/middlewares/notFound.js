module.exports = (req, res, next) => {
    const error = new Error();
    error.statusCode = 404;
    error.message = "Route not Found";
    next(error);
}