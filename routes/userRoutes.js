/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const { protect } = require("../controllers/authControllers");
const {
  createUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");

const router = express.Router();

// CRUD OPERATIONS
// SIGNUP (CREATE user)
router.post("/signup", createUser);

// LOGIN ROUTE som returnerar en JWT
router.post("/login", loginUser);

// GETME (READ user data)
router.get("/getMe", protect, getMe);

module.exports = router;
