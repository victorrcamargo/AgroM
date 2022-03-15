const Model = require('../config/objection');

class NotaServicoModel extends Model {
  static get tableName() {
    return 'NotaServico';
  }

  static get idColumn() {
    return ['IDServico, IDUsuario'];
  }
}

module.exports = NotaServicoModel;