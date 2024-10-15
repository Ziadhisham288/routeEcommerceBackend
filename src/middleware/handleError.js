import { AppError } from "../utils/AppError.js";

export const handleError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      const statusCode = error.statusCode || 500;
      next(new AppError(error.message, statusCode));
    });
  };
};
