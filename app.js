require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_TTL = 100;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
})

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

app.get('/commands/:user_id', async (req, res) => {
  const key = req.params.user_id;

  try {
    redis.zrange(key, 0, -1, (error, values) => {
      if (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener el registro de Redis' });
      }
      if(values.length > 0){
        console.log("Eliminando registros")
        redis.del(key);
      }
      
      res.json(values);
      console.log(values)
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el registro de Redis' });
  }
});

app.post('/command', async (req, res) => {
  const { user_id, order, command } = req.body;
  
  if (!user_id || !order || !command) {
    return res.status(400).json({ error: 'Se requieren las propiedades "user_id", "order" y  "command" en el cuerpo de la solicitud.' });
  }

  try {
    redis.zadd(user_id, order, command);
    redis.expire(user_id, REDIS_TTL);
    res.json({ message: `Registro agregado exitosamente. La lista de comandos expirará en ${REDIS_TTL} segundos` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el registro a Redis' });
  }
});

app.delete('/commands/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  redis.del(user_id);
  res.send(`Elemento con clave ${user_id} eliminado correctamente.`);
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
