module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno';

    res.status(statusCode).send({ error: message });
}
