const CustomError = require("./CustomError");

// custom error class for Forbidden
class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403; // Forbidden error status code for response
  }
}

module.exports = ForbiddenError;
