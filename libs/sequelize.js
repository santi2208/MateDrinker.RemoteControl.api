const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const dbUrl = config.isProd ? config.remoteDbUrl : config.localDbUrl;
const options = {
  dialect: 'mysql',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
