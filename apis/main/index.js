const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./components/routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('../../middlewares/error.handler');
const { swaggerDocs: v1SwaggerDocs } = require("../../utils/swagger/swagger")
const { config } = require('../../config/config')

const app = express();
const PORT = config.apis.main.port;
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
require('../../utils/auth');

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  const apis = [
    , "./apis/main/utils/swagger/users.schema.js"
    , "./apis/main/utils/swagger/auth.schema.js"
  ];
  v1SwaggerDocs(app, PORT, apis);
});
