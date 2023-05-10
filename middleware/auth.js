// import jwt authentication package
const jwt = require("jsonwebtoken");

// import Unauthorized error
const { UnauthorizedError } = require("../errors");

// user authentication middleware
const auth = (req, res, next) => {
  // get authorization header
  const authHeader = req.headers.authorization;

  // validate authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization header is missing or invalid");
  }

  // get token from authorization header
  const token = authHeader.split(" ")[1];

  try {
    // verify and decode token using JWT_SECRET environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set user's username and admin status obtained from token on request body
    req.username = decoded.username;
    req.admin = decoded.admin;

    // call next middleware
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication token is invalid or expired");
  }
};

module.exports = auth;
