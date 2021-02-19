const httpContext = require('express-http-context');

/**
 * Add the traceability header in the express context.
 * @param {object} req request object.
 * @param {object} res response object.
 * @param {object} next next object.
 */
const traceabilityContext = (req, res, next) => {

  //Get correlations ids
  const traceId = (req.headers['x-correlation-id'])?req.get('x-correlation-id'):null;

  //IF the tracebility header is not defined.
  if (!traceId){
    next();
    return;
  }

  //Set in context.
  httpContext.set('traceId',traceId);

  //Modify request object.
  req.traceId=traceId;

  next();

}

module.exports = {
  traceabilityContext
}
