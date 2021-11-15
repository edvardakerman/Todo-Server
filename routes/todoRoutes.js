const express = require("express");
const { protect, restrictToUser } = require("../controllers/authControllers");

const {
  createOneTodo,
  readAllTodos,
  readOneTodo,
  updateOneTodo,
  deleteOneTodo,
} = require("../controllers/todoControllers");

const router = express.Router();

router.post("/", protect, restrictToUser, createOneTodo);

router.get("/", protect, restrictToUser, readAllTodos);

router.get("/:id", protect, restrictToUser, readOneTodo);

router.post("/:id", protect, restrictToUser, updateOneTodo);

router.delete("/:id", protect, restrictToUser, deleteOneTodo);

module.exports = router;
