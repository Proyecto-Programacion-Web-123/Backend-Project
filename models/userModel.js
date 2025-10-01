const db = require('../db');

const UserModel = {
   findAll: () => db('users').whereNull('deleted_at').select('*'),
  findById: (id) => db('users').where({ id_user : id }).whereNull('deleted_at').first(),
  create: (user) => db('users').insert(user),
  update: (id, user) => db('users').where({ id_user: id }).update(user),
  delete: (id) => db('users').where({ id_user: id }).update({ deleted_at: db.fn.now() })
};

module.exports = UserModel;