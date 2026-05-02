import httpsStatus from "http-status";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const localOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

const getAuthCookieOptions = (req) => {
  const origin = req.get("origin")?.replace(/\/$/, "");
  const isLocalRequest =
    localOrigins.includes(origin) ||
    ["localhost", "127.0.0.1", "::1"].includes(req.hostname);

  return {
    httpOnly: true,
    secure: !isLocalRequest,
    sameSite: isLocalRequest ? "Lax" : "None",
    path: "/",
  };
};

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
      ...getAuthCookieOptions(req),
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
  res.clearCookie("token", getAuthCookieOptions(req));
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
