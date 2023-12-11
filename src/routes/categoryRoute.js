// Inisialisasi Express
const express = require("express");

// Inisialisasi Library Route
const { route } = require("express/lib/application");

// Pemanggilan function Router
const router = express.Router();

// Inisialisasi Controller
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryController");

// Inisialisasi Middleware
const verifyJWT = require("../middleware/verifyToken");

// CRUD SECTION

// Create - POST
router.post("/create", verifyJWT, createCategory);

// Read - GET
router.get("/all", verifyJWT, getAllCategory);

// Read - GET (ID)
router.get("/:id", getCategoryById);

// Update - PATCH (ID)
router.patch("/:id", verifyJWT, updateCategoryById);

// Delete - Delete (ID)
router.delete("/:id", verifyJWT, deleteCategoryById);

module.exports = router;
