// Inisialisasi Express
const express = require("express");

// Inisialisasi Library Route
const { route } = require("express/lib/application");

// Pemanggilan function Router
const router = express.Router();

// Inisialisasi Controller
const {
  createProduct,
  getAllProduct,
  getProductById,
  getAllProductbycategory,
  updateProductById,
  deleteProductById,
} = require("../controllers/productControllers");

// Inisialisasi Middleware
const verifyJWT = require("../middleware/verifyToken");

// CRUD SECTION

// Create - POST
router.post("/create", verifyJWT, createProduct);

// Read - GET (Nama Kategori)
router.get("/all", getAllProduct);

// Read - GET (Id)
router.get("/filter/:id", getProductById);

// Read - GET (Nama Kategori)
router.get("/filter/all/:nama", getAllProductbycategory);

// Update - PATCH (ID)
router.patch("/update/:id", verifyJWT, updateProductById);

// Delete - DELETE (ID)
router.delete("/delete/:id", verifyJWT, deleteProductById);

module.exports = router;
