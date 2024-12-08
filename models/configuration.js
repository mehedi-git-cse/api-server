const mongoose = require("mongoose");

const Configuration = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    value2: {
      type: String,
      required: true,
    },
    value3: {
      type: String,
      required: true,
    },
  },
  {
    collection: "configuration",
  }
);

const configuration = mongoose.model("Configuration", Configuration);

module.exports = configuration;
