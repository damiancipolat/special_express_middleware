const httpContext = require('express-http-context');
const logger = require('../lib/logger');

/**
 * Modify the response object appending a response logger.
 * @param {object} res   response object.
 * @returns {Promise}.
 */
const expressResponse = (req,res)=>{

  //Store the old functions.
  const oldStatus = res.status;
  const oldJson = res.json;

  //Create the log payload.
  const payload = makePayload(req);

  //Log payload.
  let status;

  //Override status function to keep the response status code.
  res.status = function (code) {
    status = code;
    return oldStatus.apply(res, arguments);
  };

  //Override the json function to log the response object.
  res.json = function (value) {    

    logger.log({
      message:'Response request',
      url:req.url,
      status,
      method:req.method,
      ...payload,
      response:value
    });

    return oldJson.apply(res, arguments);
  };

  return res;
  
}

/**
 * Create a payload using the context and request.
 * @param {object} req   request object.
 * @returns {object}.
 */
const makePayload = (req)=>{
  
  //Get body.
  const payload = (req.method!='GET')?{
    body:req.body
  }:{};

  //Get correlations ids
  const ids = (req.headers['x-correlation-id'])?{
    traceId:req.get('x-correlation-id')
  }:{};

  //Get client-id
  const client = (httpContext.get('client'))?{
    client:httpContext.get('client')
  }:{};

  return {
    ...payload,
    ...ids,
    ...client
  };

}

/**
 * Restrict the access
 * @param {object} req   request object.
 * @param {object} res   response object.
 * @param {object} next  next middleware.
 * @returns {Promise}.
 */
const expressLogger = (req, res, next) => {

  //Create the log payload.
  const payload = makePayload(req);

  //Stdout the request
  logger.log({
    message:'Received request',
    url:req.url,
    method:req.method,
    ...payload
  });

  //Bind logger to response.
  res = expressResponse(req,res);

  next();

};

module.exports = {
  expressLogger
};
