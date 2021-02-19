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

module.exports = {
  process
};



