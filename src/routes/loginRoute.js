// Inisialisasi Express
const express = require("express");

// Inisialisasi Library Route
const { route } = require("express/lib/application");

// Pemanggilan function Router
const router = express.Router();

// Inisialisasi Controller
const { login, getProfile } = require("../controllers/login");

// Inisialisasi Middleware
const {
  validateLoginBuyer,
  validateLoginSeller,
} = require("../middleware/validator");

// Login Route (Buyer) - POST
router.post("/buyer", validateLoginBuyer, login);

// Login Route (Seller) - POST
router.post("/seller", validateLoginSeller, login);

// Get Profile - GET (bug)
router.get("/getprofile", getProfile);

module.exports = router;
