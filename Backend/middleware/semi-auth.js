const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  try {
    if (token) {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.user = decoded;
    }
    next();
  } catch (error) {
    res.sendJson(0, 400, "Invalid Token!", null);
  }
};
