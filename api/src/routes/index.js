const { Router } = require('express');
const usuario = require('./usuario');
const servico = require('./servico');

const router = Router();


router.use('/usuarios', usuario);
router.use('/servicos', servico);


module.exports = router;