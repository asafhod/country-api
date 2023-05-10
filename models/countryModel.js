const mongoose = require("mongoose");

// database schema for Country
const countrySchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "Required field (it is recommended to use the country's ISO code)"],
    unique: true,
  },
  names: {
    type: [String],
    validate: {
      validator: function (names) {
        return names.length > 0;
      },
      message: "Country must have at least one name",
    },
  },
  languages: { type: [String], default: [] },
  regions: { type: [String], default: [] },
  orgs: { type: [String], default: [] },
  population: { type: Number, default: 0 },
  gdp: { type: Number, default: 0 },
  flag: { type: String, default: "xx.svg" },
});

// create model for Country using schema
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
