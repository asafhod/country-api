const CustomError = require("./CustomError");

// custom error class for Not Found
class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404; // Not Found error status code for response
  }
}

module.exports = NotFoundError;
