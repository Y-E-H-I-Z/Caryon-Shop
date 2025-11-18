const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { verifyToken, verifyAdmin } = require("../middleware/auth");
const upload = require("../middleware/multer");

// RUTAS PÚBLICAS
router.get("/", getProducts);
router.get("/:id", getProductById);

// RUTAS SOLO ADMIN
router.post("/", verifyToken, verifyAdmin, upload.single("image"), createProduct);
router.put("/:id", verifyToken, verifyAdmin, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
