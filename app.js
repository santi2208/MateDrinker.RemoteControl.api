const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
require('./utils/auth');
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
