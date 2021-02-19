const logger = require('../lib/logger');

const {
  process
} = require('../services/testService');

/**
 * Home controller.
 * @param {object} req request object.
 * @param {object} res response object.
 * @returns {Promise}.
 */
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

module.exports = {
  home
};
