import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

// because of we use mongoose, we are working with async code so we need this middleware asyncHandler
router.get("/", getAllProducts);

router.get("/:id", getProductById);

export default router;
