import Joi from "joi";

export const addProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().trim().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have at least 3 characters",
    "string.max": "Title should be max 30 characters",
  }),
  description: Joi.string().min(3).max(300).required().trim().messages({
    "string.empty": "description cannot be empty",
    "string.min": "description should have at least 3 characters",
    "string.max": "description should be max 300 characters",
  }),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  subCategory: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  brand: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  createdBy: Joi.string().hex().length(24).optional().messages({
    "string.empty": "ID cannot be empty",
  }),
  coverImage: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/jpg", "image/png")
          .required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
      }).required()
    )
    .required(),
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/jpg", "image/png")
          .required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
      }).required()
    )
    .required(),
});

export const getProductByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
});

export const updateProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  title: Joi.string().min(3).max(30).required().trim().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have at least 3 characters",
    "string.max": "Title should be max 30 characters",
  }),
  description: Joi.string().min(3).max(300).required().trim().messages({
    "string.empty": "description cannot be empty",
    "string.min": "description should have at least 3 characters",
    "string.max": "description should be max 300 characters",
  }),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  subCategory: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  brand: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty",
  }),
  createdBy: Joi.string().hex().length(24).optional().messages({
    "string.empty": "ID cannot be empty",
  }),
  coverImage: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/jpg", "image/png")
          .required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
      }).required()
    )
    .required(),
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/jpg", "image/png")
          .required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
      }).required()
    )
    .required(),
});
