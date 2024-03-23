const Redis = require('ioredis');
const boom = require('@hapi/boom');
const { config } = require('../../../../../config/config');
const REDIS_TTL = 100;
let redis = null;

class CommandsService {
    constructor() {
        redis = new Redis({
            host: config.redis.host,
            port: config.redis.port,
            password: config.redis.password
        })
    }
    
    async find(key) {
        try {
            let commands = [];
            await redis.zrange(key, 0, -1, (error, values) => {
                if (error) {
                    throw boom.badRequest('Error al obtener el registro de Redis');
                }

                if (values.length > 0) {
                    redis.del(key);
                }
                commands = values;
            });
            return commands;

        } catch (error) {
            console.error(error);
        }
    }

    async create(data) {
        const { user_id, order, command } = data;
        
        try {
            redis.zadd(user_id, order, command);
            redis.expire(user_id, REDIS_TTL);
            return `Registro agregado exitosamente. La lista de comandos expirará en ${REDIS_TTL} segundos`;
        } catch (error) {
            throw boom.badRequest('Error al crear el registro de Redis');
        }
    }

    async delete(key) {
        try {
            return redis.del(key);
        } catch (error) {
            throw boom.badRequest('Error al elimina el registro de Redis');
        }
    }
}

module.exports = CommandsService;