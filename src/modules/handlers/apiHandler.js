import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";


export const deleteOne = (model) => {
  return handleError(async (req, res, next) => {
    const item = await model.findByIdAndDelete(req.params.id);
  
    if (!item) {
      return next(new AppError("item not found", 404));
    }
  
    res
      .status(200)
      .json({ message: "item deleted successfully", item });
  });
}