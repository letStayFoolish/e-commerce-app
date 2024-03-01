import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js"; // or use third-party library "express-async-handler"
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  // Login user --> authentication process:
  const { email, password } = req.body; // email or username, depends of what you are using for login

  const foundUser = await User.findOne({ email });

  // Variant with match function written here inside controller
  //                                        1             2
  // const match = await bcrypt.compare(password, foundUser.password) // 1: password we received vs 2: password stored in the database

  // Variant with match function written inside models
  if (foundUser && (await foundUser.matchPasswords(password))) {
    // Create access token
    // Create refresh token
    generateToken(res, foundUser._id);

    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
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

    // status 201: something is created
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
  // or just res.clearCookie("jwt", { httpOnly: true })
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
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const totalItems = await User.countDocuments({});

  const users = await User.find({})
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  try {
    if (users) {
      res.status(200).json({
        users,
        page,
        pageSize,
        pages: Math.ceil(totalItems / pageSize),
      });
    } else {
      res.status(404);
      throw new Error("No users to be shown");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserByID = asyncHandler(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id).select("-password");

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id).select("-password");

    if (foundUser) {
      if (!foundUser.isAdmin) {
        await User.deleteOne({ _id: foundUser._id });

        res.status(200).json(`User ${foundUser._id} deleted`);
      } else {
        res.status(404);
        throw new Error("Cannot delete admin user");
      }
    } else {
      res.status(404);
      throw new Error("User not found, so can not be deleted");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id).select("-password");

    if (foundUser) {
      foundUser.name = req.body.name || foundUser.name;
      foundUser.email = req.body.email || foundUser.email;
      foundUser.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await foundUser.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404);

      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
