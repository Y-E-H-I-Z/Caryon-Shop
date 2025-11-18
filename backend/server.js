require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ message: "API funcionando correctamente 🚀" });
});

// Registrar rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔥 Conectado a MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Servidor backend corriendo en el puerto " + process.env.PORT);
    });
  })
  .catch((error) => console.error("❌ Error en MongoDB:", error));
