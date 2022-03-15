const Model = require('../config/objection');

class ServicoModel extends Model {
  static get tableName() {
    return 'Servico';
  }

  static get idColumn() {
    return 'IDServico';
  }

  static get relationMappings() {
    const ImagemServicoModel = require('./imagemServico.model');
    return {
      ImagemServico: {
        relation: Model.HasManyRelation,
        modelClass: ImagemServicoModel,
        join: {
          from: 'Servico.IDServico',
          to: 'ImagemServico.IDServico'
        }
      },
    }
  }
}

module.exports = ServicoModel;