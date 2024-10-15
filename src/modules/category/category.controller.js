import slugify from "slugify";
import categoryModel from "../../../Database/models/category.model.js";
import { handleError } from "../../middleware/handleError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";

export const addCategory = handleError(async (req, res, next) => {
  let { title, slug, image, createdBy } = req.body;
  slug = slugify(title);
  image = req.file.filename;
  let category = new categoryModel({ title, slug, image, createdBy });
  await category.save();

  res.status(201).json({ message: "Category added successfuly", category });
});

export const getAllCategories = handleError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query).pagination().filter().sort().search().fields()

  const categories = await apiFeatures.mongooseQuery;

  if (!categories) {
    res.status(404).json({ message: "No categories found" });
  }

  res.status(200).json({ message: "All categories", categories });
});

export const getCategoryById = handleError(async (req, res) => {
  const category = await categoryModel.findById(req.params.id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category found", category });
});

export const updateCategory = handleError(async (req, res) => {
  let { title, slug } = req.body;
  slug = slugify(title);
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    {
      title,
      slug,
    },
    {
      new: true,
    }
  );

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category updated", category });
});

export const deleteCategory = deleteOne(categoryModel)