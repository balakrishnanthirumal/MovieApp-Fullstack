import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";
import { error } from "console";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) res.status(400).send("user already exist");
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
      await newUser.save();
      createToken(res, newUser._id);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const checkPassword = bcrypt.compare(password, existingUser.password);

    if (checkPassword) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401).json({
        message: "invalid passoword",
      });
    }
  } else {
    res.status(401).json({
      message: "User does not exist",
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "LoggedOut Successfully",
  });
});

export { createUser, loginUser, logoutUser };
