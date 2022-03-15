const Model = require('../config/objection');

class ServicoVisualizadoModel extends Model {
  static get tableName() {
    return 'ServicoVisualizado';
  }

  static get idColumn() {
    return ['IDServico, IDUsuario'];
  }
}

module.exports = ServicoVisualizadoModel;