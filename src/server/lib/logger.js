const httpContext = require('express-http-context');

/**
 * Generate a client and traceid object to be injected in log object.
 * @returns {object} {traceId,clientId}
 */
const traceInjector = ()=>{

  const trace = httpContext.get('traceId')?{
    traceId:httpContext.get('traceId')
  }:{};

  const client = httpContext.get('client')?{
    client:httpContext.get('client')
  }:{};
 
  return {
    ...trace,
    ...client
  };

}

//Define numeric level number.
const levelMaps = {
    ALL: 0,
    DEBUG: 10,
    INFO: 20,
    WARN: 30,
    ERROR: 40
};

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const format = (level,value,code)=>({
    level,
    code:levelMaps[code]||0,
    time:new Date().getTime(),
    ...(typeof value ==='object')?value:{message:value},
    ...traceInjector()
});

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const all = (value)=>console.log(JSON.stringify(format('ALL',value, 10)));

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const debug = (value)=>console.log(JSON.stringify(format('DEBUG',value, 10)));

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const info = (value)=>console.log(JSON.stringify(format('INFO',value, 20)));

/**
 * Return a formatted log.
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const warn = (value)=>console.error(JSON.stringify(format('WARN',value, 30)));

/**
 * @param {number} level log number level.
 * @param {string} code log description.
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const error = (value) => console.log(JSON.stringify(format("ERROR", value, 40)));

/**
 * @param {object} value object or primitive to log.
 * @returns {}
 */
const log = (value) => console.log(JSON.stringify(format("LOG", value, 40)));

module.exports = {
  log,
  all,
  debug,
  info,
  warn,
  error
};
