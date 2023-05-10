// import User database model
const User = require("../models/userModel");

// import jwt authentication package
const jwt = require("jsonwebtoken");

// import encryption package
const bcrypt = require("bcrypt");

// import custom errors
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../errors");

// log in
const login = async (req, res, next) => {
  try {
    // destructure username and password from json in request body
    const { username, password } = req.body;

    // query database for user matching username
    const user = await User.findOne({ username }, { _id: 0, __v: 0 }); // use projection to avoid retrieving unnecessary fields _id and __v
    if (!user) throw new UnauthorizedError("Invalid user credentials");

    // encrypt password and compare it to the user's encrypted password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedError("Invalid user credentials");

    // sign JWT authentication token
    const token = jwt.sign({ username: user.username, admin: user.admin }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    if (!token) throw new UnauthorizedError("Your user credentials could not be authorized");

    // respond successfully with token
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error); // pass any thrown error to error handler middleware
  }
};

// get all users (admin only)
const getUsers = async (req, res, next) => {
  try {
    // query database for all users
    const users = await User.find({}, { password: 0, __v: 0 });

    // respond successfully with result count and user data
    res.status(200).json({ success: true, resultCount: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// get user by username (admin only)
const getUser = async (req, res, next) => {
  try {
    // destructure username from url parameter
    const { username } = req.params;

    // validate username
    if (username.length > 25) throw new BadRequestError("Username cannot exceed 25 characters");

    // query database for user matching username
    const user = await User.findOne({ username }, { password: 0, __v: 0 });
    if (!user) throw new NotFoundError(`No user found matching username: ${username}`);

    // respond successfully with user data
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// register user (admin only)
const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // insert user with that username and password into the database
    const user = await User.create({ username, password: encryptedPassword });

    // log successful user addition to the console
    console.log(`User ${req.username} added user: ${req.body.username}`);

    // respond successfully with user data
    res.status(201).json({
      success: true,
      data: { _id: user._id, username: user.username, admin: user.admin },
    });
  } catch (error) {
    next(error);
  }
};

// delete user (admin only)
const deleteUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    // validate username
    if (username.length > 25) throw new BadRequestError("Username cannot exceed 25 characters");

    // delete user matching username in database
    const user = await User.findOneAndDelete({ username }, { projection: { password: 0, __v: 0 } });
    if (!user) throw new NotFoundError(`No user found matching username: ${username}`);

    // log successful user deletion to the console
    console.log(`User ${req.username} deleted user: ${username}`);

    // respond successfully
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getUsers, getUser, registerUser, deleteUser };
