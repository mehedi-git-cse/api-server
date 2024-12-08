const express = require("express");
const router = express.Router();
const { getToken } = require("../controllers/TokenController");

// Public routes (no middleware)
router.route("/").post(getToken);


module.exports = router;