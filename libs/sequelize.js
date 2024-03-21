const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'mysql',
  logging: config.secuelize.isProd ? false : true,
}

if (config.secuelize.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.mysql.url, options);

setupModels(sequelize);

module.exports = sequelize;
