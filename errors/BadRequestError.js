const CustomError = require("./CustomError");

// custom error class for Bad Request
class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400; // Bad Request error status code for response
  }
}

module.exports = BadRequestError;
