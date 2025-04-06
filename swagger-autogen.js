const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Books API Documentation',
        description: 'The 3 project in the course of WEB Programing',
    },
    host: 'localhost:3000/',
    schemes: ['http', 'https'],
    tags: [
    {
      name: 'User',
      description: 'Authentication endpoints',
    },  
    {
      name: 'Books',
      description: 'Books endpoints',
    },
    {
      name: 'User',
      description: 'Authentication endpoints',
    },
    {
      name: 'Comments',
      description: 'Comments endpoints',
    },
    {
      name: 'Search',
      description: 'Search endpoints',
    },
    {
        name: 'Categories',
        description: 'Categories endpoints',
    },
    {
        name: 'Authors',
        description: 'Authors endpoints',
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter JWT token with **Bearer** prefix, e.g. _Bearer your_token_',
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, config);