const Model = require('../config/objection');

class UsuarioModel extends Model {
  static get tableName() {
    return 'Usuario';
  }

  static get idColumn() {
    return 'IDUsuario';
  }
}

module.exports = UsuarioModel;