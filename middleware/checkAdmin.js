// import Forbidden error
const { ForbiddenError } = require("../errors");

// admin status-checking middleware
const checkAdmin = (req, res, next) => {
  // check if request's admin property was set to true by the user authentication middleware
  if (req.admin) {
    // user is an admin - call next middleware
    next();
  } else {
    // user is not an admin - throw Forbidden error
    throw new ForbiddenError("You do not have permission to perform this action");
  }
};

module.exports = checkAdmin;
