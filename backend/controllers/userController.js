import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  // Login user
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);

    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);

    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successful" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);

    throw new Error("Invalid user data");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);

    throw new Error("Invalid user data");
  }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});
