// Inisialisasi Express
const express = require("express");

// Inisialisasi Library Route
const { route } = require("express/lib/application");

// Pemanggilan function Router
const router = express.Router();

// Inisialisasi Controller
const {
  createBuyer,
  getAllBuyer,
  getBuyerById,
  updateBuyerById,
  deleteBuyerById,
} = require("../controllers/buyerControllers");

// Inisialisasi Middleware
const verifyJWT = require("../middleware/verifyToken");

// CRUD SECTION

// Create - POST
router.post("/create", verifyJWT, createBuyer);

// Read - GET
router.get("/all", getAllBuyer);

// Read - GET (ID)
router.get("/:id", getBuyerById);

// Update - PATCH (ID)
router.patch("/:id", verifyJWT, updateBuyerById);

// Delete - DELETE (ID)
router.delete("/:id", verifyJWT, deleteBuyerById);

module.exports = router;
