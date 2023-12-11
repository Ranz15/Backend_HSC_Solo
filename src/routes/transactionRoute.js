// Inisialisasi Express
const express = require("express");

// Inisialisasi Library Route
const { route } = require("express/lib/application");

// Pemanggilan function Router
const router = express.Router();

// Inisialisasi Controller
const {
  createTransaction,
  getAllTransaction,
  getTransactionbyBuyer,
} = require("../controllers/transactionController");

// Inisialisasi Middleware
const verifyJWT = require("../middleware/verifyToken");

// CRUD SECTION

// Create - POST
router.post("/create", verifyJWT, createTransaction);

// Read - GET (Admin)
router.get("/all", getAllTransaction);

// Read - GET (Buyer)
router.get("/:id", getTransactionbyBuyer);

module.exports = router;
