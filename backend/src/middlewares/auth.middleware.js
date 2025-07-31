import jwt from "jsonwebtoken";
import User from "../models/User.js";
const protectRoute = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided, access denied" });
  }
  try {
    const token = authHeader.split(" ")[1]; // Get token from Authorization header
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided,access denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password from user object
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
export default protectRoute;
