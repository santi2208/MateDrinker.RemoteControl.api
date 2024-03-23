const commandsApp = require("./commands/index-commands")
const mainApp = require("./auth-user/index")

const { config } = require('../../config/config')
const { swaggerDocs: v1SwaggerDocs } = require("../../utils/swagger/swagger")
const COMMANDS_PORT = config.apis.commands.port;
const MAIN_PORT = config.apis.main.port;


mainApp.listen(MAIN_PORT, () => {
  console.log(`Servidor escuchando en el puerto ${MAIN_PORT}`);
  const apis = config.swagger.authUser.apis;
  v1SwaggerDocs(mainApp, MAIN_PORT, apis);
});

commandsApp.listen(COMMANDS_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${COMMANDS_PORT}`);
    const apis = config.swagger.commands.apis;
    v1SwaggerDocs(commandsApp, COMMANDS_PORT, apis);
});

