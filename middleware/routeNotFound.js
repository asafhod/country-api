// import NotFound error
const { NotFoundError } = require("../errors");

// catch-all route middleware used when route is not found
const routeNotFound = (req, res, next) => {
  throw new NotFoundError("Resource not found");
};

module.exports = routeNotFound;
