import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utils/fileUpload.js';
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from './subCategory.controller.js';
import { addSubCategorySchema, getSubCategoryByIdSchema, updateSubCategorySchema } from './subCategory.validation.js';

const subCategoryRouter = express.Router({mergeParams: true})


subCategoryRouter.route("/")
  .post(uploadSingle("image") , validation(addSubCategorySchema) ,addSubCategory)
  .get(getAllSubCategories)

subCategoryRouter.route("/:id")
  .get(validation(getSubCategoryByIdSchema), getSubCategoryById)
  .patch(validation(updateSubCategorySchema), updateSubCategory)
  .delete(validation(getSubCategoryByIdSchema), deleteSubCategory)


export default subCategoryRouter;