/**
 * Health controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const health = (req,res)=>{
  res.status(201).json({"health":"OK"});
}

module.exports = health