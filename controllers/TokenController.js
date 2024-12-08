const jwt = require("jsonwebtoken");
const configuration = require("../models/configuration");
const asyncHandler = require("express-async-handler");

const getToken = asyncHandler(async (req, res, next) => {
    try {
      const { clientId, password, username } = req.body;
  
      if (!password || !password || !username) {
        const error = new Error("All fields ( client id, password , username ) are mandatory.");
        res.status(400);
        return next(error);
      }
  
      const config = await configuration.findOne({ caption: "TOKEN_CREDENTIAL" });
  
      if (!config) {
        const error = new Error("credential Not Found.");
        res.status(400);
        return next(error);
      }
  
      if (config && config.value2 == password && config.value3 == clientId && config.value == username) {
  
        const accessToken = await jwt.sign({
            user: {
              username: config.value,
              clientId: config.value3,
              password: config.value2
            },
          },
          process.env.ACCESS_TOKEN_SECERT,
          { expiresIn: "30m" }
        );
  
        res.status(201).json({
          success: true,
          message: "Validate successfully.",
          access_token: accessToken,
        });
  
      } else {
        const error = new Error("Credential not valid.");
        res.status(401);
        return next(error);
      }
  
    } catch (error) {
      const err = new Error(error.errorResponse.errmsg);
      res.status(400);
      next(err);
    }
  });

  module.exports = {
    getToken
  };