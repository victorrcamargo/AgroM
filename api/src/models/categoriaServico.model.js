const Model = require('../config/objection');

class CategoriaServicoModel extends Model {
  static get tableName() {
    return 'CategoriaServico';
  }

  static get idColumn() {
    return 'IDCategoriaServico';
  }
}

module.exports = CategoriaServicoModel;