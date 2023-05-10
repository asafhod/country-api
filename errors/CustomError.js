// CustomError class which extends the Error class
// All custom errors for this API extend this class
// Used in the error handler middleware to distinguish this API's custom errors from any other errors
class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomError;
