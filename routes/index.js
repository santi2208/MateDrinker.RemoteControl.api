const express = require('express');

const commandsRouter = require('./commands.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/commands', commandsRouter);
}

module.exports = routerApi;