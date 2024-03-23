const mainApp = require("../index")

const { config } = require('../../../../config/config')
const { swaggerDocs: v1SwaggerDocs } = require("../../../../utils/swagger/swagger")

const MAIN_PORT = config.apis.main.port;

mainApp.listen(MAIN_PORT, () => {
  console.log(`Servidor escuchando en el puerto ${MAIN_PORT}`);
  const apis = [
    , "./src/api/auth-user/utils/swagger/users.schema.js"
    , "./src/api/auth-user/utils/swagger/auth.schema.js"
  ];
  v1SwaggerDocs(mainApp, MAIN_PORT, apis);
});