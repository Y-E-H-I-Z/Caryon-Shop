const Product = require("../models/Product");

// Crear producto (ADMIN)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, sizes, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "La imagen es obligatoria" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: req.file.path, // Guardamos la ruta local del archivo
    });

    res.status(201).json({
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

// Actualizar producto (ADMIN)
exports.updateProduct = async (req, res) => {
  try {
    const updateData = req.body;

    // Si el admin sube nueva imagen
    if (req.file) {
      updateData.image = req.file.path;
    }

    if (updateData.sizes) {
      updateData.sizes = JSON.parse(updateData.sizes);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({
      message: "Producto actualizado",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto (ADMIN)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
