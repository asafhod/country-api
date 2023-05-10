// import all custom errors
const CustomError = require("./CustomError");
const BadRequestError = require("./BadRequestError");
const UnauthorizedError = require("./UnauthorizedError");
const ForbiddenError = require("./ForbiddenError");
const NotFoundError = require("./NotFoundError");

// export all custom errors from this index.js file so they can be destructured from the "/errors" path as needed
module.exports = { CustomError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError };
