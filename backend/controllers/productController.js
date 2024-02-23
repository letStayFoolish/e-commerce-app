import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  // empty object - to get all of them
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    throw new Error("Resource not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    user: req.user._id,
    name: "Sample name",
    image: "images/sample.jpg",
    origin: "Sample origin",
    description: "Sample description",
    numReviews: 0,
    category: "Sample category",
    price: 0,
    countInStock: 0,
  });

  if (newProduct) {
    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
  } else {
    res.status(404);

    throw new Error("Something went wrong");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, origin, price, countInStock, image } =
    req.body;

  try {
    const foundProduct = await Product.findById(req.params.id);

    if (foundProduct) {
      foundProduct.name = name;
      foundProduct.description = description;
      foundProduct.category = category;
      foundProduct.origin = origin;
      foundProduct.price = price;
      foundProduct.countInStock = countInStock;
      foundProduct.image = image;

      const updatedProduct = await foundProduct.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);

    if (foundProduct) {
      await Product.deleteOne({ _id: foundProduct._id });

      const productId = req.params.id;

      res.status(200).json({ message: `Product: ${productId} deleted` });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
