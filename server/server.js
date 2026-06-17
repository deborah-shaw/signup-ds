const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Helper - Validate password
function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
  return regex.test(password);
}

// Helper - Check duplicated username
async function isUsernameAvailable(username) {
  let user = await User.findOne({ username });
  return !user;
}

// Helper - Check duplicated email
async function isEmailAvailable(email) {
  let user = await User.findOne({ email });
  return !user;
}

// Middleware authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // extract the token
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    // console.log(req.user.id);   // log user id
    next();
  });
}

// Endpoint - Check unique username
app.get("/check-username", async (req, res) => {
  let username = req.query.username;
  let available = await isUsernameAvailable(username);
  res.json({ available });
});

// Endpoint - Check unique email
app.get("/check-email", async (req, res) => {
  let email = req.query.email;
  let available = await isEmailAvailable(email);
  res.json({ available });
});

// Endpoint - Signup
app.post("/signup", async (req, res) => {
  // console.log("RAW BODY:", req.body);
  const {
    fName,
    lName,
    gender,
    zip,
    city,
    latitude,
    longitude,
    state,
    county,
    username,
    email,
    password,
    passwordMatch
  } = req.body;

  // Confirm required fields are entered
  if (!username || !email || !password || !passwordMatch) {
    return res.json({ success: false, message: "Missing required fields" });
  }

  // Check duplicated username
  let usernameExists = await isUsernameAvailable(username);
  if (!usernameExists) {
    return res.json({ success: false, message: "Username already exists" });
  }

  // Check duplicated email
  let emailExists = await isEmailAvailable(email);
  if (!emailExists) {
    return res.json({ success: false, message: "Email already registered" });
  }
  
  // Validate passwords
  if (!isValidPassword(password)) {
    return res.json({ success: false, message: "Password does not meet complexity requirements" });
  }
  if (password !== passwordMatch) {
	  return res.json({ success: false, message: "Passwords do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);     // HASH password

  // Save user
  const newUser = await User.create({
    fName,
    lName,
    gender,
    zip,
    city,
    latitude,
    longitude,
    state,
    county,
    username,
    email,
    password: hashedPassword
  });
  
  console.log("Created User:", newUser);    // log new user in the backend
  res.json({ success: true });
});

// Endpoint - Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ success: false, message: "Incorrect password" });
  }

  // Create Token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Send SAFE data only
  res.json({
    success: true,
    token
  });
});

// Endpoint - Profile
app.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Start server
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
