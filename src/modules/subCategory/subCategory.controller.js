import slugify from "slugify";
import { handleError } from "../../middleware/handleError.js";
import subCategoryModel from "../../../Database/models/subCategory.model.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";

export const addSubCategory = handleError(async (req, res, next) => {
  let { title, slug, image, createdBy, category } = req.body;
  slug = slugify(title);
  image = req.file.filename;
  let subCategory = new subCategoryModel({
    title,
    slug,
    image,
    createdBy,
    category,
  });
  await subCategory.save();

  res
    .status(201)
    .json({ message: "subCategory added successfuly", subCategory });
});

export const getAllSubCategories = handleError(async (req, res, next) => {
  let filter = {};
  if (req.params.category) {
    filter.category = req.params.category;
  }
  let apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  const subCategories = await apiFeatures.mongooseQuery;
  if (!subCategories) {
    return next(new AppError("No subCategory found", 404));
  }

  res.status(200).json({ message: "All sub categories", subCategories });
});

export const getSubCategoryById = handleError(async (req, res, next) => {
  const subCategory = await subCategoryModel.findById(req.params.id);

  if (!subCategory) {
    return next(new AppError("subCategory not found", 404));
  }

  res.status(200).json({ message: "subCategory found", subCategory });
});

export const updateSubCategory = handleError(async (req, res, next) => {
  let { title, slug } = req.body;
  slug = slugify(title);
  const subCategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      title,
      slug,
    },
    {
      new: true,
    }
  );

  if (!subCategory) {
    return next(new AppError("subCategory not found", 404));
  }

  res.status(200).json({ message: "subCategory updated", subCategory });
});

export const deleteSubCategory = deleteOne(subCategoryModel);
