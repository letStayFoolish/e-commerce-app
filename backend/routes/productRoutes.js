import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// because of we use mongoose, we are working with async code so we need this middleware asyncHandler
router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.get("/:id", getProductById).put(protect, admin, updateProduct);

export default router;
