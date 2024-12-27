require("dotenv").config(); // Load environment variables
const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const { client } = require("../database/database");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");

const router = express.Router();

// Schema for validating signup data with role
const signupSchema = z.object({
  userName: z.string().min(3).max(10).trim(),
  email: z.string().email(),
  password: z.string().min(6).max(20).trim(),
  role: z.enum(["Catcher", "Bearer"]), // Validate role as either 'Catcher' or 'Bearer'
});

// Signup route
router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid inputs",
      errors: result.error.errors,
    });
  }

  try {
    const { userName, email, password, role } = req.body;

    const { rowCount } = await client.query(
      `SELECT 1 FROM users WHERE email = $1`,
      [email]
    );

    if (rowCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Account with the provided email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await client.query(
      `INSERT INTO users (userName, email, password, role) VALUES ($1, $2, $3, $4)`,
      [userName, email, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: "User account created successfully!",
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

// Schema for validating signin data
const signinSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).max(20).trim(),
});

// Signin route with role return
router.post("/signin", async (req, res) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid inputs",
      errors: result.error.errors,
    });
  }

  try {
    const { email, password } = req.body;

    const { rows } = await client.query(
      `SELECT password, role FROM users WHERE email = $1`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or email not registered",
      });
    }

    const validPassword = await bcrypt.compare(password, rows[0].password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "User signed in successfully!",
      role: rows[0].role, // Include the user's role in the response
    });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

// Google OAuth - Get authorization URL
router.post("/google-Oauth", async (req, res) => {
  const redirectUrl = "http://localhost:3000/Maindashboard";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  // Generate the authorization URL
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({
    success: true,
    url: authorizeUrl,
  });
});

// Google OAuth - Handle token exchange and fetch user data
router.get("/google-auth", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code missing",
      });
    }

    const redirectUrl = "http://localhost:3000/dashboard";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    // Exchange the authorization code for an access token
    const { tokens } = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(tokens);

    console.log("Tokens acquired:", tokens);

    // Get user data with the access token
    const user = await getUserData(tokens.access_token);

    // Check if the user exists in the database
    let { rows } = await client.query(
      `SELECT role FROM users WHERE email = $1`,
      [user.email]
    );

    // If user doesn't exist, insert them with a default role of 'Bearer' and their Google ID
    if (rows.length === 0) {
      await client.query(
        `INSERT INTO users (userName, email, googleId, role) VALUES ($1, $2, $3, $4)`,
        [user.name, user.email, user.id, "Bearer"]
      );
      rows = [{ role: "Bearer" }]; // Default role for new OAuth users
    }

    res.json({
      success: true,
      user,
      role: rows[0].role, // Return the user's role
    });
  } catch (err) {
    console.error("Error during Google OAuth:", err);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
});

module.exports = { userRouter: router };
