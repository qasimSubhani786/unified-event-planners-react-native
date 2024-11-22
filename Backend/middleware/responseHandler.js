const {SUCCESS} = require("../common/constants");

module.exports = function responseHandler(req, res, next) {
  res.sendJson = function (status, code, message, data) {
    const response = {
      success: status === 1 ? true : false,
      message: message,
      data: data
    };
    res.status(code).json(response);
  };

  next();
};
