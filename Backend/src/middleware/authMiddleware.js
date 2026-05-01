import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token expired or invalid",
    });
  }
};

export default authMiddleware;
