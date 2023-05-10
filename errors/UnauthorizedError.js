const CustomError = require("./CustomError");

// custom error class for Unauthorized
class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401; // Unauthorized error status code for response
  }
}

module.exports = UnauthorizedError;
