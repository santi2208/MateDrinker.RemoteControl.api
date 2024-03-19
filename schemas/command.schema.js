const Joi = require('joi');
const user_id = Joi.string().max(15);
const command = Joi.string().min(3).max(15);
const order = Joi.number().integer();


const queryCommandsSchema = Joi.object({
    user_id: user_id.required()

});

const createCommandSchema = Joi.object({
    user_id: user_id.required(),
    command: command.required(),
    order: order.required(),
});

module.exports = { createCommandSchema, queryCommandsSchema }