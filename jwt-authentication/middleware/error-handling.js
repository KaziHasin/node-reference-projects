const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

module.exports = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
};
