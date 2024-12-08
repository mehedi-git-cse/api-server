const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number, // Sequelize INTEGER maps to Mongoose Number
      required: true,
      unique: true, // Ensures no duplicate `id`
    },
    name: {
      type: String, // Sequelize STRING maps to Mongoose String
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number, // Sequelize BIGINT maps to Mongoose Number
      required: true,
    },
    mongo_id: {
      type: String, // Optionally stores the ID in MongoDB-specific format
    },
    status: {
      type: Number, // Sequelize INTEGER maps to Mongoose Number
    },
    is_archived: {
      type: Number, // Sequelize INTEGER maps to Mongoose Number
    },
    image: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: false,
  }
);

const MongoUser = mongoose.model("users", userSchema);

module.exports = MongoUser;
