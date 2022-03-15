const jwt = require('jsonwebtoken');

module.exports = {
    genAccessToken: (usuario, expiresIn = '30d') => {
        return jwt.sign({
            IDUsuario: usuario.IDUsuario,
            nome: usuario.nome,
            email: usuario.email,
        }, process.env.JWT_SECRET, { expiresIn });
    }
}