const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Contacts API — CRUD operations backed by MongoDB',
  },
  host: 'cse341-contacts-oqlh.onrender.com',
  basePath: '/contacts',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);