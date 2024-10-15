import express from 'express'
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from './category.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCategorySchema, getCategoryByIdSchema, updateCategorySchema } from './category.validation.js';
import { uploadSingle } from '../../utils/fileUpload.js';
import subCategoryRouter from './../subCategory/subCategory.routes.js';

const categoryRouter = express.Router()

categoryRouter.use("/:category/subcategory", subCategoryRouter)

categoryRouter.route("/")
  .post(uploadSingle("image") , validation(addCategorySchema) ,addCategory)
  .get(getAllCategories)

categoryRouter.route("/:id")
  .get(validation(getCategoryByIdSchema), getCategoryById)
  .patch(validation(updateCategorySchema), updateCategory)
  .delete(validation(getCategoryByIdSchema), deleteCategory)


export default categoryRouter;