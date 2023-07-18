const express = require("express");
const routerAuth = require("./routes/routerAuth");
const routerUser = require("./routes/routerUser");
// const multer = require('multer');
// Документация API
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "App Instagram API with Swagger",
            version: "1.0.0",
            description: "Это приложение основано на NodeJS Express и документировано при помощи Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Instagram",
                url: "https://instagram.lern.dev",
                email: "dev@email.com",
            },
        },
        components: {
            securitySchemes: {
                // Для использования как bearer token
                // bearerAuth: {
                //     type: 'http',
                //     scheme: 'bearer',
                //     bearerFormat: 'JWT',
                // },

                // Для использования как API Key
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'authorization'
                }
            }
        },
        // security: [{
        //     apiKeyAuth: []
        // }],
        servers: [
            {
            url: "https://instagram.lern.dev/api/v1/",
            },
        ],
    },
    apis: ["./routes/*.js", "./controllers/*.js", "./middlewares/*.js", "./models/*.js"],
};
const specification = swaggerJsdoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.multer());

app.use('/v1/', routerAuth);
app.use('/v1/', routerUser);

app.use( '/v1/documentation', swaggerUi.serve, swaggerUi.setup(specification) );

module.exports = app;