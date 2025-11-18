const multer = require("multer");
const path = require("path");

// Carpeta temporal para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // crea esta carpeta si no existe
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("Solo se permiten imágenes"));
};

module.exports = multer({ storage, fileFilter });
