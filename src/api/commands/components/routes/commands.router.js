const express = require('express');
const CommandsService = require('../services/command.service');
const validatorHandler = require('../../../../../middlewares/validator.handler');
const { createCommandSchema, queryCommandsSchema } = require('../../../../../schemas/command.schema');
const { checkRoles } = require('../../../../../middlewares/auth.handler');

const passport = require('passport');
const router = express.Router();
const service = new CommandsService();

router.use('/api/v1', router);

router.get('/:user_id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(queryCommandsSchema, 'params'),
    getUnprocessedCommandsByUserId);

router.get('/',
    passport.authenticate('jwt', { session: false }),
    // validatorHandler(queryCommandsSchema, 'params'),
    getUnprocessedCommandsByAutenticatedUser);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createCommandSchema, 'body'),
    createCommand);

router.delete('/:user_id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(queryCommandsSchema, 'params'),
    deleteCommandsByAutenticatedUser);

async function getUnprocessedCommandsByUserId(req, res, next) {
    try {
        const key = req.params.user_id;
        service.find(key).then((commands) => res.json(commands));
    } catch (error) {
        next(error);
    }
}

async function getUnprocessedCommandsByAutenticatedUser(req, res, next) {
    try {
        const key = req.user.sub;
        service.find(key).then((commands) => res.json(commands));
    } catch (error) {
        next(error);
    }
}

async function createCommand(req, res, next) {
    try {
        const body = req.body;
        body.user_id = req.user.sub;
        service.create(body).then((result) => {
            res.status(201).json(result);
        });
    } catch (error) {
        next(error);
    }
}

async function deleteCommandsByAutenticatedUser(req, res, next) {
    try {
        const user_id = req.params.user_id;
        service.delete(user_id).then((result) => {
            res.status(204).json(result);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = router;