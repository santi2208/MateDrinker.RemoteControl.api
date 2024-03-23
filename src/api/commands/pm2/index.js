const commandsApp = require("../index-commands")

const { config } = require('../../../../config/config')
const { swaggerDocs: v1SwaggerDocs } = require("../../../../utils/swagger/swagger")
const COMMANDS_PORT = config.apis.commands.port;

commandsApp.listen(COMMANDS_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${COMMANDS_PORT}`);
    const apis = ["./src/api/commands/utils/swagger/commands.schema.js"];
    v1SwaggerDocs(commandsApp, COMMANDS_PORT, apis);
});
