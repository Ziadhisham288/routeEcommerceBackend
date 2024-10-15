import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../utils/fileUpload.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller.js";
import {
  addProductSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "./product.validation.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    protectRoutes,
    allowTo("Admin"),
    uploadFields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addProductSchema),
    addProduct
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(validation(getProductByIdSchema), getProductById)
  .patch(
    uploadFields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateProductSchema),
    updateProduct
  )
  .delete(validation(getProductByIdSchema), deleteProduct);

export default productRouter;
