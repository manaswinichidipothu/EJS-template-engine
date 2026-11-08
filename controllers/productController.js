import Product from "../models/productModel.js";
const createProductForm = (req, res) => {
  res.render("product-form", { product: null });
};
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const product = new Product({
      name,
      description,
      category,
      price
    });

    await product.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};
const readProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("product", { products });
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};
const readProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render("error", {
        error: "Product not found"
      });
    }
    res.render("product-details", { product });
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};
const updateProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render("error", {
        error: "Product not found"
      });
    }
    res.render("product-form", { product });
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price },
      { runValidators: true }
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};
export {
  createProductForm,
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct
};
