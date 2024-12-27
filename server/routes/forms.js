require("dotenv").config(); // Load environment variables
const express = require("express");
const z = require("zod");
const { client } = require("../database/database");

const router = express.Router();

// Zod Schema for Claim Donation
const claimDonationSchema = z.object({
  fullName: z.string().min(2).max(50).trim(),
  contactNumber: z.string().regex(/^\d{10}$/).trim(),
  email: z.string().email(),
  organization: z.string().optional(),
  recipientType: z.enum(["Individual", "Organization"]),
  pickupDate: z.string().trim(), // Assuming date in ISO 8601 format
  quantity: z.number().min(1),
  purpose: z.string().optional(),
  specialRequirements: z.string().optional(),
  healthSafety: z.boolean(),
  terms: z.boolean(),
});

// Route to handle claim donation submission
router.post("/claim-donations", async (req, res) => {
  try {
    // Validate request body against Zod schema
    const validation = claimDonationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.errors,
      });
    }

    const {
      fullName,
      contactNumber,
      email,
      organization,
      recipientType,
      pickupDate,
      quantity,
      purpose,
      specialRequirements,
      healthSafety,
      terms,
    } = req.body;

    // Insert data into the database
    const result = await client.query(
      `INSERT INTO claim_donations 
      (full_name, contact_number, email, organization, recipient_type, pickup_date, quantity, purpose, special_requirements, health_safety, terms)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        fullName,
        contactNumber,
        email,
        organization || null, // Handle optional fields
        recipientType,
        pickupDate,
        quantity,
        purpose || null,
        specialRequirements || null,
        healthSafety,
        terms,
      ]
    );

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error saving claim donation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit the claim",
    });
  }
});

// Route to fetch all claim donations
router.get("/claim-donations", async (req, res) => {
  try {
    // Fetch all claim donation records from the database
    const result = await client.query(`SELECT * FROM claim_donations`);

    // Respond with the fetched data
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching claim donations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch claim donations",
    });
  }
});
// Zod schema for food donations
const foodDonationSchema = z.object({
  fullName: z.string().min(1),
  contactNumber: z.string().min(10),
  email: z.string().email(),
  donationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  donorType: z.string(),
  foodType: z.string(),
  description: z.string().optional(),
  quantity: z.number().min(0),
  dietaryCategory: z.string().optional(),
  foodCategory: z.string(),
  foodTemperature: z.string(),
  storageConditions: z.string().optional(),
  foodSource: z.string(),
  pickupLocation: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(z.string()).optional(), // Array of image URLs
});

// Route to handle food donation submission
router.post("/donations", async (req, res) => {
  try {
    // Validate request body against Zod schema
    const validation = foodDonationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.errors,
      });
    }

    // If validation succeeds, prepare data for insertion
    const donationData = validation.data;

    const result = await client.query(
      `INSERT INTO donations (
        full_name, contact_number, email, donation_date, expiry_date, 
        donor_type, food_type, description, quantity, dietary_category, 
        food_category, food_temperature, storage_conditions, food_source, 
        pickup_location, latitude, longitude, images
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
      [
        donationData.fullName,
        donationData.contactNumber,
        donationData.email,
        donationData.donationDate,
        donationData.expiryDate,
        donationData.donorType,
        donationData.foodType,
        donationData.description || null,
        donationData.quantity,
        donationData.dietaryCategory || null,
        donationData.foodCategory,
        donationData.foodTemperature,
        donationData.storageConditions || null,
        donationData.foodSource,
        donationData.pickupLocation,
        donationData.latitude,
        donationData.longitude,
        donationData.images || null,
      ]
    );

    res.status(201).json({
      message: "Donation posted successfully!",
      donationId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error posting donation:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// GET request to fetch all donations
router.get("/donations", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM donations");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No donations found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "An error occurred while fetching donations." });
  }
});

const volunteerSchema = z.object({
  fullName: z.string().min(1),
  contactNumber: z.string().min(10),
  email: z.string().email(),
  gender: z.string().min(1),
  age: z.number().min(18),
  profilePhoto: z.string().optional(), // If storing the photo as a URL or base64 string
  address: z.string().min(1),
  availability: z.array(z.string()).min(1),
  activities: z.array(z.string()).min(1),
  skills: z.string().min(1),
  emergencyName: z.string().min(1),
  emergencyNumber: z.string().min(10),
  languages: z.string().min(1),
  motivation: z.string().min(1),
  agreement: z.boolean().refine((val) => val === true, {
    message: "Agreement must be true",
  }),
});

// Route to handle volunteer submission
router.post("/volunteers", async (req, res) => {
  try {
    // Validate request body against Zod schema
    const validation = volunteerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.errors,
      });
    }

    // If validation succeeds, prepare data for insertion
    const volunteerData = validation.data;

    const result = await client.query(
      `INSERT INTO volunteers (
        full_name, contact_number, email, gender, age, profile_photo, address, availability, 
        activities, skills, emergency_name, emergency_number, languages, motivation, agreement
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
      [
        volunteerData.fullName,
        volunteerData.contactNumber,
        volunteerData.email,
        volunteerData.gender,
        volunteerData.age,
        volunteerData.profilePhoto || null,
        volunteerData.address,
        volunteerData.availability,
        volunteerData.activities,
        volunteerData.skills,
        volunteerData.emergencyName,
        volunteerData.emergencyNumber,
        volunteerData.languages,
        volunteerData.motivation,
        volunteerData.agreement,
      ]
    );

    res.status(201).json({
      message: "Volunteer added successfully!",
      volunteerId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// GET request to fetch all volunteers
router.get("/volunteers", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM volunteers");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No volunteers found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ error: "An error occurred while fetching volunteers." });
  }
});

module.exports = { formsRouter: router };
