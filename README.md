<img src="https://github.com/damiancipolat/node-bff/blob/master/doc/node.png?raw=true" width="150px" align="right" />

# Special custom middleware for expressjs 🚀
This project consists of being a collection of middlewares created for expressjs. In order to have a focus on monitoring and traceability designed for production ready api-rest.

## List of middleware
Take a look in the folder **/src/server/middleware**.

| Name | Description  |
|-------------|--------|
|expressLogger.js | Log all request and response received, inject traceability ids. |
|restrict.js | Allow a request only if have an authorization header. |
|tokenDecoder.js | Inject in the context clienId from jwt and in the request object. |
|traceability.js | Inject in the request and the context the traceability from headers. |
|logger.js | A JSON logger module to log stdout always in this format, inject the traces and client value. |

## How to use?
Create a js file and import the middleware and bind in express app.

```js
const httpContext = require('express-http-context');

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
app.use(httpContext.middleware);
app.use(traceabilityContext);
app.use(token2Context);
app.use(expressLogger);
```

**Logger**
In the file **/src/server/controller/home.js*** the logger module, generate a **stdout** including some special values **"client,traceId"**.

```js
const logger = require('../lib/logger');

const home = async (req, res, next) => {  

  logger.log({
    message:'Processing home',
    value:'activated'
  });

  const mock = process();

  res.status(200).json({
    mock
  });

};
```

In the file **/src/server/services/testService.js*** the logger module, generate a **stdout** including some special values **"client,traceId"**.

```js
const logger = require('../lib/logger');

/**
 * Parse the client result.notification.parse(result[0]['body']),
 * @param {object} receive the db object.
 * @returns {object}
 */
const process = () => {

  logger.info('Run process test service');

  return {
    name:'Damian Cipolat',
    mone:'2000.00',
    benefits:[
      'golf',
      'psx',
      'netflix'
    ]
  };

}
```

## Detail:

### 1) **traceability**:
Extract the header **x-correlation-id** include this value in the request object with the attibute **traceId** and store in the context the **traceId** value,

### 2) **tokenDecoder**:
Extract the **"sub"** claim from the "authorization" header decoding the JWT token, modify the expressjs request object adding **"clientId"** attribute",
append in the context the **"client"** value with the **"sub"** value from jwt.

### 3) **expressLogger**:
This middleware log the **request** and **response** value received in the api.

## Examples:
In this section you can test the middleware, I include information about the stdout in each request.

### Example °1:
Try the next CURL with the running api.

**REQUEST**
```console
curl --location --request GET 'http://127.0.0.1:8000/home' \
--header 'x-correlation-id: 1213123213123213213123' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"damian"
}'
```

**STDOUT**
```bash
> node ./src/server/index.js

Running 8000
{"level":"LOG","code":0,"time":1613712617329,"message":"Received request","url":"/home","method":"GET","traceId":"1213123213123213213123","client":"1234567890"}
{"level":"LOG","code":0,"time":1613712617330,"message":"Processing home","value":"activated","traceId":"1213123213123213213123","client":"1234567890"}
{"level":"INFO","code":0,"time":1613712617330,"message":"Run process test service","traceId":"1213123213123213213123","client":"1234567890"}
{"level":"LOG","code":0,"time":1613712617330,"message":"Response request","url":"/","status":200,"method":"GET","traceId":"1213123213123213213123","client":"1234567890","response":{"mock":{"name":"Damian Cipolat","mone":"2000.00","benefits":["golf","psx","netflix"]}}}
```

**Traceability**
Take a look in the stdout, the expresslogger and the logger lib, extract the **traceId** and **client** from the headers and jwt.


### Example °2:
Try the next CURL with the running api.

**REQUEST**
```console
curl --location --request GET 'http://127.0.0.1:8000/health' \
--header 'x-correlation-id: 111111'
```

**STDOUT**
```bash
> node ./src/server/index.js

Running 8000
{"level":"LOG","code":0,"time":1613712720898,"message":"Received request","url":"/health","method":"GET","traceId":"111111"}
{"level":"LOG","code":0,"time":1613712720899,"message":"Response request","url":"/","status":201,"method":"GET","traceId":"111111","response":{"health":"OK"}}
```
