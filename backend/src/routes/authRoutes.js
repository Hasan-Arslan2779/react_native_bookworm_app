import express from "express";
import User from "../models/User.js"; // Assuming you have a User model defined
import jwt from "jsonwebtoken"; // Assuming you are using JWT for authentication
import bcrypt from "bcryptjs";

const router = express.Router();

// Function to generate a JWT token
// This function generates a JWT token for the user after successful registration
const generateToken = (userId) => {
  // Function to generate a JWT token
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET, // Make sure to set this in your environment variables
    { expiresIn: "15d" } // Token expiration=son kullanma tarihi time
  );
};
// Route to handle user registration
// This route will handle user registration and return a JWT token upon successful registration
router.post("/register", async (req, res) => {
  // Handle login logic here
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).send("All fields are required");
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }
    if (username.length < 3) {
      return res
        .status(400)
        .send("Username must be at least 3 characters long");
    }
    // cehck if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("User already exists with this email .");
    }
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).send("User already exists with this username .");
    }

    // Get random avatar image
    const profileImage = `https://api.dicebear.com/9.x/avataaars/png?seed=${username}`;
    // Create a new user
    const user = new User({
      email,
      username,
      password,
      profileImage, // In a real application, you should hash the password before saving
    });
    await user.save();
    const token = generateToken(user._id); // Assuming you have a function to generate JWT tokens
    console.log("User registered successfully:", user);

    res.status(201).json({
      message: "User registered successfully",
      token, // Send the token back to the client
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle user login
// This route will handle user login and return a JWT token upon successful login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    // Check if the password matches
    const isMatch = await user.comparePassword(password); // Assuming you have a method to compare passwords
    if (!isMatch) {
      return res.status(401).send("Invalid credentials  ");
    }
    // Generate a JWT token
    const token = generateToken(user._id); //
    res.status(200).json({
      message: "Login successful",
      token, // Send the token back to the client
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
