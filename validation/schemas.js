// import joi
const Joi = require("joi");

// validation schema for the Add Country request
const addCountrySchema = Joi.object({
  id: Joi.string().length(2).required(),
  names: Joi.array().min(1).items(Joi.string().min(1).max(75)).required(),
  languages: Joi.array().items(Joi.string().min(1).max(50)),
  regions: Joi.array().items(Joi.string().min(1).max(50)),
  orgs: Joi.array().items(Joi.string().min(1).max(50)),
  population: Joi.number().min(0).max(5000000000),
  gdp: Joi.number().min(0).max(50000000000000),
  flag: Joi.string().max(6),
});

// validation schema for the Add Countries request
const addCountriesSchema = Joi.array()
  .min(1)
  .items({
    id: Joi.string().length(2).required(),
    names: Joi.array().min(1).items(Joi.string().min(1).max(75)).required(),
    languages: Joi.array().items(Joi.string().min(1).max(50)),
    regions: Joi.array().items(Joi.string().min(1).max(50)),
    orgs: Joi.array().items(Joi.string().min(1).max(50)),
    population: Joi.number().min(0).max(5000000000),
    gdp: Joi.number().min(0).max(50000000000000),
    flag: Joi.string().max(6),
  });

// validation schema for the Update Country request
const updateCountrySchema = Joi.object({
  id: Joi.string().length(2),
  names: Joi.array().min(1).items(Joi.string().min(1).max(75)),
  languages: Joi.array().items(Joi.string().min(1).max(50)),
  regions: Joi.array().items(Joi.string().min(1).max(50)),
  orgs: Joi.array().items(Joi.string().min(1).max(50)),
  population: Joi.number().min(0).max(5000000000),
  gdp: Joi.number().min(0).max(50000000000000),
  flag: Joi.string().max(6),
});

// validation schema for the Login and Register User requests
const userLoginRegSchema = Joi.object({
  username: Joi.string().min(5).max(25).required(),
  password: Joi.string().min(5).max(25).required(),
});

module.exports = { addCountrySchema, addCountriesSchema, updateCountrySchema, userLoginRegSchema };
