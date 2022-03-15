const NotaServicoModel = require('../models/notaServico.model');

class NotaServicoService {
    async avaliar(idUsuario, idServico, nota) {
        const result = await NotaServicoModel
            .query()
            .insert({
                IDUsuario: idUsuario,
                IDServico: idServico,
                nota: nota
            });

        return result;
    }

    async atualizar(idUsuario, idServico, nota) {
        const result = await NotaServicoModel
            .query()
            .findOne({
                IDUsuario: idUsuario,
                IDServico: idServico
            })
            .patch({ nota: nota });

        return result;
    }

    async get(idUsuario, idServico) {
        const result = await NotaServicoModel
            .query()
            .findOne({
                IDUsuario: idUsuario,
                IDServico: idServico
            });

        return result;
    }
}


module.exports = new NotaServicoService();