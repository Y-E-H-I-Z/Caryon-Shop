const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Verificar token
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Acceso denegado. Token requerido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Admin.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Token inválido" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido", error: error.message });
  }
};

// Solo ADMIN
exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso restringido: se requiere rol ADMIN" });
  }
  next();
};
