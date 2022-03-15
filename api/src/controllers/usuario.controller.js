const Joi = require("joi");
const argon2 = require("argon2");

const UsuarioService = require("../services/usuario.service");
const ServicoService = require('../services/servico.service');
const tokenHelper = require("../helpers/token");

module.exports = {
  login: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().min(5).max(45).required(),
      });

      const { value, error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ errors: error.details });
      }

      const usuario = await UsuarioService.getByEmail(value.email);
      if (!usuario)
        return res.status(401).send({ error: "Email não cadastrado" });

      if (!(await argon2.verify(usuario.senha, value.senha))) {
        return res.status(401).send({ error: "Senha incorreta" });
      }

      delete usuario.senha;

      const token = tokenHelper.genAccessToken(usuario);

      return res.status(200).send({ usuario, token });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Erro ao realizar login" });
    }
  },
  cadastro: async (req, res, next) => {
    try {
      const schema = Joi.object({
        nome: Joi.string().min(3).max(200).trim().required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(5).max(45).required(),
        confirmarSenha: Joi.string().valid(Joi.ref("senha")).required(),
        telefone: Joi.string().min(8).max(12).trim().required(),
      });

      const { value, error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ errors: error.details });
      }

      delete value.confirmarSenha;

      const exists = await UsuarioService.getByEmail(value.email);
      if (exists) return res.status(400).send({ error: "Email já cadastrado" });

      const usuario = await UsuarioService.cadastro(value);

      delete usuario.senha;

      const token = tokenHelper.genAccessToken(usuario);

      return res.status(201).send({ usuario, token });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Erro ao cadastrar usuário" });
    }
  },
  perfil: async (req, res, next) => {
    try {
      const idUsuario = req.user.IDUsuario;

      const usuario = await UsuarioService.getById(idUsuario);
      delete usuario.senha;
      const servicos = await ServicoService.getByUser(idUsuario);

      return res.status(200).send({ usuario, servicos });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Erro ao carregar perfil" });
    }
  },
  atualizar: async (req, res, next) => {
    try {
      const schema = Joi.object({
        nome: Joi.string().min(3).max(200).trim().required(),
        telefone: Joi.string().min(8).max(12).trim().required(),
      });

      const { value, error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ errors: error.details });
      }

      const idUsuario = req.user.IDUsuario;

      const result = await UsuarioService.atualizar(idUsuario, value);

      return res.status(204).send({});
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Erro ao atualizar cadastro" });
    }
  },
};
