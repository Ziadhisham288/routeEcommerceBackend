import slugify from "slugify";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import productModel from "./../../../Database/models/product.model.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";

export const addProduct = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.coverImage = req.files.coverImage[0].filename;
  req.body.images = req.files.images.map((image) => image.filename);

  let product = new productModel(req.body);
  await product.save();

  res.status(201).json({ message: "Product added successfuly", product });
});

export const getAllProducts = handleError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  const products = await apiFeatures.mongooseQuery;

  if (!products) {
    return next(new AppError("No products found", 404));
  }

  res
    .status(200)
    .json({ message: "All products", page: apiFeatures.page, products });
});

export const getProductById = handleError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new AppError("product not found", 404));
  }

  res.status(200).json({ message: "product found", product });
});

export const updateProduct = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  if (req.files.coverImage) {
    req.body.coverImage = req.files.coverImage[0].filename;
  }

  if (req.files.images) {
    req.body.images = req.files.images.map((image) => image.filename);
  }

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!product) {
    return next(new AppError("product not found", 404));
  }

  res.status(200).json({ message: "product updated", product });
});

export const deleteProduct = deleteOne(productModel);


// TODO The fields is not working correctly with products.