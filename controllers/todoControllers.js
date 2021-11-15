const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//CRUD operations
//CREATE one todo
const createOneTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  if (!req.body.title || !req.body.description) {
    return next(
      new AppError("You need to provide both title and description", 401)
    );
  }
  const { title, description } = req.body;

  const todo = {
    title,
    description,
    userId,
  };

  const newTodo = await Todo.create(todo);
  res.status(201).json({
    status: "success",
    data: {
      todo: newTodo,
    },
  });
});

// READ get all todos
const readAllTodos = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todos = await Todo.find({ userId: userId });
  if (!todos) {
    return next(new AppError("No todos found.", 404));
  }
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

// READ get one todo by id
const readOneTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todo = await Todo.findOne({ _id: req.params.id, userId: userId });
  if (!todo) {
    return next(new AppError("No todo with that id found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

// UPDATE one todo by id
const updateOneTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todo = await Todo.findOne({ _id: req.params.id, userId: userId });
  if (!todo) {
    return next(new AppError("No todo with that id found.", 404));
  }
  if (!req.body.title || !req.body.description) {
    return next(
      new AppError("You need to provide both title and description.", 404)
    );
  }
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todo._id, userId: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      todo: updatedTodo,
    },
  });
});

// DELETE one todo by id
const deleteOneTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: userId,
  });
  if (!todo) {
    return next(new AppError("No todo with that id found.", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createOneTodo,
  readAllTodos,
  readOneTodo,
  updateOneTodo,
  deleteOneTodo,
};
