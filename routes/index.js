const express = require('express');

const commandsRouter = require('./commands.router');
const usersRouter = require('./users.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/commands', commandsRouter);
    router.use('/users', usersRouter);
}

module.exports = routerApi;