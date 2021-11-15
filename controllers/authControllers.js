const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// MIDDLEWARE
const protect = catchAsync(async (req, res, next) => {
  // 1) Check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in. Log in to access.", 401));
  }

  // 2) Validate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to the token does no longer exist.", 401)
    );
  }
  // Grant access
  req.user = currentUser;
  next();
});

// Must have protect before it in stack
const restrictToUser = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(
      new AppError("You do not have permission to perform this action.", 403)
    );
  }
  next();
});

module.exports = { protect, restrictToUser };
