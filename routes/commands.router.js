const express = require('express');
const CommandsService = require('./../services/command.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCommandSchema, queryCommandsSchema } = require('./../schemas/command.schema');

const router = express.Router();
const service = new CommandsService();


router.get('/:user_id',
    validatorHandler(queryCommandsSchema, 'params'),
    async (req, res, next) => {
        try {
            const key = req.params.user_id;
            service.find(key).then((commands) => res.json(commands));
        } catch (error) {
            next(error);
        }
    });

router.post('/',
    validatorHandler(createCommandSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            service.create(body).then((result) => {
                res.status(201).json(result);
            });
        } catch (error) {
            next(error);
        }
    });

router.delete('/:user_id',
    validatorHandler(queryCommandsSchema, 'params'),
    async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            service.delete(user_id).then((result) => {
                res.status(201).json(result);
            });
        } catch (error) {
            next(error);
        }
    });

module.exports = router;