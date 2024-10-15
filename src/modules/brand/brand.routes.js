import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utils/fileUpload.js';
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from './brand.controller.js';
import { addBrandSchema, getBrandByIdSchema, updateBrandSchema } from './brand.validation.js';

const brandRouter = express.Router()


brandRouter.route("/")
  .post(uploadSingle("image") , validation(addBrandSchema) ,addBrand)
  .get(getAllBrands)

brandRouter.route("/:id")
  .get(validation(getBrandByIdSchema), getBrandById)
  .patch(validation(updateBrandSchema), updateBrand)
  .delete(validation(getBrandByIdSchema), deleteBrand)


export default brandRouter;