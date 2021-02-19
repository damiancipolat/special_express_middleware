
/**
 * Restrict the access
 * @param {object} req   request object.
 * @param {object} res   response object.
 * @param {object} next  next middleware.
 * @returns {Promise}.
 */
const restrictHandler = (req, res, next) => {
  try {
    //Extract the header.
    const { authorization } = req.headers;

    //Reject if the header is'nt present.
    if (!authorization) res.status(403).json({ message: 'Access denied' });
    else next();
  } catch (error) {

    console.log('error', error);
    next();
  }
};

module.exports = {
  restrictHandler,
};
