import { AppError } from "../utils/AppError.js"

export const validation = (schema) => {
  return (req, res, next) => {
    let filters = {}

    if(req.file){
      filters = {image : req.file, ...req.body, ...req.params, ...req.query}
    } else if (req.files) {
      filters = {...req.files ,...req.body, ...req.params, ...req.query}
    } else {
      filters = {...req.body, ...req.params, ...req.query}
    }


    let {error} = schema.validate(filters, {abortEarly: false})

    if (!error){
      next()
    } else {
      const errorList = error.details.map((ele) => ele.message);
      next(new AppError(errorList.join(", "), 401))
    }
  }
}