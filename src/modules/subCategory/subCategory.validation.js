import Joi from "joi";

export const addSubCategorySchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have at least 3 characters",
    "string.max": "Title should be max 30 characters",
  }),
  category: Joi.string().hex().length(24).required(),
  image: Joi.object({
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
  }).required(),
});

export const getSubCategoryByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty"
  }),
});

export const updateSubCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID cannot be empty"
  }),
  title: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have at least 3 characters",
    "string.max": "Title should be max 30 characters",
  }),
});
