const jwt = require('jsonwebtoken');

function required(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ error: "Token obrigatório" });

    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return res.status(401).send({ error: "Token inválido" });

    const [schema, token] = parts;

    if (schema.toUpperCase() !== 'BEARER')
        return res.status(401).send({ error: "Token inválido" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: "Token inválido" });

        req.user = decoded;
        next();
    });
}

module.exports = { required };
