module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.sendJson(0, 500, error, null);
      next(error);
    }
  };
};
