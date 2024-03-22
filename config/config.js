require('dotenv').config();

const config = {
  apis: {
    main: {
      port: process.env.PORT || 3000,
    },
    commands: {
      port: process.env.PORT || 3001,
    }
  },
  redis: {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  mysql: {
    url: process.env.DATABASE_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  jwt: {
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  },
  secuelize:{
    isProd: process.env.NODE_ENV === 'production',    
  }
}

module.exports = { config };