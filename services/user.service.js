const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() { }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password; // Excluimos el password de la respuesta del servicio
    return newUser;
  }

  async find(query) {
    
    const options = {
      where: {}
    }
    const { limit, offset } = query;
    
    if (limit) {
      options.limit = parseInt(limit);
      options.offset =  offset? parseInt(offset) : 0;
    }

    const { email } = query;
    if (email) {
      options.where.email = email;
    }

    const users = await models.User.findAll(options);
    users.forEach(user => {
      delete user.dataValues.password;
    });
    return users;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
