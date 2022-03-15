const Model = require('../config/objection');

class ImagemServicoModel extends Model {
  static get tableName() {
    return 'ImagemServico';
  }

  static get idColumn() {
    return 'IDImagemServico';
  }
}

module.exports = ImagemServicoModel;