const ServicoModel = require('../models/servico.model');
const ImagemServicoModel = require('../models/imagemServico.model');
const NotaServicoModel = require('../models/notaServico.model');
const { servico } = require('../config/multer');

class ServicoService {
    async get(id) {
        const servico = await ServicoModel
            .query()
            .findById(id);

        return servico;
    }

    async getByUser(IDUsuario) {
        const servicos = await ServicoModel
            .query()
            .where({ IDUsuario })
            .withGraphFetched('ImagemServico as imagens')

        return servicos;
    }

    async getInfo(id) {
        const servico = await ServicoModel
            .query()
            .findById(id)
            .withGraphFetched('ImagemServico as imagens');

        const _avaliacao = await NotaServicoModel
            .query()
            .where({
                IDServico: id
            })
            .count('IDServico as avaliacoes')
            .avg('nota as nota');

        const avaliacao = _avaliacao[0];
        avaliacao.nota = avaliacao.nota ? parseInt(avaliacao.nota) : 0;
        servico.avaliacao = avaliacao

        return servico;
    }

    async listar(page = 0, limit = 25) {
        // TODO: Adicionar filtros
        const servicos = await ServicoModel
            .query()
            .withGraphFetched('ImagemServico as imagens')
            .page(page, limit);

        return servicos;
    }

    async cadastro(servico, imagens) {
        const result = await ServicoModel.transaction(async tx => {
            const _servico = await ServicoModel
                .query(tx)
                .insert(servico);

            const _imagens = imagens.map(img => {
                return ImagemServicoModel
                    .query(tx)
                    .insert({ path: img.path, IDServico: _servico.IDServico });
            });

            const imgs = await Promise.all([..._imagens]);

            _servico.imagens = imgs;

            return _servico;
        })

        return result;
    }

    async atualizar(id, values) {
        const result = await ServicoModel
            .query()
            .findById(id)
            .patch(values);

        return result;
    }

    async remover(id) {
        const result = await ImagemServicoModel.transaction(async tx => {
            await ImagemServicoModel
                .query(tx)
                .delete()
                .where({ IDServico: id });

            const _result = await ServicoModel
                .query(tx)
                .deleteById(id);

            return _result;
        });

        return result;
    }
}


module.exports = new ServicoService();