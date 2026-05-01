import httpsStatus from "http-status";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isAbsolute } from "path";

dotenv.config({ path: "./src/.env" });

const register = async (req, res) => {
  const { name, username, password, email } = req.body;
  if (!name || !username || !password || !email) {
    return res.status(httpsStatus.BAD_REQUEST).json({
      message: "name, username and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(httpsStatus.CONFLICT)
        .json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashPassword,
      email: email,
    });

    await newUser.save();

    res.status(httpsStatus.CREATED).json({ message: "User registered" });
  } catch (e) {
    res
      .status(httpsStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something is wrong ${e}` });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpsStatus.BAD_REQUEST)
      .json({ message: "Please Enter valid username & password" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(httpsStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (!user.password) {
      return res
        .status(httpsStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "User password is not set" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(httpsStatus.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(httpsStatus.OK).json({ token });
  } catch (e) {
    res
      .status(httpsStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something went wrong ${e.message}` });
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

const getMe = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ isAuth: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isAuth: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ isAuth: false });
  }
};

export { login, register, logout, getMe };
