const express = require("express");
const { client } = require("../database/database"); // Import database client

const router = express.Router();

// Route to fetch all marketplace items
router.get("/marketplace", async (req, res) => {
  try {
    const query = `SELECT * FROM marketplace`;
    const { rows } = await client.query(query);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching marketplace data:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

module.exports = { marketPlaceRouter: router };
