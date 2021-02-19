//Include api modules.
const http = require('http');
const express = require('express');
require('dotenv').config();
const config = require('../../config');
const bodyParser = require('body-parser');
const httpContext = require('express-http-context');

//Define routes and events
const routes = require('./routes');

const { port } = config.server;
const { version } = require('../../package.json');

//Load custom middlewares
const {
  traceabilityContext,
  token2Context,
  expressLogger
} = require('./middleware');

//Start Express-js.
const app = express();
const server = http.createServer(app);

//Parse the request to use the body for the events.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(httpContext.middleware);
app.use(traceabilityContext);
app.use(token2Context);
app.use(expressLogger);

//Bind the api routes.
app.use('/health', routes.health);
app.use('/home', routes.home);

//Start listen mode.
app.listen(port, () =>console.log('Running',port));