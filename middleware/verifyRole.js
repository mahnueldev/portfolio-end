module.exports = function(requiredRole) {
    return function(req, res, next) {
      if (req.user && req.user.role === requiredRole) {
        next();
      } else {
        return res.status(403).json({ msg: 'Insufficient role privileges' });
      }
    };
  };
  