module.exports = function (req, res, next) {
  //  401 - Unauthorized
  //  403 - Forbidden

  if (!req.user.isAdmin) return res.sendJson(0, 403, "Access Denied!", null);
  next();
};
