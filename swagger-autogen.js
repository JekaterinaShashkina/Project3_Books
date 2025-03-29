const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Books API Documentation',
        description: 'The 3 project in the course of WEB Programing',
    },
    tags: [ ],
    host: 'localhost:3000/',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);