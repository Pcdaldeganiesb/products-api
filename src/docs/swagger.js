// src/docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products API",
      version: "1.0.0",
      description: "API RESTful de gerenciamento de produtos com autenticação JWT.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Product: {
          type: "object",
          required: ["name", "price", "stock"],
          properties: {
            name: { type: "string", example: "Teclado Gamer" },
            price: { type: "number", example: 199.90 },
            stock: { type: "number", example: 15 }
          }
        },
        UserRegister: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Paulo Silva" },
            email: { type: "string", example: "paulo@email.com" },
            password: { type: "string", example: "123456" }
          }
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "paulo@email.com" },
            password: { type: "string", example: "123456" }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec
};
