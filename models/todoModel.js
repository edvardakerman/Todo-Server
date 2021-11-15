const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A todo must have a title"],
    trim: true,
    maxlength: [40, "A todo name must have less or equal then 40 characters"],
    minlength: [2, "A todo name must have more or equal then 2 characters"],
  },
  description: {
    type: String,
    required: [true, "A todo must have a description"],
    maxlength: [
      1024,
      "A todo description must have less or equal then 1024 characters",
    ],
    minlength: [
      2,
      "A todo description must have more or equal then 15 characters",
    ],
  },
  datePlaced: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "An order must have an id of customer."],
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
todoSchema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model("todo", todoSchema);
