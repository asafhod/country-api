// import CustomError class
const { CustomError } = require("../errors");

// middleware which catches all errors and sends response with appropriate error status code and message
const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    // if error is one of this API's custom errors, send response with its corresponding status code and message
    res.status(error.statusCode).json({ success: false, msg: error.message });
  } else if (error.code === 11000 && error.writeErrors) {
    // if error is a MongoDB Duplicate Value error for a batch operation (such as inserting multiple countries where one has a duplicate id)
    res.status(400).json({
      success: false,
      msg: "Batch operation aborted: Cannot insert duplicate value",
      data: error.writeErrors[0].err.op, // object which triggered the Duplicate Value error and caused the operation to be aborted
    });
  } else if (error.code === 11000) {
    // if error is a MongoDB Duplicate Value error for a non-batch operation (such as inserting a country which has a duplicate id)
    res.status(400).json({
      success: false,
      msg: `Cannot insert duplicate value - Field: ${Object.keys(error.keyValue)[0]}, Value: ${Object.values(error.keyValue)[0]}`,
    });
  } else if (error.type === "entity.parse.failed") {
    // if error happened when middleware attempted to parse the request JSON
    res.status(400).json({
      success: false,
      msg: "Request body contains invalid JSON",
    });
  } else if (error.name === "ValidationError") {
    // if error is a MongoDB Validation Error (such as missing a required field)
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  } else if (error.name === "CastError") {
    // if error is a MongoDB Cast Error (such as attempting to set an array as a value for a non-array field)
    res.status(400).json({
      success: false,
      msg: `Cannot cast ${error.valueType} value to ${error.kind} for field: ${error.path}`,
      value: error.value, // value which triggered the Cast Error
    });
  } else {
    // any other error will trigger an Internal Server Error response
    console.error(error); // log the error to the console for analysis
    res.status(500).json({ success: false, msg: "Server error - Please try again later" });
  }
};

module.exports = errorHandler;
