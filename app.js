const express = require('express');
const bodyParser = require('body-parser');
const storage = require('node-persist');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa la base de datos
storage.init();

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Ruta para el método POST
app.post('/command', (req, res) => {
  try {
    // Verifica que el cuerpo de la solicitud tiene las propiedades requeridas
    const { clave, valor } = req.body;
    console.log("----Posting------")
    console.log("CLAVE:" + clave.toString())
    console.log("VALOR:" + valor.toString()) 
    if (!clave || !valor) {
      return res.status(400).json({ error: 'Se requieren las propiedades "clave" y "valor" en el cuerpo de la solicitud.' });
    }

    // Guarda el objeto en la base de datos
    storage.setItem(clave, valor)
    .then(() => {
    console.log('Item guardado correctamente.');
    })
    .catch((error) => {
    console.error('Error al guardar el item:', error);
    });

    return res.status(200).json({ mensaje: 'Objeto guardado correctamente.' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.get('/command/:clave', (req, res) => {
    const clave = req.params.clave.toString();
    const valor =  storage.getItem(clave).then(valor => { 
        if (valor === undefined) {
          return res.status(404).json({ error: 'Objeto no encontrado.' });
        }
        return res.status(200).json({ clave, valor });
    });
  });

  app.get('/commands/unprocessed', (req, res) => {
    let valores = []
    db_response = storage.values().then(valor => { 
        valores.push(valor)
    });
    db_response.then(d => {
      valores_ordenados = valores.sort((a, b) => a.id - b.id);
      return res.status(200).json({ "commands": valores_ordenados });
    })
  });

  app.delete('/commands/:clave', (req, res) => {
    const clave = req.params.clave;

    // Verificar si la clave existe antes de intentar eliminar
    
    storage.keys().then(keys =>{
      let existeClave = keys.includes(clave)
      if (existeClave) {
        // Eliminar el elemento por clave
        storage.removeItem(clave);
        res.send(`Elemento con clave ${clave} eliminado.`);
      } else {
        res.status(404).send(`Elemento con clave ${clave} no encontrado.`);
      }
    })
  })

  app.delete('/commands/clear', (req, res) => {
    storage.clear();
    res.send('Todos los elementos eliminados.')
  })


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
