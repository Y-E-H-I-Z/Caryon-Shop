const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// Ruta para registrar admin
router.post("/register", registerAdmin);

// Ruta para iniciar sesión de admin
router.post("/login", loginAdmin);

module.exports = router;
