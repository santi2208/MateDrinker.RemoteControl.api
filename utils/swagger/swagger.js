const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mate Remote Control Api",
            version: "1.0..0"
        }
    },
    apis: [
        "./utils/swagger/schemas/commands.schema.js"
        , "./utils/swagger/schemas/users.schema.js"
        , "./utils/swagger/schemas/auth.schema.js"
    ]
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(
        `Version 1 Docs at: http://localhost:${port}/api/v1/docs`
    )
}

module.exports = { swaggerDocs };