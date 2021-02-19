const jwtDecode = require('jwt-decode');
const httpContext = require('express-http-context');

/**
 * Decode a jwt token.
 * @param {string} jwt token.
 * @returns {boolean}
 */
const decode = (token) => jwtDecode(token);

/**
 * Receive decode, and load the token.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const token2Context = (req, res, next) => {

  //Extract the token from the header.
  const authorization = req.get('Authorization');

  //IF the authorization header is not defined.
  if (!authorization){
    next();
    return;
  }

  //Decode the token and extract the "sub" claim.
  const {
    sub
  } = decode(authorization);

  //If the sub claim is defined, add in context and request.  
  if (sub){

    //Set in context.
    httpContext.set('client',sub);

    //Modify request object.
    req.clientId=sub;

  }

  next();

}

module.exports = {
  decode,
  token2Context
}
