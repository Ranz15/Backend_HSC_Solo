// Inisialisasi Express
const express = require("express");

// Inisialisasi Library Route
const { route } = require("express/lib/application");

// Pemanggilan function Router
const router = express.Router();

// Inisialisasi Controller
const {
  createSeller,
  getAllSeller,
  getSellerbyID,
  updateSellerbyID,
  deleteSellerByID,
} = require("../controllers/sellerControllers");

// Inisialisasi Middleware
const verifyJWT = require("../middleware/verifyToken");

// CRUD SECTION

// Create - POST
router.post("/create", verifyJWT, createSeller);

// Read - GET
router.get("/all", getAllSeller);

// Read - GET (ID)
router.get("/:id", getSellerbyID);

// Update - PATCH (ID)
router.patch("/:id", verifyJWT, updateSellerbyID);

// Delete - DELETE (ID)
router.delete("/:id", verifyJWT, deleteSellerByID);

module.exports = router;
