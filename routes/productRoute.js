import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductsController,
  getSingleProductController,
  ProductPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes

// Create Product Route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Get products
router.get("/get-products", getProductsController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get("/product-photo/:pid", ProductPhotoController);

// Delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// Update Product Route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Filter Product Route
router.post("/product-filters", productFiltersController);

// Product Count
router.get("/product-count", productCountController);

// Product per page
router.get("/product-list/:page", productListController);

// search Product
router.get("/search/:keyword", searchProductController);

// similar Products
router.get("/related-product/:pid/:cid", relatedProductController);

export default router;
