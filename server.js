const express = require("express");
const mongoose = require("mongoose");

// initialize environment variables
require("dotenv").config();

// import routers
const usersRouter = require("./routes/users");
const countriesRouter = require("./routes/countries");

// import middleware
const errorHandler = require("./middleware/errorHandler");
const routeNotFound = require("./middleware/routeNotFound");

// import security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// import documentation UI packages
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const documentation = yaml.load("./documentation.yaml"); // load documentation file

// initialize express
const app = express();

// middleware
app.set("trust proxy", 1); // use reverse proxy's settings
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // limit each IP to 100 requests per 15 minutes

app.use(express.static("public"));
app.use(express.json());

app.use(helmet()); // HTTP header security
app.use(cors()); // enable cross-origin resource sharing
app.use(xss()); // sanitize HTML to prevent cross-site scripting attacks

// routes
app.use("/users", usersRouter);
app.use("/countries", countriesRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(documentation)); // serve documentation
app.use(routeNotFound);

// error handler
app.use(errorHandler);

// get port on server from environment variable
const port = process.env.PORT || 3000;

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Country API server is listening on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
