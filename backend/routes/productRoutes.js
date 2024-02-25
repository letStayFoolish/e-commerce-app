import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// because of we use mongoose, we are working with async code so we need this middleware asyncHandler
router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
