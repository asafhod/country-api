// import joi validation schemas
const { addCountrySchema, addCountriesSchema, updateCountrySchema, userLoginRegSchema } = require("../validation/schemas");

// import custom Bad Request error
const { BadRequestError } = require("../errors");

// closure which accepts joi schema and returns validation middleware for it
const validator = (schema) => {
  return (req, res, next) => {
    // validate request body matches schema
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) throw new BadRequestError(error);

    next();
  };
};

// use validator function to generate validation middleware for all schemas
const validateAddCountry = validator(addCountrySchema);
const validateAddCountries = validator(addCountriesSchema);
const validateUpdateCountry = validator(updateCountrySchema);
const validateLoginReg = validator(userLoginRegSchema);

module.exports = { validateAddCountry, validateAddCountries, validateUpdateCountry, validateLoginReg };
