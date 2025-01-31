import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

//check if the user is authenticated

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the 'jwt' cookie

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

//check if user is admin

const authoriseAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json("Not authorised as an admin");
  }
};

export { authenticate, authoriseAdmin };
