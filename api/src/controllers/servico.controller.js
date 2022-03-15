const Joi = require('joi');

const ServicoService = require('../services/servico.service');
const NotaServicoService = require('../services/notaServico.service');
const { avaliar } = require('../services/notaServico.service');


module.exports = {
    cadastro: async (req, res, next) => {
        try {
            const schema = Joi.object({
                nome: Joi.string()
                    .min(4)
                    .max(200)
                    .trim()
                    .required(),
                descricao: Joi.string()
                    .min(4)
                    .max(200)
                    .trim()
                    .required(),
                valor: Joi.number()
                    .min(0)
                    .required(),
                contato: Joi.string()
                    .min(8)
                    .max(12)
                    .trim()
                    .required(),
                estado: Joi.string()
                    .trim()
                    .max(50)
                    .default('sp'),
                cidade: Joi.string()
                    .trim()
                    .max(200)
                    .required(),
                IDCategoriaServico: Joi.number()
                    .integer()
                    .default(1),
                imagens: Joi.string()
                    .trim()
                    .default('/storage/emulated/0/DCIM/Camera/IMG_20201020_233619.jpg')
            });

            const { value, error } = schema.validate(req.body);
            if (error) {
                console.log(error.details);
                return res.status(400).send({ errors: error.details });
            }

            // const imgs = req.files;

            // if (!imgs || imgs && !imgs.length) {
            //     return res.status(400).send({ error: "Obrigatório pelo menos uma imagem" });
            // } else if (imgs.length > 6) {
            //     return res.status(400).send({ error: "Máximo de 6 imagens" });
            // }

            // const extensaoInvalida = imgs.filter(img => !img.mimetype.startsWith('image/'));

            // if (extensaoInvalida.length)
            //     return res.status(400).send({ error: "Permitido somente imagens" });
            const imgs = [{path: value.imagens}]
            delete value.imagens;
            value.IDUsuario = req.user.IDUsuario;

            const servico = await ServicoService.cadastro(value, imgs);
            // const servico = await ServicoService.cadastro(value);

            return res.status(201).send({ servico });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro ao cadastrar serviço" });
        }
    },
    listar: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 0;
            const limit = 25;

            const servicos = await ServicoService.listar(page, limit);

            console.log(servicos);
            return res.status(200).send({ servicos: servicos.results, total: servicos.total, page, limit });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro ao listar serviços" });
        }

    },
    infoServico: async (req, res, next) => {
        try {
            const idServico = parseInt(req.params.IDServico);

            const servico = await ServicoService.getInfo(idServico);

            return res.status(200).send({ servico });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro ao listar serviços" });
        }
    },
    atualizar: async (req, res, next) => {
        try {
            const schema = Joi.object({
                nome: Joi.string()
                    .min(4)
                    .max(200)
                    .trim(),
                descricao: Joi.string()
                    .min(4)
                    .max(200)
                    .trim(),
                valor: Joi.number()
                    .min(0),
                contato: Joi.string()
                    .min(8)
                    .max(12)
                    .trim(),
                estado: Joi.string()
                    .trim()
                    .max(50),
                cidade: Joi.string()
                    .trim()
                    .max(200),
                IDCategoriaServico: Joi.number()
                    .integer()
            });

            const { value, error } = schema.validate(req.body);
            if (error) {
                return res.status(400).send({ errors: error.details });
            } else if (!Object.keys(value).length) {
                return res.status(400).send({ error: "Verifique se os campos estão corretos" });
            }

            const idServico = parseInt(req.params.IDServico);
            const idUsuario = req.user.IDUsuario;

            const servico = await ServicoService.get(idServico);

            if (!servico) {
                return res.status(404).send({ errors: "Serviço não encontrado" });
            } else if (servico.IDUsuario !== idUsuario) {
                return res.status(403).send({});
            }

            const result = await ServicoService.atualizar(idServico, value);

            return res.status(204).send({});
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro ao atualizar serviço" });
        }
    },
    avaliar: async (req, res, next) => {
        try {
            const schema = Joi.object({
                nota: Joi.number()
                    .min(1)
                    .max(5)
                    .required()
            });

            const { value, error } = schema.validate(req.body);
            if (error) {
                return res.status(400).send({ errors: error.details });
            }

            const idServico = parseInt(req.params.IDServico);
            const idUsuario = req.user.IDUsuario;

            const avaliado = await NotaServicoService.get(idUsuario, idServico);

            if (!avaliado) {
                const result = await NotaServicoService.avaliar(idUsuario, idServico, value.nota);
            } else {
                const result = await NotaServicoService.atualizar(idUsuario, idServico, value.nota);
            }

            return res.status(204).send({});
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro ao adicionar avaliação" });
        }
    },
    remover: async (req, res, next) => {
        try {
            const idServico = parseInt(req.params.IDServico);
            const idUsuario = req.user.IDUsuario;

            const servico = await ServicoService.get(idServico);

            if (!servico) {
                return res.status(404).send({ errors: "Serviço não encontrado" });
            } else if (servico.IDUsuario !== idUsuario) {
                return res.status(403).send({});
            }

            const result = await ServicoService.remover(idServico);

            return res.status(204).send({});
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro ao remover serviço" });
        }
    },
}