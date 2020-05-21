const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('../app/routes');
const { port, morganMode } = require('./config')
const { MONGO_URI, MONGODB_OPTIONS } = require('./db/mongo');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Users API Ingeniería Web",
      description: "Users API para aplicación móvil",
      contact: {
        name: "Andrés Isaza"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["../app.js", "./app/user/route.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const server = (app) => {
  mongoose.connect(MONGO_URI, MONGODB_OPTIONS, (err) => {
    if (err) {
      return console.log('Error while connecting to Mongo database');
    }
    return console.log('Succesfull Mongo database connection!');
  });
  app.disable('x-powered-by');
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(morganMode));
  app.use(cors());
  app.use('/', routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = server;
