const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.mysql.url,
    dialect: 'mysql',
  },
  remote: {
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.name,
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql'
  },
  production: {
    url: config.mysql.url,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
