import slugify from "slugify";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import brandModel from "../../../Database/models/brand.model.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";

export const addBrand = handleError(async (req, res, next) => {
  let { title, slug, logo, createdBy} = req.body;
  slug = slugify(title);
  logo = req.file.filename;
  let brand = new brandModel({ title, slug, logo, createdBy});
  await brand.save();

  res.status(201).json({ message: "Brand added successfuly", brand });
});

export const getAllBrands = handleError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(brandModel.find(), req.query).pagination().filter().sort().search().fields()

  const brands = await apiFeatures.mongooseQuery;
  
  if (!brands) {
   return next(new AppError("No brands found", 404))
  }

  res.status(200).json({ message: "All brands", brands });
});

export const getBrandById = handleError(async (req, res,next) => {
  const brand = await brandModel.findById(req.params.id);

  if (!brand) {
    return next(new AppError("Brand not found", 404))
  }

  res.status(200).json({ message: "brand found", brand });
});

export const updateBrand = handleError(async (req, res,next) => {
  let { title, slug, logo} = req.body;
  slug = slugify(title);
  
  if(req.file) logo = req.file.filename;

  const brand = await brandModel.findByIdAndUpdate(
    req.params.id,
    {
      title,
      slug,
      logo
    },
    {
      new: true,
    }
  );

  if (!brand) {
    return next(new AppError("brand not found", 404))
  }

  res.status(200).json({ message: "Brand updated", brand });
});

export const deleteBrand = deleteOne(brandModel)