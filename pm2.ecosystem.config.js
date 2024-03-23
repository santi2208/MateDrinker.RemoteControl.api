module.exports = {
    apps : [{
      name   : "user-auth",
      script : "./src/api/auth-user/pm2/index.js"
    },{
      name   : "commands",
      script : "./src/api/commands/pm2/index.js"
    }]
  }